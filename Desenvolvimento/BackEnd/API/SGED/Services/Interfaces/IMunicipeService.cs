using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IMunicipeService
    {
        Task<IEnumerable<MunicipeDTO>> GetAll();
        Task<MunicipeDTO> GetById(int id);
        Task Create(MunicipeDTO municipeDTO);
        Task Update(MunicipeDTO municipeDTO);
        Task Remove(int id);
    }
}
