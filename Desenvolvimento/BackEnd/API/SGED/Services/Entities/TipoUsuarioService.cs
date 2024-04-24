using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;

public class TipoUsuarioService : ITipoUsuarioService
{
	private readonly ITipoUsuarioRepository _tipoUsuarioRepository;
	private readonly IMapper _mapper;

	public TipoUsuarioService(ITipoUsuarioRepository tipoUsuarioRepository, IMapper mapper)
	{
		_tipoUsuarioRepository = tipoUsuarioRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<TipoUsuarioDTO>> GetAll()
	{
		var tipoUsuario = await _tipoUsuarioRepository.GetAll();
		return _mapper.Map<IEnumerable<TipoUsuarioDTO>>(tipoUsuario);
	}

	public async Task<TipoUsuarioDTO> GetById(int id)
	{
		var tipoUsuario = await _tipoUsuarioRepository.GetById(id);
		return _mapper.Map<TipoUsuarioDTO>(tipoUsuario);
	}

	public async Task Create(TipoUsuarioDTO tipoUsuarioDTO)
	{
        var tipoUsuario = _mapper.Map<TipoUsuario>(tipoUsuarioDTO);
        await _tipoUsuarioRepository.Create(tipoUsuario);
        tipoUsuarioDTO.Id = tipoUsuario.Id;
    }

	public async Task Update(TipoUsuarioDTO tipousuarioDTO)
	{
		var tipoUsuario = _mapper.Map<TipoUsuario>(tipousuarioDTO);
		await _tipoUsuarioRepository.Update(tipoUsuario);
	}

	public async Task Remove(int id)
	{
		await _tipoUsuarioRepository.Delete(id);
	}
}
