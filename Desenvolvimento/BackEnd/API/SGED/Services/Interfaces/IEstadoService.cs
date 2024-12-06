using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface IEstadoService
    {
        Task<IEnumerable<EstadoDTO>> GetAll();
        Task<IEnumerable<EstadoDTO>> Search(string search);
        Task<IEnumerable<EstadoDTO>> GetByName(string nome);
        Task<EstadoDTO> GetById(int id);
        Task Create(EstadoDTO estadoDTO);
        Task Update(EstadoDTO estadoDTO);
        Task Remove(int id);
    }
}
