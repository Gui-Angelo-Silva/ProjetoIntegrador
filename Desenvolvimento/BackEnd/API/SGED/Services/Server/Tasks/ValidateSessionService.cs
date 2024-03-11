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
            using var scope = _serviceProvider.CreateScope();
            var _sessaoRepository = scope.ServiceProvider.GetRequiredService<ISessaoRepository>();
            var _usuarioRepository = scope.ServiceProvider.GetRequiredService<IUsuarioRepository>();

            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json";

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
                    var responseJson = "{\"error\": \"Sessão não encontrada!\"}";
                    await context.Response.WriteAsync(responseJson);
                    return;
                }

                else if (sessao.StatusSessao || SessaoDTO.ValidateToken(sessao.TokenSessao, sessao.Usuario.EmailPessoa))
                {
                    // Sessão inválida
                    sessao.TokenSessao = "";
                    sessao.StatusSessao = false;
                    sessao.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                    await _sessaoRepository.Update(sessao);

                    var responseJson = "{\"error\": \"Sessão inválida!\"}";
                    await context.Response.WriteAsync(responseJson);
                    return;
                }

                // Atualiza o token da sessão
                sessao.TokenSessao = SessaoDTO.GenerateToken(sessao.Usuario.EmailPessoa);
                await _sessaoRepository.Update(sessao);

                context.Items.Remove("Session");
                context.Items["User"] = sessao.Usuario;
                await _next(context);
                return;
            }
            else
            {
                // Sessão não informada
                var responseJson = "{\"error\": \"Sessão não informada!\"}";
                await context.Response.WriteAsync(responseJson);
                return;
            }
        }
    }
}
