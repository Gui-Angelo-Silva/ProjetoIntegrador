using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface ICidadeService
    {
        Task<IEnumerable<CidadeDTO>> GetAll();
        Task<IEnumerable<CidadeDTO>> GetByState(int idEstado);
        Task<CidadeDTO> GetById(int id);
        Task Create(CidadeDTO cidadeDTO);
        Task Update(CidadeDTO cidadeDTO);
        Task Remove(int id);
    }
}
