using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface ITipoUsoService
    {
        Task<IEnumerable<TipoUsoDTO>> GetAll();
        Task<TipoUsoDTO> GetById(int id);
        Task Create(TipoUsoDTO tipousoDTO);
        Task Update(TipoUsoDTO tipousoDTO);
        Task Remove(int id);
    }
}
