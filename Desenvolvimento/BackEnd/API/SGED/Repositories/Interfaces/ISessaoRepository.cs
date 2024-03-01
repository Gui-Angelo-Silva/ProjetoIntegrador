using SGED.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ISessaoRepository
{
    Task<IEnumerable<Sessao>> GetAll();
    Task<IEnumerable<Sessao>> GetOpenSession();
    Task<Sessao> GetLastSession(int id);
    Task<Sessao> GetById(int id);
    Task<Sessao> Create(Sessao sessao);
    Task<Sessao> Update(Sessao sessao);
    Task<Sessao> Delete(int id);

    Task<IEnumerable<Usuario>> GetOnlineUser();
    Task<IEnumerable<Usuario>> GetOfflineUser();
}
