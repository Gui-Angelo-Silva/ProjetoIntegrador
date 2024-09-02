using SGED.DTO.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IProcessoRepository
{
    Task<IEnumerable<Processo>> GetAll();
    Task<Processo> GetById(int id);
    Task<Processo> Create(Processo Processo);
    Task<Processo> Update(Processo Processo);
    Task<Processo> Delete(int id);
}
