using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface ITopografiaService
    {
        Task<IEnumerable<TopografiaDTO>> GetAll();
        Task<TopografiaDTO> GetById(int id);
        Task Create(TopografiaDTO topografiaDTO);
        Task Update(TopografiaDTO topografiaDTO);
        Task Remove(int id);
    }
}
