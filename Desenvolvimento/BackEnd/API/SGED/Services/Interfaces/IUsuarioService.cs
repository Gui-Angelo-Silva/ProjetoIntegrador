using SGED.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IUsuarioService
    {
        Task<IEnumerable<UsuarioDTO>> GetAll();
        Task<UsuarioDTO> GetById(int id);
        Task<IEnumerable<UsuarioDTO>> GetByEmail(string email);
        Task<UsuarioDTO> Autentication(AutenticationDTO autenticationDTO);
        Task Create(UsuarioDTO usuarioDTO);
        Task Update(UsuarioDTO usuarioDTO);
        Task Remove(int id);
    }
}
