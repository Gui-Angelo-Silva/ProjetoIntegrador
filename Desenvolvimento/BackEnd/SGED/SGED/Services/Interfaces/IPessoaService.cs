using SGED.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IPessoaService
    {
        Task<IEnumerable<CidadeDTO>> GetAll();
        Task<CidadeDTO> GetById(int id);
        Task Create(CidadeDTO cidadeDTO);
        Task Update(CidadeDTO cidadeDTO);
        Task Remove(int id);
    }
}
