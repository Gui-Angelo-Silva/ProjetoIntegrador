using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Net;
using System;
using Newtonsoft.Json;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;

namespace SGED.Services.Server.Middleware
{
    public class NotFoundMiddleware
    {
        private readonly RequestDelegate _next;

        public NotFoundMiddleware(RequestDelegate next)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
        }

        public async Task InvokeAsync(HttpContext context)
        {
            // Executa o próximo middleware na pipeline
            await _next(context);

            // Verifica se o status ainda é 404 após passar pelos middlewares e endpoints
            if (context.Response.StatusCode == (int)HttpStatusCode.NotFound)
            {
                // Caso o NivelAcesso não esteja presente no contexto
                await ReturnNotFoundResponse(context, "Erro: Endpoint não encontrado!");
                return;
            }
        }

        private static async Task ReturnNotFoundResponse(HttpContext context, string errorMessage)
        {
            var _response = new Response
            {
                Message = errorMessage,
                Data = new { error = errorMessage }
            };
            _response.SetNotFound();

            // Captura a auditoria do contexto após a chamada ao próximo middleware
            if (context.Items.TryGetValue("Auditoria", out var capturedAuditoria))
            {
                if (capturedAuditoria is AuditoriaModel auditoria)
                {
                    auditoria.StatusRequisicao = _response.Status.ToString();
                    auditoria.DescricaoAuditoria = _response.Message;

                    context.Items["Auditoria"] = auditoria;
                }
            }

            context.Response.ContentType = "application/json";

            await context.Response.WriteAsync(JsonConvert.SerializeObject(_response));
        }
    }

    // Classe de extensão para adicionar o middleware à pipeline
    public static class NotFoundMiddlewareExtensions
    {
        public static IApplicationBuilder UseNotFoundMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<NotFoundMiddleware>();
        }
    }
}
