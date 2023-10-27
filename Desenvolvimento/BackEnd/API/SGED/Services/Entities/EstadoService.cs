using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class EstadoService : IEstadoService
{

	private readonly IEstadoRepository _estadoRepository;
	private readonly IMapper _mapper;

	public EstadoService(IEstadoRepository estadoRepository, IMapper mapper)
	{
		_estadoRepository = estadoRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<EstadoDTO>> GetAll()
	{
		var estados = await _estadoRepository.GetAll();
		return _mapper.Map<IEnumerable<EstadoDTO>>(estados);
	}

	public async Task<EstadoDTO> GetById(int id)
	{
		var estado = await _estadoRepository.GetById(id);
		return _mapper.Map<EstadoDTO>(estado);
	}

    public async Task<IEnumerable<EstadoDTO>> GetByName(string nomeEstado)
    {
        var estados = await _estadoRepository.GetByName(nomeEstado);
        return _mapper.Map<IEnumerable<EstadoDTO>>(estados);
    }

    public async Task Create(EstadoDTO estadoDTO)
	{
		var estado = _mapper.Map<Estado>(estadoDTO);
		await _estadoRepository.Create(estado);
		estadoDTO.Id = estado.Id;
	}

	public async Task Update(EstadoDTO estadoDTO)
	{
		var estado = _mapper.Map<Estado>(estadoDTO);
		await _estadoRepository.Update(estado);
	}

	public async Task Remove(int id)
	{
		await _estadoRepository.Delete(id);
	}
}
