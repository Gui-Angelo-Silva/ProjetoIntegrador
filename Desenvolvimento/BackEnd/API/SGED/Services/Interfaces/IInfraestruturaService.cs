using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IInfraestruturaService
    {
        Task<IEnumerable<InfraestruturaDTO>> GetAll();
        Task<InfraestruturaDTO> GetById(int id);
        Task Create(InfraestruturaDTO infraestruturaDTO);
        Task Update(InfraestruturaDTO infraestruturaDTO);
        Task Remove(int id);
    }
}
