using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class UsuarioService : IUsuarioService
{

    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IMapper _mapper;

    public UsuarioService(IUsuarioRepository usuarioRepository, IMapper mapper)
    {
        _usuarioRepository = usuarioRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<UsuarioDTO>> GetAll()
    {
        var usuarios = await _usuarioRepository.GetAll();
        return _mapper.Map<IEnumerable<UsuarioDTO>>(usuarios);
    }

    public async Task<UsuarioDTO> GetById(int id)
    {
        var usuario = await _usuarioRepository.GetById(id);
        return _mapper.Map<UsuarioDTO>(usuario);
    }

    public async Task<IEnumerable<string>> GetByEmail(int id, string email)
    {
        var usuarios = await _usuarioRepository.GetByEmail(id, email);
        return usuarios.Select(u => u.EmailUsuario).ToList();
    }

    public async Task<UsuarioDTO> Autentication(AutenticationDTO autenticationDTO)
    {
        var autentication = _mapper.Map<Autentication>(autenticationDTO);
        var usuario = await _usuarioRepository.Autentication(autentication);
        return _mapper.Map<UsuarioDTO>(usuario);
    }

    public async Task Create(UsuarioDTO usuarioDTO)
    {
        var usuario = _mapper.Map<Usuario>(usuarioDTO);
        await _usuarioRepository.Create(usuario);
        usuarioDTO.Id = usuario.Id;
    }

    public async Task Update(UsuarioDTO usuarioDTO)
    {
        var usuario = _mapper.Map<Usuario>(usuarioDTO);
        await _usuarioRepository.Update(usuario);
    }

    public async Task Remove(int id)
    {
        await _usuarioRepository.Delete(id);
    }
}
