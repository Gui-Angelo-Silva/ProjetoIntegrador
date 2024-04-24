using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IEngenheiroService
    {
        Task<IEnumerable<EngenheiroDTO>> GetAll();
        Task<EngenheiroDTO> GetById(int id);
        Task Create(EngenheiroDTO engenheiroDTO);
        Task Update(EngenheiroDTO engenheiroDTO);
        Task Remove(int id);
    }
}
