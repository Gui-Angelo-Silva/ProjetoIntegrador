using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IFiscalRepository
{
    Task<IEnumerable<Fiscal>> GetAll();
    Task<Fiscal> GetById(int id);
    Task<Fiscal> Create(Fiscal fiscal);
    Task<Fiscal> Update(Fiscal fiscal);
    Task<Fiscal> Delete(int id);
}
