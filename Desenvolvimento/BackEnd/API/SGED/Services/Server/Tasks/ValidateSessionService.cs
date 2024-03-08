using SGED.Context;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SGED.Helpers;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Authorization;

namespace SGED.Services.Server.Tasks

{
    [AttributeUsage(AttributeTargets.Method)]
    public class AnonymousAttribute : Attribute 
    {
        public string Anonymous { get; }

        public AnonymousAttribute()
        {
            Anonymous = "Anonymous";
        }
    }

    public class ValidateSessionService
    {
        private readonly RequestDelegate _next;
        private readonly IServiceProvider _serviceProvider;

        public ValidateSessionService(RequestDelegate next, IServiceProvider serviceProvider)
        {
            _next = next;
            _serviceProvider = serviceProvider;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (context.Request.Path.StartsWithSegments("/api")) // Verifica se a solicitação é para a API
            {
                var attribute = context.GetEndpoint()?.Metadata.GetMetadata<AnonymousAttribute>();
                if (attribute != null && attribute.Anonymous == "Anonymous") { await _next(context); return; } // Se o método estiver marcado como AllowAnonymous, não faça a validação da sessão

                using var scope = _serviceProvider.CreateScope();
                var _sessaoRepository = scope.ServiceProvider.GetRequiredService<ISessaoRepository>();
                var _usuarioRepository = scope.ServiceProvider.GetRequiredService<IUsuarioRepository>();

                // Verifica se a sessão está presente na requisição
                if (context.Request.Headers.TryGetValue("session", out var sessionHeader))
                {
                    var sessionJson = sessionHeader.FirstOrDefault();

                    // Deserializa a string do cabeçalho para o tipo DataSession
                    var dataSession = JsonConvert.DeserializeObject<DataSession>(sessionJson);

                    var sessao = await _sessaoRepository.GetById(dataSession.Id);

                    if (sessao is null)
                    {
                        // Sessão não encontrada
                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsync("Sessão não encontrada!");
                        return;
                    }

                    else if (sessao.StatusSessao || SessaoDTO.ValidateToken(sessao.TokenSessao, sessao.Usuario.EmailPessoa))
                    {
                        // Sessão inválida
                        sessao.TokenSessao = "";
                        sessao.StatusSessao = false;
                        sessao.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                        await _sessaoRepository.Update(sessao);

                        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                        await context.Response.WriteAsync("Sessão inválida!");
                        return;
                    }

                    // Atualiza o token da sessão
                    sessao.TokenSessao = SessaoDTO.GenerateToken(sessao.Usuario.EmailPessoa);
                    await _sessaoRepository.Update(sessao);

                    context.Items["User"] = sessao.Usuario;
                    await _next(context);
                    return;
                }
                else
                {
                    // Sessão não informada
                    context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                    await context.Response.WriteAsync("Sessão não informada!");
                    return;
                }
            }

            await _next(context);
        }
    }
}
