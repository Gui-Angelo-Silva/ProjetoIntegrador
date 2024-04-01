﻿using Microsoft.AspNetCore.Http;
using MySqlX.XDevAPI;
using Newtonsoft.Json;
using SGED.Context;
using SGED.DTO.Entities;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using System.Net;

namespace SGED.Services.Server.Middleware

{
    public class ValidateSessionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IServiceProvider _serviceProvider;

        public ValidateSessionMiddleware(RequestDelegate next, IServiceProvider serviceProvider)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _serviceProvider = serviceProvider;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            using var scope = _serviceProvider.CreateScope();
            var _sessaoRepository = scope.ServiceProvider.GetRequiredService<ISessaoRepository>();
            var tokenPrevious = "";

            if (context.Request.Headers.TryGetValue("Authorization", out Microsoft.Extensions.Primitives.StringValues valuePrevious))
            {
                var authorizationHeader = valuePrevious.ToString();
                var tokenParts = authorizationHeader.Split(' ');

                if (tokenParts.Length == 2)
                {
                    var validTypes = new List<string> { "Front", "Back" };
                    var tokenType = tokenParts[0];
                    tokenPrevious = tokenParts[1];

                    if (!validTypes.Contains(tokenType))
                    {
                        context.Response.Headers.Remove("Authorization");

                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.Response.ContentType = "application/json";
                        context.Request.Headers.Remove("Authorization");
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Erro: Token inválido!" }));
                        return;
                    }

                    var sessao = await _sessaoRepository.GetByToken(tokenPrevious);

                    if (sessao is null)
                    {
                        context.Response.Headers.Remove("Authorization");

                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.Response.ContentType = "application/json";
                        context.Request.Headers.Remove("Authorization");
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Erro: Sessão não encontrada!" }));
                        return;
                    }
                    else if (!sessao.StatusSessao || !SessaoDTO.ValidateToken(sessao.TokenSessao, sessao.EmailPessoa))
                    {
                        context.Response.Headers.Remove("Authorization");

                        sessao.StatusSessao = false;
                        sessao.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                        await _sessaoRepository.Update(sessao);

                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.Response.ContentType = "application/json";
                        context.Request.Headers.Remove("Authorization");
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Erro: Sessão expirada!" }));
                        return;
                    }
                }
                else
                {
                    context.Response.Headers.Remove("Authorization");

                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    context.Response.ContentType = "application/json";
                    context.Request.Headers.Remove("Authorization");
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Erro: Token inválido!" }));
                    return;
                }
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Token não informado!" }));
                return;
            }

            await _next(context); // Chama o proximo serviço do pipeline da requisição

            if (tokenPrevious is not null)
            {
                if (context.Request.Headers.TryGetValue("Authorization", out Microsoft.Extensions.Primitives.StringValues valueAfter))
                {
                    var authorizationHeader = valueAfter.ToString();
                    var tokenParts = authorizationHeader.Split(' ');

                    var tokenType = tokenParts[0];
                    var tokenAfter = tokenParts[1];

                    if (tokenType == "Front")
                    {
                        var sessaoAfter = await _sessaoRepository.GetByToken(tokenAfter);

                        if (sessaoAfter == null)
                        {
                            context.Request.Headers.Remove("Authorization"); return;
                        }
                        else if (tokenPrevious != tokenAfter)
                        {
                            var user = await _sessaoRepository.GetUser(tokenPrevious);

                            if (user == null)
                            {
                                context.Request.Headers.Remove("Authorization"); return;
                            }
                            else if (user.Id != sessaoAfter.IdUsuario)
                            {
                                context.Request.Headers.Remove("Authorization"); return;
                            }
                        }
                    }
                } else
                {
                    var sessaoAfter = await _sessaoRepository.GetByToken(tokenPrevious);
                    var user = await _sessaoRepository.GetUser(tokenPrevious);

                    if (user == null)
                    {
                        context.Request.Headers.Remove("Authorization"); return;
                    }

                    sessaoAfter.EmailPessoa = user.EmailPessoa;
                    if (user.TipoUsuario != null) { sessaoAfter.NivelAcesso = user.TipoUsuario.NivelAcesso; }
                    sessaoAfter.TokenSessao = SessaoDTO.GenerateToken(sessaoAfter.EmailPessoa);
                    await _sessaoRepository.Update(sessaoAfter);

                    context.Request.Headers.Add("Token", $"Front {sessaoAfter.TokenSessao}");
                }
            }
        }

    }

    public static class ValidateSessionMiddlewareExtensions
    {
        public static IApplicationBuilder UseValidateSessionMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ValidateSessionMiddleware>();
        }
    }
}
