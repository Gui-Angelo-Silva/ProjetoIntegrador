using SGED.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetAll();
    Task<Usuario> GetById(int id);
    Task<Usuario> Create(Usuario pessoa);
    Task<Usuario> Update(Usuario pessoa);
    Task<Usuario> Delete(int id);
}
