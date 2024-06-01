using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface ITipoProcessoService
    {
        Task<IEnumerable<TipoProcessoDTO>> GetAll();
        Task<TipoProcessoDTO> GetById(int id);
        Task Create(TipoProcessoDTO TipoProcessoDTO);
        Task Update(TipoProcessoDTO TipoProcessoDTO);
        Task Remove(int id);
    }
}
