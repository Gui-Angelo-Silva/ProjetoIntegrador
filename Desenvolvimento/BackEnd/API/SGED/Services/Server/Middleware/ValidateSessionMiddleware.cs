using Microsoft.AspNetCore.Http;
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

            if (context.Request.Headers.TryGetValue("Authorization", out Microsoft.Extensions.Primitives.StringValues value))
            {
                var authorizationHeader = value.ToString();
                var tokenParts = authorizationHeader.Split(' ');

                if (tokenParts.Length == 2)
                {
                    var validTypes = new List<string> { "Front", "Back" };
                    var tokenType = tokenParts[0];
                    var token = tokenParts[1];

                    if (!validTypes.Contains(tokenType))
                    {
                        context.Response.Headers.Remove("Authorization");

                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.Response.ContentType = "application/json";
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Erro: Token inválido!" }));
                        return;
                    }

                    var sessao = await _sessaoRepository.GetByToken(token);

                    if (sessao is null)
                    {
                        context.Response.Headers.Remove("Authorization");

                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.Response.ContentType = "application/json";
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
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Erro: Sessão expirada!" }));
                        return;
                    }
                    else if (tokenType == "Front")
                    {
                        sessao.TokenSessao = SessaoDTO.GenerateToken(sessao.EmailPessoa);
                        await _sessaoRepository.Update(sessao);

                        /*context.Request.Headers.Remove("Authorization");
                        context.Request.Headers.Add("Authorization", "Bearer " + sessao.TokenSessao);*/

                        context.Request.Headers["Authorization"] = $"Front {sessao.TokenSessao}";
                    }
                }
                else
                {
                    context.Response.Headers.Remove("Authorization");

                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    context.Response.ContentType = "application/json";
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

            await _next(context);
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
