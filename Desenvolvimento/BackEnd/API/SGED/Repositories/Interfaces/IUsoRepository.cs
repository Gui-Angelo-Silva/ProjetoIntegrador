using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IUsoRepository
{
    Task<IEnumerable<UsoModel>> GetAll();
    Task<UsoModel> GetById(int id);
    Task<UsoModel> Create(UsoModel uso);
    Task<UsoModel> Update(UsoModel uso);
    Task<UsoModel> Delete(int id);
}
