using SGED.Context;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SGED.Helpers;
using Microsoft.EntityFrameworkCore;

namespace SGED.Services.Server.Functions

{
    public class CriteriaAttribute : TypeFilterAttribute
    {
        public CriteriaAttribute(string levelsPermission) : base(typeof(PermissionFilter))
        {
            Arguments = new object[] { levelsPermission };
        }
    }

    public class PermissionFilter : IAsyncActionFilter
    {
        private readonly ISessaoRepository _sessaoRepository;
        private readonly string _levelsPermission;
        private readonly AppDBContext _context;

        public PermissionFilter(ISessaoRepository sessaoRepository, string levelsPermission, AppDBContext context)
        {
            _sessaoRepository = sessaoRepository;
            _levelsPermission = levelsPermission;
            _context = context;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            // Verifica o tipo de método HTTP
            var httpMethod = context.HttpContext.Request.Method;

            // Se não for um método GET, continua com a execução normal do filtro
            if (!context.ActionArguments.TryGetValue("dataSession", out object dataSession))
            { context.Result = new UnauthorizedObjectResult("Objeto da sessão não fornecido!"); return; }

            // Simulação de validação do primeiro objeto
            DataSession dadosSessao = (DataSession)dataSession;
            var sessao = await _sessaoRepository.GetById(dadosSessao.Id);

            if (sessao is null) 
            { context.Result = new UnauthorizedObjectResult("Sessão não encontrada!"); return; }

            else if(sessao.StatusSessao || SessaoDTO.ValidateToken(sessao.TokenSessao, sessao.Usuario.EmailPessoa)) 
            { context.Result = new UnauthorizedObjectResult("Sessão inválida!"); return; }

            else if (String.CompareOrdinal(_levelsPermission, sessao.Usuario.TipoUsuario.NivelAcesso) < 0 || String.CompareOrdinal(_levelsPermission, sessao.Usuario.Id.ToString()) < 0)
            { context.Result = new UnauthorizedObjectResult("Sem previlégios de permissão!"); return; }

            // Se o método HTTP requisitado for POST, PUT ou DELETE
            if (httpMethod != "GET")
            {
                // Armazenar o usuário no contexto da solicitação para acesso posterior no método HTTP
                context.HttpContext.Items["IdUsuario"] = sessao.Usuario.Id;
            }

            // Antes de chamar next(), remova os objetos do contexto do Entity Framework
            _context.Entry(sessao).State = EntityState.Detached;
            _context.Entry(sessao.Usuario).State = EntityState.Detached;
            _context.Entry(sessao.Usuario.TipoUsuario).State = EntityState.Detached;

            // Se a validação passar, continuamos com a execução normal da ação
            await next();
        }
    }
}
