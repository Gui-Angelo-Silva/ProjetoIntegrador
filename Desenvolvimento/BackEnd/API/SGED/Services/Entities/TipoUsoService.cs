using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class TipoUsoService : ITipoUsoService
{

	private readonly ITipoUsoRepository _tipousoRepository;
	private readonly IMapper _mapper;

	public TipoUsoService(ITipoUsoRepository tipousoRepository, IMapper mapper)
	{
		_tipousoRepository = tipousoRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<TipoUsoDTO>> GetAll()
	{
		var tipousos = await _tipousoRepository.GetAll();
		return _mapper.Map<IEnumerable<TipoUsoDTO>>(tipousos);
	}

	public async Task<TipoUsoDTO> GetById(int id)
	{
		var tipouso = await _tipousoRepository.GetById(id);
		return _mapper.Map<TipoUsoDTO>(tipouso);
	}

    public async Task Create(TipoUsoDTO tipousoDTO)
	{
		var tipouso = _mapper.Map<TipoUso>(tipousoDTO);
		await _tipousoRepository.Create(tipouso);
		tipousoDTO.Id = tipouso.Id;
	}

	public async Task Update(TipoUsoDTO tipousoDTO)
	{
		var tipouso = _mapper.Map<TipoUso>(tipousoDTO);
		await _tipousoRepository.Update(tipouso);
	}

	public async Task Remove(int id)
	{
		await _tipousoRepository.Delete(id);
	}
}
