using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IEngenheiroRepository
{
    Task<IEnumerable<EngenheiroModel>> GetAll();
    Task<EngenheiroModel> GetById(int id);
    Task<EngenheiroModel> Create(EngenheiroModel engenheiro);
    Task<EngenheiroModel> Update(EngenheiroModel engenheiro);
    Task<EngenheiroModel> Delete(int id);
}
