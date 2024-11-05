using SGED.Objects.DTOs.Entities;
using SGED.Objects.Server;

namespace SGED.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<UsuarioDTO>> GetAll();
        Task<IEnumerable<UsuarioDTO>> Search(string search);
        Task<IEnumerable<string>> GetByEmail(int id, string email);
        Task<UsuarioDTO> GetById(int id);
        Task<UsuarioDTO> Login(Login login);
        Task Create(UsuarioDTO usuarioDTO);
        Task Update(UsuarioDTO usuarioDTO);
        Task Remove(int id);
    }
}
