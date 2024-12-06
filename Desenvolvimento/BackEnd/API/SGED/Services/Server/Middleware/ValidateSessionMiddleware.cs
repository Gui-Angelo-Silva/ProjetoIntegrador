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
            var sessao = default(SessaoModel);
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

                    // Verifica se o token não é nulo ou vazio
                    if (string.IsNullOrEmpty(tokenPrevious))
                    {
                        await ReturnUnauthorizedResponse(context, "Acesso Negado: Token inválido!");
                        return;
                    }

                    // Obtém a sessão pelo token
                    sessao = await _sessaoRepository.GetByToken(tokenPrevious);

                    // Verifica se a sessão é nula
                    if (sessao is null)
                    {
                        await ReturnUnauthorizedResponse(context, "Acesso Negado: Sessão não encontrada!");
                        return;
                    }

                    // Captura os IPs da requisição
                    string ipv4 = context.Connection.RemoteIpAddress?.MapToIPv4().ToString() ?? string.Empty;
                    string ipv6 = context.Connection.RemoteIpAddress?.MapToIPv6().ToString() ?? string.Empty;

                    // Verifica se ambos os IPs foram identificados
                    if (string.IsNullOrEmpty(ipv4) || string.IsNullOrEmpty(ipv6))
                    {
                        await ReturnUnauthorizedResponse(context, "Acesso Negado: IP de origem não identificado!");
                        return;
                    }

                    try
                    {
                        // Normaliza os endereços IP da sessão
                        IPAddress sessaoIPv4 = IPAddress.Parse(sessao.IPv4);
                        IPAddress sessaoIPv6 = IPAddress.Parse(sessao.IPv6);

                        // Normaliza os IPs capturados da requisição
                        IPAddress atualIPv4 = IPAddress.Parse(ipv4);
                        IPAddress atualIPv6 = IPAddress.Parse(ipv6);

                        // Comparação dos IPs capturados com os IPs armazenados na sessão
                        if (!sessaoIPv4.Equals(atualIPv4) || !sessaoIPv6.Equals(atualIPv6))
                        {
                            await ReturnUnauthorizedResponse(context, "Acesso Negado: IP de origem malicioso!");
                            return;
                        }
                    }
                    catch (FormatException)
                    {
                        await ReturnUnauthorizedResponse(context, "Acesso Negado: IP inválido!");
                        return;
                    }

                    // Verifica o status da sessão e valida o token
                    if (!sessao.StatusSessao || !sessao.ValidateToken())
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

            context.Items["IdSessao"] = sessao.Id;
            context.Items["NivelAcesso"] = sessao.NivelAcesso;

            await _next(context);
        }

        private static async Task ReturnUnauthorizedResponse(HttpContext context, string errorMessage)
        {
            var _response = new Response
            {
                Message = errorMessage,
                Data = new { error = errorMessage }
            };
            _response.SetUnauthorized();

            // Armazenar a resposta no contexto para ser acessada por outros middlewares
            context.Items["Response"] = _response;

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
