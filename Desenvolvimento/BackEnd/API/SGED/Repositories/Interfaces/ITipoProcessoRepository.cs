using SGED.Models.Entities;
using SGED.DTO.Entities;

namespace SGED.Repositories.Interfaces;
public interface ITipoProcessoRepository
{
    Task<IEnumerable<TipoProcesso>> GetAll();
    Task<TipoProcesso> GetById(int id);
    Task<TipoProcesso> Create(TipoProcesso TipoProcesso);
    Task<TipoProcesso> Update(TipoProcesso TipoProcesso);
    Task<TipoProcesso> Delete(int id);
}
