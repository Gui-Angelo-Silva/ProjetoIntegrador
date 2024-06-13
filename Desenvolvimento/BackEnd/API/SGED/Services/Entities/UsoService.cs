using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class UsoService : IUsoService
{

	private readonly IUsoRepository _usoRepository;
	private readonly IMapper _mapper;

	public UsoService(IUsoRepository usoRepository, IMapper mapper)
	{
		_usoRepository = usoRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<UsoDTO>> GetAll()
	{
		var usos = await _usoRepository.GetAll();
		return _mapper.Map<IEnumerable<UsoDTO>>(usos);
	}

	public async Task<UsoDTO> GetById(int id)
	{
		var uso = await _usoRepository.GetById(id);
		return _mapper.Map<UsoDTO>(uso);
	}

    public async Task Create(UsoDTO usoDTO)
	{
		var uso = _mapper.Map<Uso>(usoDTO);
		await _usoRepository.Create(uso);
		usoDTO.Id = uso.Id;
	}

	public async Task Update(UsoDTO usoDTO)
	{
		var uso = _mapper.Map<Uso>(usoDTO);
		await _usoRepository.Update(uso);
	}

	public async Task Remove(int id)
	{
		await _usoRepository.Delete(id);
	}
}
