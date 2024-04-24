using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface ITipoLogradouroRepository
	{
		Task<IEnumerable<TipoLogradouro>> GetAll();
		Task<TipoLogradouro> GetById(int id);
		Task<TipoLogradouro> Create(TipoLogradouro tipoLogradouro);
		Task<TipoLogradouro> Update(TipoLogradouro tipoLogradouro);
		Task<TipoLogradouro> Delete(int id);
	}
}
