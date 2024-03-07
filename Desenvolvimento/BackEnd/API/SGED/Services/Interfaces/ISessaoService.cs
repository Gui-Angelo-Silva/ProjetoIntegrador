﻿using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.Services.Interfaces
{
    public interface ISessaoService
    {
        Task<IEnumerable<SessaoDTO>> GetAll();
        Task<IEnumerable<SessaoDTO>> GetOpenSessions();
        Task<IEnumerable<SessaoDTO>> GetCloseSessions();
        Task<SessaoDTO> GetLastSession(int id);
        Task<SessaoDTO> GetById(int id);
        Task<UsuarioDTO> GetUser(int id);
        Task Create(SessaoDTO sessaoDTO);
        Task Update(SessaoDTO sessaoDTO);
        Task Remove(int id);

        Task<IEnumerable<UsuarioDTO>> GetOnlineUser();
        Task<IEnumerable<UsuarioDTO>> GetOfflineUser();
    }
}