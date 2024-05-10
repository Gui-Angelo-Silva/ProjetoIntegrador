using Newtonsoft.Json;
using SGED.Objects.DTO.Entities;
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
                    else if (!sessao.StatusSessao || !sessao.ValidateToken())
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
