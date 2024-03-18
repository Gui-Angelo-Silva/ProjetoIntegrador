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
                var token = authorizationHeader.StartsWith("Bearer ") ? authorizationHeader.Substring("Bearer ".Length) : authorizationHeader;

                var sessao = await _sessaoRepository.GetByToken(token);

                if (sessao is null)
                {
                    context.Response.Headers.Remove("Authorization");

                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "text/plain";
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Erro: Sessão não encontrada!" }));
                }
                else if (!sessao.StatusSessao || !SessaoDTO.ValidateToken(sessao.TokenSessao, sessao.EmailPessoa))
                {
                    context.Response.Headers.Remove("Authorization");

                    sessao.TokenSessao = "";
                    sessao.StatusSessao = false;
                    sessao.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                    await _sessaoRepository.Update(sessao);

                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    context.Response.ContentType = "text/plain";
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Erro: Sessão expirada!" }));
                }
                else
                {
                    sessao.TokenSessao = SessaoDTO.GenerateToken(sessao.EmailPessoa);
                    await _sessaoRepository.Update(sessao);

                    /*context.Request.Headers.Remove("Authorization");
                    context.Request.Headers.Add("Authorization", "Bearer " + sessao.TokenSessao);*/

                    context.Request.Headers["Authorization"] = $"Bearer {sessao.TokenSessao}";
                }
            }
            else
            {
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                context.Response.ContentType = "text/plain";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(new { error = "Token não informado!" }));
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
