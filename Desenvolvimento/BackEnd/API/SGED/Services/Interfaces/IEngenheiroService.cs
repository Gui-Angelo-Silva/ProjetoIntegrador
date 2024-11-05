using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface IEngenheiroService
    {
        Task<IEnumerable<EngenheiroDTO>> GetAll();
        Task<IEnumerable<EngenheiroDTO>> Search(string search);
        Task<EngenheiroDTO> GetById(int id);
        Task Create(EngenheiroDTO engenheiroDTO);
        Task Update(EngenheiroDTO engenheiroDTO);
        Task Remove(int id);
    }
}
