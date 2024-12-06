using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace SGED.Services.Server.Middleware
{
    public class CleanupContextMiddleware
    {
        private readonly RequestDelegate _next;

        public CleanupContextMiddleware(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Executa o próximo middleware na pipeline
            await _next(context);

            // Limpa todas as entradas do HttpContext.Items
            context.Items.Clear();
        }
    }

    // Classe de extensão para adicionar o middleware à pipeline
    public static class CleanupContextMiddlewareExtensions
    {
        public static IApplicationBuilder UseCleanupContextMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CleanupContextMiddleware>();
        }
    }
}
