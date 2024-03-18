using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.SwaggerUI;
using System;
using System.Threading.Tasks;

namespace SGED.Services.Server.Middleware
{
    public class UpdateAuthorizeMiddleware
    {
        private readonly RequestDelegate _next;

        public UpdateAuthorizeMiddleware(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var authorizationHeader = context.Request.Headers["Authorization"];
            var swaggerAuthorizeValue = string.Empty;

            // Verifica se há uma sessão/token configurado e se um token foi passado no header
            if (!string.IsNullOrEmpty(authorizationHeader))
            {
                swaggerAuthorizeValue = authorizationHeader.ToString();
            }

            // Atualiza o valor do botão "Authorize" do Swagger
            var swaggerAuthorizeObject = new
            {
                AvailableAuthorizations = new
                {
                    Bearer = new
                    {
                        Description = "Enter 'Bearer' [space] your token",
                        In = "header",
                        Name = "Authorization",
                        Value = swaggerAuthorizeValue
                    }
                }
            };

            // Atualiza o valor do botão "Authorize" no contexto da requisição
            context.Items["SwaggerAuthorizeValue"] = JsonConvert.SerializeObject(swaggerAuthorizeObject);

            await _next(context);
        }
    }

    public static class UpdateAuthorizeMiddlewareExtensions
    {
        public static IApplicationBuilder UseUpdateAuthorizeMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<UpdateAuthorizeMiddleware>();
        }
    }
}
