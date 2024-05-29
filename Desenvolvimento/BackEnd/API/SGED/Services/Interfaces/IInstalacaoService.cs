using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IInstalacaoService
    {
        Task<IEnumerable<InstalacaoDTO>> GetAll();
        Task<InstalacaoDTO> GetById(int id);
        Task Create(InstalacaoDTO instalacaoDTO);
        Task Update(InstalacaoDTO instalacaoDTO);
        Task Remove(int id);
    }
}
