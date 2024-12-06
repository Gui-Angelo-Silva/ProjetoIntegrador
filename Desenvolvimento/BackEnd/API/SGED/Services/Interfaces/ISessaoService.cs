using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface ISessaoService
    {
        Task<IEnumerable<SessaoDTO>> GetAll();
        Task<IEnumerable<SessaoDTO>> GetOpenSessions();
        Task<IEnumerable<SessaoDTO>> GetCloseSessions();
        Task<SessaoDTO> GetLastSession(int id);
        Task<SessaoDTO> GetById(Guid id);
        Task<SessaoDTO> GetByToken(string token);
        Task<UsuarioDTO> GetUser(string token);
        Task Create(SessaoDTO sessaoDTO);
        Task Update(SessaoDTO sessaoDTO);
        Task Remove(Guid id);

        Task<IEnumerable<UsuarioDTO>> GetOnlineUsers();
        Task<IEnumerable<UsuarioDTO>> GetOfflineUsers();
        Task<IEnumerable<SessaoDTO>> GetOpenSessionByUser(int id);
    }
}
