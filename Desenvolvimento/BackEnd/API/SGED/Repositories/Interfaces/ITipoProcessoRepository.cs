using SGED.Objects.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SGED.Repositories.Interfaces
{
    public interface ITipoProcessoRepository
	{
		Task<IEnumerable<TipoProcessoModel>> GetAll();
		Task<TipoProcessoModel> GetById(int id);
		Task<TipoProcessoModel> Create(TipoProcessoModel TipoProcesso);
		Task<TipoProcessoModel> Update(TipoProcessoModel tipoProcesso);
		Task<TipoProcessoModel> Remove(int id);
	}
}
