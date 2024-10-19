using SGED.Objects.DTOs.Entities;
using SGED.Objects.Server;

namespace SGED.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<UsuarioDTO>> GetAll();
        Task<UsuarioDTO> GetById(int id);
        Task<IEnumerable<string>> GetByEmail(int id, string email);
        Task<UsuarioDTO> Login(Login login);
        Task Create(UsuarioDTO usuarioDTO);
        Task Update(UsuarioDTO usuarioDTO);
        Task Remove(int id);
    }
}
