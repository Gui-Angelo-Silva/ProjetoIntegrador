using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface ICondicaoSoloRepository
    {
        Task<IEnumerable<CondicaoSolo>> GetAll();
        Task<CondicaoSolo> GetById(int id);
        Task<IEnumerable<CondicaoSolo>> GetByCondiction(string condicaosolo);
        Task<CondicaoSolo> Create(CondicaoSolo condicaosolo);
        Task<CondicaoSolo> Update(CondicaoSolo condicaosolo);
        Task<CondicaoSolo> Delete(int id);  
    }
}