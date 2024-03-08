using SGED.Context;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SGED.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using SGED.Models.Entities;
using MySqlX.XDevAPI;

namespace SGED.Services.Server.Functions

{
    [AttributeUsage(AttributeTargets.Method)]
    public class AuthorizationAttribute : Attribute
    {
        public string RequiredAccessLevel { get; }

        public AuthorizationAttribute(string requiredAccessLevel)
        {
            RequiredAccessLevel = requiredAccessLevel;
        }
    }

    public class AuthorizationMiddleware
    {
        private readonly ITipoUsuarioRepository _tipoUsuarioRepository;
        private readonly RequestDelegate _next;

        public AuthorizationMiddleware(RequestDelegate next, ITipoUsuarioRepository tipoUsuarioRepository)
        {
            _next = next ?? throw new ArgumentNullException(nameof(next));
            _tipoUsuarioRepository = tipoUsuarioRepository ?? throw new ArgumentNullException(nameof(tipoUsuarioRepository));
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                var attribute = context.GetEndpoint()?.Metadata.GetMetadata<AuthorizationAttribute>();
                if (attribute != null && !await AuthorizeAsync(attribute.RequiredAccessLevel, context))
                {
                    context.Response.StatusCode = 403; // Acesso negado
                    await context.Response.WriteAsync("Acesso negado!");
                    return;
                }

                await _next(context);
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 500; // Erro interno do servidor
                await context.Response.WriteAsync($"Erro durante a autorização: {ex.Message}");
            }
        }

        public async Task<bool> AuthorizeAsync(string requiredAccessLevel, HttpContext context)
        {
            if (!context.Items.ContainsKey("User"))
                return false; // Sessão inválida

            if (context.Items["User"] is not Usuario user)
                return false; // Usuário não encontrado na sessão

            var typeuser = await _tipoUsuarioRepository.GetById(user.IdTipoUsuario);
            if (typeuser == null)
                return false; // Tipo de usuário não encontrado

            return typeuser.NivelAcesso.CompareTo(requiredAccessLevel) >= 0;
        }
    }
}
