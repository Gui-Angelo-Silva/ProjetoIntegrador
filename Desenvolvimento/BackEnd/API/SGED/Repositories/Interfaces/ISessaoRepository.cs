using SGED.DTO.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ISessaoRepository
{
    Task<IEnumerable<Sessao>> GetAll();
    Task<IEnumerable<IEnumerable<Sessao>>> GetAllSessionsGroupedByUser();
    Task<IEnumerable<Sessao>> GetOpenSessions();
    Task<IEnumerable<Sessao>> GetCloseSessions();
    Task<Sessao> GetLastSession(int id);
    Task<Sessao> GetById(int id);
    Task<Sessao> GetByToken(string token);
    Task<Usuario> GetUser(string token);
    Task<Sessao> Create(Sessao sessao);
    Task<Sessao> Update(Sessao sessao);
    Task<Sessao> Delete(int id);

    Task<IEnumerable<Usuario>> GetOnlineUsers();
    Task<IEnumerable<Usuario>> GetOfflineUsers();
    Task<IEnumerable<Sessao>> GetOpenSessionByUser(int id);
}
