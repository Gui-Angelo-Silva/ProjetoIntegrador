using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IInfraestruturaRepository
{
    Task<IEnumerable<InfraestruturaModel>> GetAll();
    Task<IEnumerable<InfraestruturaModel>> GetByTypeInfrastructure(int idTipoInfraestrutura);
    Task<InfraestruturaModel> GetById(int id);
    Task<InfraestruturaModel> Create(InfraestruturaModel infraestrutura);
    Task<InfraestruturaModel> Update(InfraestruturaModel infraestrutura);
    Task<InfraestruturaModel> Delete(int id);
}
