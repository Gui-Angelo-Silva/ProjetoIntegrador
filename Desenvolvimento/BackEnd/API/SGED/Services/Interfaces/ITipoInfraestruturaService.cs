using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface ITipoInfraestruturaService
    {
        Task<IEnumerable<TipoInfraestruturaDTO>> GetAll();
        Task<TipoInfraestruturaDTO> GetById(int id);
        Task Create(TipoInfraestruturaDTO tipoinfraestruturaDTO);
        Task Update(TipoInfraestruturaDTO tipoinfraestruturaDTO);
        Task Remove(int id);
    }
}
