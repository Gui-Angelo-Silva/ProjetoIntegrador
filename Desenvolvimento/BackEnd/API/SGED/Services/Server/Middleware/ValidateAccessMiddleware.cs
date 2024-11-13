using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using SGED.Objects.Utilities;
using SGED.Services.Server.Attributes;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SGED.Services.Server.Middleware
{
    public class ValidateAccessMiddleware
    {
        private readonly RequestDelegate _next;

        public ValidateAccessMiddleware(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Verifique se o valor de NivelAcesso está presente no contexto
            if (context.Items.TryGetValue("NivelAcesso", out var nivelAcesso))
            {
                var endpoint = context.GetEndpoint();
                if (endpoint != null)
                {
                    // Tente obter o atributo AccessPermissionAttribute do método atual
                    var accessPermissionAttribute = endpoint.Metadata.GetMetadata<AccessPermissionAttribute>();
                    if (accessPermissionAttribute != null)
                    {
                        // Verifique se o NivelAcesso do usuário está na lista de permissões
                        if (!accessPermissionAttribute.AllowedPermissions.Contains(nivelAcesso?.ToString()))
                        {
                            // Chame a função para retornar uma resposta de acesso negado
                            await ReturnForbiddenResponse(context, "Acesso Negado: Permissões insuficientes!");
                            return;
                        }
                    }
                }
            }
            else
            {
                // Caso o NivelAcesso não esteja presente no contexto
                await ReturnForbiddenResponse(context, "Acesso Negado: Nível de acesso não identificado!");
                return;
            }

            // Se necessário declare em um finally
            context.Items.Remove("NivelAcesso");

            // Se todas as verificações passarem, prossiga para o próximo middleware
            await _next(context);
        }

        private static async Task ReturnForbiddenResponse(HttpContext context, string errorMessage)
        {
            var _response = new Response
            {
                Message = errorMessage,
                Data = new { error = errorMessage }
            };
            _response.SetForbidden();

            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            context.Response.ContentType = "application/json";
            context.Response.Headers.Remove("Authorization");

            await context.Response.WriteAsync(JsonConvert.SerializeObject(_response));
        }
    }

    public static class ValidateAccessMiddlewareExtensions
    {
        public static IApplicationBuilder UseValidateAccessMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ValidateAccessMiddleware>();
        }
    }
}
