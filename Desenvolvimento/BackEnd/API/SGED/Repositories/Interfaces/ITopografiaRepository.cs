using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ITopografiaRepository
{
    Task<IEnumerable<Topografia>> GetAll();
    Task<Topografia> GetById(int id);
    Task<Topografia> Create(Topografia topografia);
    Task<Topografia> Update(Topografia topografia);
    Task<Topografia> Delete(int id);
}
