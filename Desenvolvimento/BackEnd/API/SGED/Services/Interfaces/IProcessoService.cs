using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IProcessoService
    {
        Task<IEnumerable<ProcessoDTO>> GetAll();
        Task<ProcessoDTO> GetById(Guid id);
        Task Create(ProcessoDTO ProcessoDTO);
        Task Update(ProcessoDTO ProcessoDTO);
        Task Remove(Guid id);
    }
}
