using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities
{
	public class ConfiguracaoService : IConfiguracaoService
	{
		private readonly IConfiguracaoRepository _configuracaoRepository;
		private readonly IMapper _mapper;

		public ConfiguracaoService(IConfiguracaoRepository configuracaoRepository, IMapper mapper)
		{
			_configuracaoRepository = configuracaoRepository;
			_mapper = mapper;
		}

		public async Task<IEnumerable<ConfiguracaoDTO>> GetAll()
		{
			var configuracoes = await _configuracaoRepository.GetAll();
			return _mapper.Map<IEnumerable<ConfiguracaoDTO>>(configuracoes);
		}

		public async Task<ConfiguracaoDTO> Activate(int id)
		{
			var configuracoes = await _configuracaoRepository.Activate(id);
			return _mapper.Map<ConfiguracaoDTO>(configuracoes);
		}

		public async Task<ConfiguracaoDTO> Disable(int id)
		{
			var configuracao = await _configuracaoRepository.Disable(id);
			return _mapper.Map<ConfiguracaoDTO>(configuracao);
		}
	}
}
