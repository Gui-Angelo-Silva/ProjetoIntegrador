using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface ITipoProcessoService
    {
        Task<IEnumerable<TipoProcessoDTO>> GetAll();
        Task<IEnumerable<TipoProcessoDTO>> Search(string search);
        Task<TipoProcessoDTO> GetById(int id);
        Task Create(TipoProcessoDTO TipoProcessoDTO);
        Task Update(TipoProcessoDTO TipoProcessoDTO);
        Task Remove(int id);
    }
}
