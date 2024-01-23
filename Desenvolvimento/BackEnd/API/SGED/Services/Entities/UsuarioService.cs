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

        /*IEnumerable<UsuarioDTO> usuariosDTO = _mapper.Map<IEnumerable<UsuarioDTO>>(usuarios);

        foreach (var usuarioDTO in usuariosDTO)
        {
            var usuario = usuarios.FirstOrDefault(u => u.Id == usuarioDTO.Id);
            if (usuario != null)
            {
                TipoUsuarioDTO tipoUsuarioDTO = _mapper.Map<TipoUsuarioDTO>(usuario.TipoUsuario);
                usuarioDTO.TipoUsuarioDTO = tipoUsuarioDTO;
            }
        }

        return usuariosDTO;*/
    }

    public async Task<UsuarioDTO> GetById(int id)
    {
        var usuario = await _usuarioRepository.GetById(id);

        UsuarioDTO usuarioDTO = _mapper.Map<UsuarioDTO>(usuario);
        usuarioDTO.TipoUsuarioDTO = _mapper.Map<TipoUsuarioDTO>(usuario.TipoUsuario);

        return usuarioDTO;
    }

    public async Task<IEnumerable<string>> GetByEmail(int id, string email)
    {
        var usuarios = await _usuarioRepository.GetByEmail(id, email);
        return usuarios.Select(u => u.EmailPessoa).ToList();
    }

    public async Task<UsuarioDTO> Autentication(AutenticationDTO autenticationDTO)
    {
        var autentication = _mapper.Map<Autentication>(autenticationDTO);
        var usuario = await _usuarioRepository.Autentication(autentication);

        UsuarioDTO usuarioDTO = _mapper.Map<UsuarioDTO>(usuario);
        if (usuarioDTO != null) { usuarioDTO.TipoUsuarioDTO = _mapper.Map<TipoUsuarioDTO>(usuario.TipoUsuario); }

        return usuarioDTO;
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
