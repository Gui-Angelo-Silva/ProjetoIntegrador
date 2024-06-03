using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class InfraestruturaService : IInfraestruturaService
{

	private readonly IInfraestruturaRepository _infraestruturaRepository;
	private readonly IMapper _mapper;

	public InfraestruturaService(IInfraestruturaRepository infraestruturaRepository, IMapper mapper)
	{
		_infraestruturaRepository = infraestruturaRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<InfraestruturaDTO>> GetAll()
	{
		var infraestruturas = await _infraestruturaRepository.GetAll();
		return _mapper.Map<IEnumerable<InfraestruturaDTO>>(infraestruturas);
	}

    public async Task<IEnumerable<InfraestruturaDTO>> GetByTypeInfrastructure(int idTipoInfraestrutura)
    {
        var infraestruturas = await _infraestruturaRepository.GetByTypeInfrastructure(idTipoInfraestrutura);
        return _mapper.Map<IEnumerable<InfraestruturaDTO>>(infraestruturas);
    }

    public async Task<InfraestruturaDTO> GetById(int id)
	{
		var infraestrutura = await _infraestruturaRepository.GetById(id);
		return _mapper.Map<InfraestruturaDTO>(infraestrutura);
	}

    public async Task Create(InfraestruturaDTO infraestruturaDTO)
	{
		var infraestrutura = _mapper.Map<Infraestrutura>(infraestruturaDTO);
		await _infraestruturaRepository.Create(infraestrutura);
		infraestruturaDTO.Id = infraestrutura.Id;
	}

	public async Task Update(InfraestruturaDTO infraestruturaDTO)
	{
		var infraestrutura = _mapper.Map<Infraestrutura>(infraestruturaDTO);
		await _infraestruturaRepository.Update(infraestrutura);
	}

	public async Task Remove(int id)
	{
		await _infraestruturaRepository.Delete(id);
	}
}
