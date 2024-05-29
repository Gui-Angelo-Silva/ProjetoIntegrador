using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ITipoInfraestruturaRepository
{
    Task<IEnumerable<TipoInfraestrutura>> GetAll();
    Task<TipoInfraestrutura> GetById(int id);
    Task<TipoInfraestrutura> Create(TipoInfraestrutura tipoinfraestrutura);
    Task<TipoInfraestrutura> Update(TipoInfraestrutura tipoinfraestrutura);
    Task<TipoInfraestrutura> Delete(int id);
}
