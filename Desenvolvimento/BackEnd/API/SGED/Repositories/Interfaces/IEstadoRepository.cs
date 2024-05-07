using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IEstadoRepository
{
    Task<IEnumerable<Estado>> GetAll();
    Task<Estado> GetById(int id);
    Task<IEnumerable<Estado>> GetByName(string nome);
    Task<Estado> Create(Estado estado);
    Task<Estado> Update(Estado estado);
    Task<Estado> Delete(int id);
}
