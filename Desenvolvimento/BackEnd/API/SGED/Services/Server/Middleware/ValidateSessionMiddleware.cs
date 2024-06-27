using Newtonsoft.Json;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities;
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
            var sessao = default(Sessao);
            var tokenPrevious = "";
            var tokenType = "";
            var _response = new Response();

            if (context.Request.Headers.TryGetValue("Authorization", out Microsoft.Extensions.Primitives.StringValues valuePrevious))
            {
                var authorizationHeader = valuePrevious.ToString();
                var tokenParts = authorizationHeader.Split(' ');

                if (tokenParts.Length == 2)
                {
                    var validTypes = new List<string> { "Front", "Back" };
                    tokenType = tokenParts[0];
                    tokenPrevious = tokenParts[1];

                    if (!validTypes.Contains(tokenType))
                    {
                        context.Response.Headers.Remove("Authorization");
                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.Response.ContentType = "application/json";
                        context.Request.Headers.Remove("Authorization");

                        _response.SetUnauthorized();
                        _response.Message = "Erro: Token inválido!";
                        _response.Data = new { errorToken = "Erro: Token inválido!" };
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(_response));
                        return;
                    }

                    sessao = await _sessaoRepository.GetByToken(tokenPrevious);

                    if (sessao is null)
                    {
                        context.Response.Headers.Remove("Authorization");
                        context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.Response.ContentType = "application/json";
                        context.Request.Headers.Remove("Authorization");

                        _response.SetUnauthorized();
                        _response.Message = "Erro: Sessão não encontrada!";
                        _response.Data = new { errorToken = "Erro: Sessão não encontrada!" };
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(_response));
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

                        _response.SetUnauthorized();
                        _response.Message = "Erro: Sessão expirada!";
                        _response.Data = new { errorToken = "Erro: Sessão expirada!" };
                        await context.Response.WriteAsync(JsonConvert.SerializeObject(_response));
                        return;
                    }
                }
                else
                {
                    context.Response.Headers.Remove("Authorization");
                    context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    context.Response.ContentType = "application/json";
                    context.Request.Headers.Remove("Authorization");

                    _response.SetUnauthorized();
                    _response.Message = "Erro: Token inválido!";
                    _response.Data = new { errorToken = "Erro: Token inválido!" };
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(_response));
                    return;
                }
            }
            else
            {
                context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                context.Response.ContentType = "application/json";

                _response.SetUnauthorized();
                _response.Message = "Token não informado!";
                _response.Data = new { errorToken = "Token não informado!" };
                await context.Response.WriteAsync(JsonConvert.SerializeObject(_response));
                return;
            }

            await _next(context);

            if (tokenType == "Front")
            {
                sessao.GenerateToken();
                await _sessaoRepository.Update(sessao);
                context.Request.Headers.Remove("Authorization");
                context.Request.Headers.Add("Authorization", "Front " + sessao.TokenSessao);
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
