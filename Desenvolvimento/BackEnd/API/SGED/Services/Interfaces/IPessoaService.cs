using SGED.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IPessoaService
    {
        Task<IEnumerable<PessoaDTO>> GetAll();
        Task<PessoaDTO> GetById(int id);
        Task Create(PessoaDTO pessoaDTO);
        Task Update(PessoaDTO pessoaDTO);
        Task Remove(int id);
    }
}
