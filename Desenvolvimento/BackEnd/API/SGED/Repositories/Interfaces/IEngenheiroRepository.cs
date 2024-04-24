using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IEngenheiroRepository
{
    Task<IEnumerable<Engenheiro>> GetAll();
    Task<Engenheiro> GetById(int id);
    Task<Engenheiro> Create(Engenheiro engenheiro);
    Task<Engenheiro> Update(Engenheiro engenheiro);
    Task<Engenheiro> Delete(int id);
}
