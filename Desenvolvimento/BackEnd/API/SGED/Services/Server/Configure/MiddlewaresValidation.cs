using SGED.Services.Server.Attributes;
using SGED.Services.Server.Middleware;

namespace SGED.Services.Server
{
    public static class MiddlewaresValidation
    {
        // Método de extensão para configurar os middlewares da aplicação
        public static void ConfigureMiddlewares(this IApplicationBuilder appBuilder)
        {
            // Middleware de limpeza de contexto
            appBuilder.UseWhen(context => !IsAnonymousEndpoint(context), app =>
            {
                app.UseCleanupContextMiddleware();
            });

            // Middleware de validação de sessão
            appBuilder.UseWhen(context => !IsAnonymousEndpoint(context), app =>
            {
                app.UseValidateSessionMiddleware();
            });

            // Middleware de auditoria
            appBuilder.UseWhen(context => !IsAnonymousEndpoint(context), app =>
            {
                app.UseAuditMiddleware();
            });

            // Verificação de resposta Unauthorized (401)
            appBuilder.UseWhen(context => !IsAnonymousEndpoint(context), app =>
            {
                app.Use(async (context, next) =>
                {
                    await next();
                    if (context.Response.StatusCode == StatusCodes.Status401Unauthorized)
                    {
                        // Lógica personalizada para resposta 401
                        return;
                    }
                });
            });

            // Middleware de validação de acesso
            appBuilder.UseWhen(context => !IsAnonymousEndpoint(context), app =>
            {
                app.UseValidateAccessMiddleware();
            });

            // Verificação de resposta Forbidden (403)
            appBuilder.UseWhen(context => !IsAnonymousEndpoint(context), app =>
            {
                app.Use(async (context, next) =>
                {
                    await next();
                    if (context.Response.StatusCode == StatusCodes.Status403Forbidden)
                    {
                        // Lógica personalizada para resposta 403
                        return;
                    }
                });
            });

            // Middleware para endpoint inexistente
            appBuilder.UseWhen(context => !IsAnonymousEndpoint(context), app =>
            {
                app.UseNotFoundMiddleware();
            });

            // Verificação de resposta Not Found (404)
            appBuilder.UseWhen(context => !IsAnonymousEndpoint(context), app =>
            {
                app.Use(async (context, next) =>
                {
                    await next();
                    if (context.Response.StatusCode == StatusCodes.Status404NotFound)
                    {
                        // Lógica personalizada para resposta 404
                        return;
                    }
                });
            });
        }

        // Método auxiliar para verificar se o endpoint é anônimo
        private static bool IsAnonymousEndpoint(HttpContext context)
        {
            return context.GetEndpoint()?.Metadata.GetMetadata<AnonymousAttribute>() != null;
        }
    }
}
