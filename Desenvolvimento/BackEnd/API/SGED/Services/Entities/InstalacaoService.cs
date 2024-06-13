using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class InstalacaoService : IInstalacaoService
{

	private readonly IInstalacaoRepository _instalacaoRepository;
	private readonly IMapper _mapper;

	public InstalacaoService(IInstalacaoRepository instalacaoRepository, IMapper mapper)
	{
		_instalacaoRepository = instalacaoRepository;
		_mapper = mapper;
	}

	public async Task<IEnumerable<InstalacaoDTO>> GetAll()
	{
		var instalacoes = await _instalacaoRepository.GetAll();
		return _mapper.Map<IEnumerable<InstalacaoDTO>>(instalacoes);
	}

	public async Task<InstalacaoDTO> GetById(int id)
	{
		var instalacao = await _instalacaoRepository.GetById(id);
		return _mapper.Map<InstalacaoDTO>(instalacao);
	}

    public async Task Create(InstalacaoDTO instalacaoDTO)
	{
		var instalacao = _mapper.Map<Instalacao>(instalacaoDTO);
		await _instalacaoRepository.Create(instalacao);
		instalacaoDTO.Id = instalacao.Id;
	}

	public async Task Update(InstalacaoDTO instalacaoDTO)
	{
		var instalacao = _mapper.Map<Instalacao>(instalacaoDTO);
		await _instalacaoRepository.Update(instalacao);
	}

	public async Task Remove(int id)
	{
		await _instalacaoRepository.Delete(id);
	}
}
