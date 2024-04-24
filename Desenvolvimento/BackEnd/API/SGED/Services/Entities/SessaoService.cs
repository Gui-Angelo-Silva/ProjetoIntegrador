using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class SessaoService : ISessaoService
{

    private readonly ISessaoRepository _sessaoRepository;
    private readonly IMapper _mapper;

    public SessaoService(ISessaoRepository sessaoRepository, IMapper mapper)
    {
        _sessaoRepository = sessaoRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SessaoDTO>> GetAll()
    {
        var sessoes = await _sessaoRepository.GetAll();
        return _mapper.Map<IEnumerable<SessaoDTO>>(sessoes);
    }

    public async Task<IEnumerable<SessaoDTO>> GetOpenSessions()
    {
        var sessoes = await _sessaoRepository.GetOpenSessions();
        return _mapper.Map<IEnumerable<SessaoDTO>>(sessoes);
    }

    public async Task<IEnumerable<SessaoDTO>> GetCloseSessions()
    {
        var sessoes = await _sessaoRepository.GetCloseSessions();
        return _mapper.Map<IEnumerable<SessaoDTO>>(sessoes);
    }

    public async Task<SessaoDTO> GetLastSession(int id)
    {
        var sessao = await _sessaoRepository.GetLastSession(id);
        return _mapper.Map<SessaoDTO>(sessao);
    }

    public async Task<SessaoDTO> GetById(int id)
    {
        /*var sessao = await _sessaoRepository.GetById(id);
        var sessaoDTO = _mapper.Map<SessaoDTO>(sessao);
        sessaoDTO.UsuarioDTO = _mapper.Map<UsuarioDTO>(sessao.Usuario);
        sessaoDTO.UsuarioDTO.TipoUsuarioDTO = _mapper.Map<TipoUsuarioDTO>(sessao.Usuario.TipoUsuario);

        return sessaoDTO;*/

        var sessao = await _sessaoRepository.GetById(id);
        return _mapper.Map<SessaoDTO>(sessao);
    }

    public async Task<SessaoDTO> GetByToken(string token)
    {
        var sessao = await _sessaoRepository.GetByToken(token);
        return _mapper.Map<SessaoDTO>(sessao);
    }

    public async Task<UsuarioDTO> GetUser(string token)
    {
        var usuario = await _sessaoRepository.GetUser(token);
        return _mapper.Map<UsuarioDTO>(usuario);
    }

    public async Task Create(SessaoDTO sessaoDTO)
    {
        var sessao = _mapper.Map<Sessao>(sessaoDTO);
        await _sessaoRepository.Create(sessao);
        sessaoDTO.Id = sessao.Id;
    }

    public async Task Update(SessaoDTO sessaoDTO)
    {
        var sessao = _mapper.Map<Sessao>(sessaoDTO);
        await _sessaoRepository.Update(sessao);
    }

    public async Task Remove(int id)
    {
        await _sessaoRepository.Delete(id);
    }


    public async Task<IEnumerable<UsuarioDTO>> GetOnlineUsers()
    {
        var usuarios = await _sessaoRepository.GetOnlineUsers();
        return _mapper.Map<IEnumerable<UsuarioDTO>>(usuarios);
    }

    public async Task<IEnumerable<UsuarioDTO>> GetOfflineUsers()
    {
        var usuarios = await _sessaoRepository.GetOfflineUsers();
        return _mapper.Map<IEnumerable<UsuarioDTO>>(usuarios);
    }

    public async Task<IEnumerable<SessaoDTO>> GetOpenSessionByUser(int id)
    {
        var sessoes = await _sessaoRepository.GetOpenSessionByUser(id);
        return _mapper.Map<IEnumerable<SessaoDTO>>(sessoes);
    }
}
