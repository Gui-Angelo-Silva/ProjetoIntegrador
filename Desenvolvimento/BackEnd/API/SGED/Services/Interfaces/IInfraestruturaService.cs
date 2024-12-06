using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface IInfraestruturaService
    {
        Task<IEnumerable<InfraestruturaDTO>> GetAll();
        Task<IEnumerable<InfraestruturaDTO>> GetByTypeInfrastructure(int idTipoInfraestrutura);
        Task<InfraestruturaDTO> GetById(int id);
        Task Create(InfraestruturaDTO infraestruturaDTO);
        Task Update(InfraestruturaDTO infraestruturaDTO);
        Task Remove(int id);
    }
}
