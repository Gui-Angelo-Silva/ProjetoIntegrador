using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface ITipoLogradouroRepository
	{
		Task<IEnumerable<TipoLogradouroModel>> GetAll();
		Task<TipoLogradouroModel> GetById(int id);
		Task<TipoLogradouroModel> Create(TipoLogradouroModel tipoLogradouro);
		Task<TipoLogradouroModel> Update(TipoLogradouroModel tipoLogradouro);
		Task<TipoLogradouroModel> Delete(int id);
	}
}
