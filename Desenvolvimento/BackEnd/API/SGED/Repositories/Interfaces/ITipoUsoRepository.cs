using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ITipoUsoRepository
{
    Task<IEnumerable<TipoUso>> GetAll();
    Task<TipoUso> GetById(int id);
    Task<TipoUso> Create(TipoUso tipouso);
    Task<TipoUso> Update(TipoUso tipouso);
    Task<TipoUso> Delete(int id);
}
