using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
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
            if (!string.IsNullOrEmpty(context.Request.Headers["Authorization"]))
            {
                // Atualiza o valor do token no botão "Available authorizations" no Swagger UI
                var token = context.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var updatedToken = $"Bearer {token}";
                context.Response.Headers["Available-Authorizations"] = updatedToken;
            }
            else
            {
                // Limpa o botão "Available-Authorizations" no Swagger para indicar que a sessão foi encerrada
                context.Response.Headers.Remove("Available-Authorizations");
            }

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
