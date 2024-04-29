using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IMunicipeRepository
{
    Task<IEnumerable<Municipe>> GetAll();
    Task<Municipe> GetById(int id);
    Task<Municipe> Create(Municipe municipe);
    Task<Municipe> Update(Municipe municipe);
    Task<Municipe> Delete(int id);
}
