using SGED.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface ITipoBairroService
    {
        Task<IEnumerable<TipoBairroDTO>> GetAll();
        Task<TipoBairroDTO> GetById(int id);
        Task Create(TipoBairroDTO TipoBairroDTO);
        Task Update(TipoBairroDTO TipoBairroDTO);
        Task Remove(int id);
    }
}
