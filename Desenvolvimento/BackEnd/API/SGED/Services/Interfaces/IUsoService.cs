using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IUsoService
    {
        Task<IEnumerable<UsoDTO>> GetAll();
        Task<UsoDTO> GetById(int id);
        Task Create(UsoDTO usoDTO);
        Task Update(UsoDTO usoDTO);
        Task Remove(int id);
    }
}
