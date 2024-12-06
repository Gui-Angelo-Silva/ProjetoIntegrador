using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface IAuditoriaService
    {
        Task<IEnumerable<AuditoriaDTO>> GetAll();
        Task<IEnumerable<AuditoriaDTO>> GetBySession(Guid idSessao);
        Task<AuditoriaDTO> GetById(Guid id);
        Task Create(AuditoriaDTO auditoriaDTO);
        Task Update(AuditoriaDTO auditoriaDTO);
        Task Remove(Guid id);
    }
}
