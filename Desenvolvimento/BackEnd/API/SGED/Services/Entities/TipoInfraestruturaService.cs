using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class TipoInfraestruturaService : ITipoInfraestruturaService
{

	private readonly ITipoInfraestruturaRepository _tipoinfraestruturaRepository;
	private readonly IMapper _mapper;

	public TipoInfraestruturaService(ITipoInfraestruturaRepository tipoinfraestruturaRepository, IMapper mapper)
	{
		_tipoinfraestruturaRepository = tipoinfraestruturaRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<TipoInfraestruturaDTO>> GetAll()
	{
		var tipoinfraestruturas = await _tipoinfraestruturaRepository.GetAll();
		return _mapper.Map<IEnumerable<TipoInfraestruturaDTO>>(tipoinfraestruturas);
	}

	public async Task<TipoInfraestruturaDTO> GetById(int id)
	{
		var tipoinfraestrutura = await _tipoinfraestruturaRepository.GetById(id);
		return _mapper.Map<TipoInfraestruturaDTO>(tipoinfraestrutura);
	}

    public async Task Create(TipoInfraestruturaDTO tipoinfraestruturaDTO)
	{
		var tipoinfraestrutura = _mapper.Map<TipoInfraestrutura>(tipoinfraestruturaDTO);
		await _tipoinfraestruturaRepository.Create(tipoinfraestrutura);
		tipoinfraestruturaDTO.Id = tipoinfraestrutura.Id;
	}

	public async Task Update(TipoInfraestruturaDTO tipoinfraestruturaDTO)
	{
		var tipoinfraestrutura = _mapper.Map<TipoInfraestrutura>(tipoinfraestruturaDTO);
		await _tipoinfraestruturaRepository.Update(tipoinfraestrutura);
	}

	public async Task Remove(int id)
	{
		await _tipoinfraestruturaRepository.Delete(id);
	}
}
