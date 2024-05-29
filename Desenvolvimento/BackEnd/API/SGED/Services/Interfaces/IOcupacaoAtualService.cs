using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IOcupacaoAtualService
    {
        Task<IEnumerable<OcupacaoAtualDTO>> GetAll();
        Task<OcupacaoAtualDTO> GetById(int id);
        Task Create(OcupacaoAtualDTO ocupacaoatualDTO);
        Task Update(OcupacaoAtualDTO ocupacaoatualDTO);
        Task Remove(int id);
    }
}
