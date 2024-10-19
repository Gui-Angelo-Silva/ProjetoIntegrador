using SGED.DTOs.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ISessaoRepository
{
    Task<IEnumerable<SessaoModel>> GetAll();
    Task<IEnumerable<IEnumerable<SessaoModel>>> GetAllSessionsGroupedByUser();
    Task<IEnumerable<SessaoModel>> GetOpenSessions();
    Task<IEnumerable<SessaoModel>> GetCloseSessions();
    Task<SessaoModel> GetLastSession(int idUsuario);
    Task<SessaoModel> GetById(Guid id);
    Task<SessaoModel> GetByToken(string token);
    Task<UsuarioModel> GetUser(string token);
    Task<SessaoModel> Create(SessaoModel sessao);
    Task<SessaoModel> Update(SessaoModel sessao);
    Task<SessaoModel> Delete(Guid id);

    Task<IEnumerable<UsuarioModel>> GetOnlineUsers();
    Task<IEnumerable<UsuarioModel>> GetOfflineUsers();
    Task<IEnumerable<SessaoModel>> GetOpenSessionByUser(int id);
}
