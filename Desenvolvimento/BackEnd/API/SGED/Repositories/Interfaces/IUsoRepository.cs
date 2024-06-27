using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IUsoRepository
{
    Task<IEnumerable<Uso>> GetAll();
    Task<Uso> GetById(int id);
    Task<Uso> Create(Uso uso);
    Task<Uso> Update(Uso uso);
    Task<Uso> Delete(int id);
}
