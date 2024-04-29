using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface ITipoUsuarioRepository
	{
		Task<IEnumerable<TipoUsuario>> GetAll();
		Task<TipoUsuario> GetById(int id);
		Task<TipoUsuario> Create(TipoUsuario tipousuario);
		Task<TipoUsuario> Update(TipoUsuario tipousuario);
		Task<TipoUsuario> Delete(int id);
	}
}
