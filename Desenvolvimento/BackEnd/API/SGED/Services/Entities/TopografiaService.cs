using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class TopografiaService : ITopografiaService
{

	private readonly ITopografiaRepository _topografiaRepository;
	private readonly IMapper _mapper;

	public TopografiaService(ITopografiaRepository topografiaRepository, IMapper mapper)
	{
		_topografiaRepository = topografiaRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<TopografiaDTO>> GetAll()
	{
		var topografias = await _topografiaRepository.GetAll();
		return _mapper.Map<IEnumerable<TopografiaDTO>>(topografias);
	}

	public async Task<TopografiaDTO> GetById(int id)
	{
		var topografia = await _topografiaRepository.GetById(id);
		return _mapper.Map<TopografiaDTO>(topografia);
	}

    public async Task Create(TopografiaDTO topografiaDTO)
	{
		var topografia = _mapper.Map<Topografia>(topografiaDTO);
		await _topografiaRepository.Create(topografia);
		topografiaDTO.Id = topografia.Id;
	}

	public async Task Update(TopografiaDTO topografiaDTO)
	{
		var topografia = _mapper.Map<Topografia>(topografiaDTO);
		await _topografiaRepository.Update(topografia);
	}

	public async Task Remove(int id)
	{
		await _topografiaRepository.Delete(id);
	}
}
