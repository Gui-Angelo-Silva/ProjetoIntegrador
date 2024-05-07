using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IEstadoService
    {
        Task<IEnumerable<EstadoDTO>> GetAll();
        Task<EstadoDTO> GetById(int id);
        Task<IEnumerable<EstadoDTO>> GetByName(string nome);
        Task Create(EstadoDTO estadoDTO);
        Task Update(EstadoDTO estadoDTO);
        Task Remove(int id);
    }
}
