using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IInfraestruturaRepository
{
    Task<IEnumerable<Infraestrutura>> GetAll();
    Task<IEnumerable<Infraestrutura>> GetByTypeInfrastructure(int idTipoInfraestrutura);
    Task<Infraestrutura> GetById(int id);
    Task<Infraestrutura> Create(Infraestrutura infraestrutura);
    Task<Infraestrutura> Update(Infraestrutura infraestrutura);
    Task<Infraestrutura> Delete(int id);
}
