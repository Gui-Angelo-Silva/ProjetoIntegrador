using SGED.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetAll();
    Task<Usuario> GetById(int id);
    Task<IEnumerable<Usuario>> GetByEmail(int id, string email);
    Task<Usuario> Autentication(Autentication autentication);
    Task<Usuario> Create(Usuario usuario);
    Task<Usuario> Update(Usuario usuario);
    Task<Usuario> Delete(int id);
}
