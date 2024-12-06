using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ITipoInfraestruturaRepository
{
    Task<IEnumerable<TipoInfraestruturaModel>> GetAll();
    Task<TipoInfraestruturaModel> GetById(int id);
    Task<TipoInfraestruturaModel> Create(TipoInfraestruturaModel tipoinfraestrutura);
    Task<TipoInfraestruturaModel> Update(TipoInfraestruturaModel tipoinfraestrutura);
    Task<TipoInfraestruturaModel> Delete(int id);
}
