using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface ITipoUsuarioRepository
	{
		Task<IEnumerable<TipoUsuarioModel>> GetAll();
		Task<TipoUsuarioModel> GetById(int id);
		Task<TipoUsuarioModel> Create(TipoUsuarioModel tipousuario);
		Task<TipoUsuarioModel> Update(TipoUsuarioModel tipousuario);
		Task<TipoUsuarioModel> Delete(int id);
	}
}
