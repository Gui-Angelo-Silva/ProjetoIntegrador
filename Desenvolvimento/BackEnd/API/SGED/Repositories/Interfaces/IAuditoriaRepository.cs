using SGED.DTOs.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IAuditoriaRepository
{
    Task<IEnumerable<AuditoriaModel>> GetAll();
    Task<IEnumerable<AuditoriaModel>> GetBySession(Guid idSessao);
    Task<AuditoriaModel> GetById(Guid id);
    Task<AuditoriaModel> Create(AuditoriaModel auditoria);
    Task<AuditoriaModel> Update(AuditoriaModel auditoria);
    Task<AuditoriaModel> Delete(Guid id);
}
