using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IMunicipeRepository
{
    Task<IEnumerable<MunicipeModel>> GetAll();
    Task<MunicipeModel> GetById(int id);
    Task<MunicipeModel> Create(MunicipeModel municipe);
    Task<MunicipeModel> Update(MunicipeModel municipe);
    Task<MunicipeModel> Delete(int id);
}
