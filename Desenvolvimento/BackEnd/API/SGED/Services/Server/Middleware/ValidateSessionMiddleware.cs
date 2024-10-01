using Newtonsoft.Json;
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

                if (tokenParts.Length == 2 && tokenParts[0].Equals("Bearer", StringComparison.OrdinalIgnoreCase))
                {
                    tokenType = tokenParts[0];
                    tokenPrevious = tokenParts[1];

                    sessao = await _sessaoRepository.GetByToken(tokenPrevious);

                    if (sessao is null)
                    {
                        await ReturnUnauthorizedResponse(context, "Acesso Negado: Sessão não encontrada!");
                        return;
                    }
                    else if (!sessao.StatusSessao || !sessao.ValidateToken())
                    {
                        sessao.StatusSessao = false;
                        sessao.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                        await _sessaoRepository.Update(sessao);

                        await ReturnUnauthorizedResponse(context, "Acesso Negado: Sessão expirada!");
                        return;
                    }
                }
                else
                {
                    await ReturnUnauthorizedResponse(context, "Acesso Negado: Token inválido!");
                    return;
                }
            }
            else
            {
                await ReturnUnauthorizedResponse(context, "Acesso Negado: Token não informado!");
                return;
            }

            var _usuarioRepository = scope.ServiceProvider.GetRequiredService<IUsuarioRepository>();
            var _tipoUsuarioRepository = scope.ServiceProvider.GetRequiredService<ITipoUsuarioRepository>();

            var usuario = await _usuarioRepository.GetById(sessao.IdUsuario);
            var tipoUsuario = await _tipoUsuarioRepository.GetById(usuario.IdTipoUsuario);

            context.Items["NivelAcesso"] = tipoUsuario.NivelAcesso;

            await _next(context);
        }

        private static async Task ReturnUnauthorizedResponse(HttpContext context, string errorMessage)
        {
            var _response = new Response
            {
                Message = errorMessage,
                Data = new { error = errorMessage }
            }; _response.SetUnauthorized();

            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            context.Response.ContentType = "application/json";
            context.Response.Headers.Remove("Authorization");

            await context.Response.WriteAsync(JsonConvert.SerializeObject(_response));
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
