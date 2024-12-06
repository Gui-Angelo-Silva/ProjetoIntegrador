using System.Net;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using SGED.Objects.Utilities;

namespace SGED.Services.Server.Middleware
{
    public class AuditMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IServiceProvider _serviceProvider;

        public AuditMiddleware(RequestDelegate next, IServiceProvider serviceProvider)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _serviceProvider = serviceProvider;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            if (!context.Items.ContainsKey("IdSessao")) 
            {
                return;
            }

            using var scope = _serviceProvider.CreateScope();
            var _auditRepository = scope.ServiceProvider.GetRequiredService<IAuditoriaRepository>();

            // Captura data e hora atuais no formato desejado
            string dataAuditoria = DateTime.Now.ToString("dd/MM/yyyy");
            string horaAuditoria = DateTime.Now.ToString("HH:mm:ss.fff");

            // Identifica o tipo de requisição (GET, POST, PUT, DELETE, PATCH)
            string acaoAuditoria = context.Request.Method switch
            {
                "GET" => "Solicitação",
                "POST" => "Inserção",
                "PUT" => "Alteração",
                "DELETE" => "Exclusão",
                "PATCH" => "Atualização Parcial",
                _ => "Desconhecido"
            };

            // Captura o endpoint solicitado (método)
            string endpoint = !string.IsNullOrWhiteSpace(context.Request.Path) ? context.Request.Path : "Método Desconhecido";

            // Captura o Id do sessão vindo do contexto, se estiver autenticado
            Guid idSessao = (Guid)context.Items["IdSessao"];

            // Define a tabela ou recurso afetado com base no endpoint
            string tabelaAuditoria = endpoint.Contains("/api/") ? endpoint.Split('/')[2] : "Recurso Desconhecido";

            // Inicialização do status e descrição
            string status = "";
            string descricao = "";

            // Se a resposta de não autorizado existir no contexto
            if (context.Items.TryGetValue("UnauthorizedResponse", out var unauthorizedResponse))
            {
                // Captura o status e a descrição do response
                if (unauthorizedResponse is Response response)
                {
                    status = response.Status.ToString(); // Pega o enum como string
                    descricao = response.Message; // Pega a mensagem de erro
                }
            }

            // Criação da entidade de auditoria
            var auditoria = new AuditoriaModel
            {
                EndpointAuditoria = endpoint,
                TabelaAuditoria = tabelaAuditoria,
                RegistroAuditoria = 0, // Pode ser ajustado dependendo do registro específico
                AcaoAuditoria = acaoAuditoria,
                StatusRequisicao = status, // Alterar conforme a lógica de tratamento de erros
                DataAuditoria = dataAuditoria,
                HoraAuditoria = horaAuditoria,
                DescricaoAuditoria = descricao,
                IdSessao = idSessao
            };

            context.Items["Auditoria"] = auditoria;

            // Chama o próximo middleware na pipeline
            await _next(context);

            // Captura a auditoria do contexto após a chamada ao próximo middleware
            if (context.Items.TryGetValue("Auditoria", out var capturedAuditoria))
            {
                if (capturedAuditoria is AuditoriaModel finalAuditoria)
                {
                    auditoria = finalAuditoria;
                }
            }

            // Tradução do status para português
            string statusTraduzido = auditoria.StatusRequisicao switch
            {
                "Success" => "Sucesso",
                "Invalid" => "Inválido",
                "NotFound" => "Não Encontrado",
                "Conflict" => "Conflito",
                "Unauthorized" => "Não Autenticado",
                "Forbidden" => "Acesso Negado",
                "Error" => "Erro",
                _ => "Desconhecido"
            };

            auditoria.StatusRequisicao = statusTraduzido;

            // Salvar a auditoria no banco de dados
            await _auditRepository.Create(auditoria);
        }
    }

    // Classe de extensão para registrar o middleware de auditoria
    public static class AuditMiddlewareExtensions
    {
        public static IApplicationBuilder UseAuditMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<AuditMiddleware>();
        }
    }
}
