using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<UsuarioDTO>> GetAll();
        Task<UsuarioDTO> GetById(int id);
        Task<IEnumerable<string>> GetByEmail(int id, string email);
        Task<UsuarioDTO> Login(LoginDTO loginDTO);
        Task Create(UsuarioDTO usuarioDTO);
        Task Update(UsuarioDTO usuarioDTO);
        Task Remove(int id);
    }
}
