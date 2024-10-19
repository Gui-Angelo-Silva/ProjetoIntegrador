using SGED.DTOs.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IProcessoRepository
{
    Task<IEnumerable<ProcessoModel>> GetAll();
    Task<ProcessoModel> GetById(Guid id);
    Task<ProcessoModel> Create(ProcessoModel Processo);
    Task<ProcessoModel> Update(ProcessoModel Processo);
    Task<ProcessoModel> Delete(Guid id);
}
