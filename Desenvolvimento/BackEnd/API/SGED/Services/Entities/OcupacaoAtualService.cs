using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class OcupacaoAtualService : IOcupacaoAtualService
{

	private readonly IOcupacaoAtualRepository _ocupacaoatualRepository;
	private readonly IMapper _mapper;

	public OcupacaoAtualService(IOcupacaoAtualRepository ocupacaoatualRepository, IMapper mapper)
	{
		_ocupacaoatualRepository = ocupacaoatualRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<OcupacaoAtualDTO>> GetAll()
	{
		var ocupacaoatuais = await _ocupacaoatualRepository.GetAll();
		return _mapper.Map<IEnumerable<OcupacaoAtualDTO>>(ocupacaoatuais);
	}

	public async Task<OcupacaoAtualDTO> GetById(int id)
	{
		var ocupacaoatual = await _ocupacaoatualRepository.GetById(id);
		return _mapper.Map<OcupacaoAtualDTO>(ocupacaoatual);
	}

    public async Task Create(OcupacaoAtualDTO ocupacaoatualDTO)
	{
		var ocupacaoatual = _mapper.Map<OcupacaoAtual>(ocupacaoatualDTO);
		await _ocupacaoatualRepository.Create(ocupacaoatual);
		ocupacaoatualDTO.Id = ocupacaoatual.Id;
	}

	public async Task Update(OcupacaoAtualDTO ocupacaoatualDTO)
	{
		var ocupacaoatual = _mapper.Map<OcupacaoAtual>(ocupacaoatualDTO);
		await _ocupacaoatualRepository.Update(ocupacaoatual);
	}

	public async Task Remove(int id)
	{
		await _ocupacaoatualRepository.Delete(id);
	}
}
