using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface IProcessoService
    {
        Task<IEnumerable<ProcessoDTO>> GetAll();
        Task<IEnumerable<ProcessoDTO>> GetByStatus(int status);
        Task<ProcessoDTO> GetById(Guid id);
        Task Create(ProcessoDTO ProcessoDTO);
        Task Update(ProcessoDTO ProcessoDTO);
        Task Remove(Guid id);
    }
}
