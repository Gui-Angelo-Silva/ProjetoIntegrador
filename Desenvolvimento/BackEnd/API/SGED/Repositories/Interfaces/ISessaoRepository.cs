﻿using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ISessaoRepository
{
    Task<IEnumerable<Sessao>> GetAll();
    Task<IEnumerable<IEnumerable<Sessao>>> GetAllSessionsGroupedByUser();
    Task<IEnumerable<Sessao>> GetOpenSessions();
    Task<IEnumerable<Sessao>> GetCloseSessions();
    Task<Sessao> GetLastSession(int id);
    Task<Sessao> GetById(int id);
    Task<Usuario> GetUser(int id);
    Task<Sessao> Create(Sessao sessao);
    Task<Sessao> Update(Sessao sessao);
    Task<Sessao> Delete(int id);

    Task<IEnumerable<Usuario>> GetOnlineUser();
    Task<IEnumerable<Usuario>> GetOfflineUser();
}