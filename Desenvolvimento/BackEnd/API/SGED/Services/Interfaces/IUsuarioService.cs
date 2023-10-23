using SGED.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<UsuarioDTO>> GetAll();
        Task<UsuarioDTO> GetById(int id);
        Task Create(UsuarioDTO pessoaDTO);
        Task Update(UsuarioDTO pessoaDTO);
        Task Remove(int id);
    }
}
