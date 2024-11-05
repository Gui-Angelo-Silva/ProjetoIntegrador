using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IFiscalRepository
{
    Task<IEnumerable<FiscalModel>> GetAll();
    Task<IEnumerable<FiscalModel>> Search(string search);
    Task<FiscalModel> GetById(int id);
    Task<FiscalModel> Create(FiscalModel fiscal);
    Task<FiscalModel> Update(FiscalModel fiscal);
    Task<FiscalModel> Delete(int id);
}
