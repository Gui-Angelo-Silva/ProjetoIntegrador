using SGED.Objects.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SGED.Repositories.Interfaces
{
    public interface ITipoProcessoRepository
	{
		Task<IEnumerable<TipoProcesso>> GetAll();
		Task<TipoProcesso> GetById(int id);
		Task<TipoProcesso> Create(TipoProcesso TipoProcesso);
		Task<TipoProcesso> Update(TipoProcesso tipoProcesso);
		Task<TipoProcesso> Remove(int id);
	}
}
