using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface ICondicaoSoloService
    {
        Task<IEnumerable<CondicaoSoloDTO>> GetAll();
        Task<CondicaoSoloDTO> GetById(int id);
        Task<IEnumerable<CondicaoSoloDTO>> GetByCondiction(string condicaosolo);
        Task Create(CondicaoSoloDTO condicaosoloDTO);
        Task Update(CondicaoSoloDTO condicaosoloDTO);
        Task Remove(int id);
    }
}
