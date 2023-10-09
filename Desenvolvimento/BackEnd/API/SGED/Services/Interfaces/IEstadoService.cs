using SGED.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IEstadoService
    {
        Task<IEnumerable<EstadoDTO>> GetAll();
        Task<EstadoDTO> GetById(int id);
        Task Create(EstadoDTO estadoDTO);
        Task Update(EstadoDTO estadoDTO);
        Task Remove(int id);
    }
}
