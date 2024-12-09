using AutoMapper;
using SGED.Objects.DTOs.Searchs;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities
{
    public class LogradouroService : ILogradouroService
	{
		private readonly ILogradouroRepository _logradouroRepository;
		private readonly IMapper _mapper;

		public LogradouroService(ILogradouroRepository logradouroRepository, IMapper mapper)
		{
			_logradouroRepository = logradouroRepository;
			_mapper = mapper;
		}

		public async Task<IEnumerable<LogradouroDTO>> GetAll()
		{
			var logradouro = await _logradouroRepository.GetAll();
			return _mapper.Map<IEnumerable<LogradouroDTO>>(logradouro);
		}

        public async Task<IEnumerable<LogradouroDTO>> GetByNeighbourhood(int idBairro)
        {
            var logradouro = await _logradouroRepository.GetByNeighbourhood(idBairro);
            return _mapper.Map<IEnumerable<LogradouroDTO>>(logradouro);
        }

        public async Task<LogradouroDTO> GetById(int id)
		{
			var logradouro = await _logradouroRepository.GetById(id);
			return _mapper.Map<LogradouroDTO>(logradouro);
		}

        public async Task<LogradouroSearch> GetByCEP(string cep)
        {
            var logradouro = await _logradouroRepository.GetByCEP(cep);

            if (logradouro == null)  return _mapper.Map<LogradouroSearch>(logradouro);

            var logradouroSearch = _mapper.Map<LogradouroSearch>(logradouro);
            logradouroSearch.Bairro = _mapper.Map<BairroSearch>(logradouro.Bairro);
            logradouroSearch.Bairro.Cidade = _mapper.Map<CidadeSearch>(logradouro.Bairro.Cidade);
            logradouroSearch.Bairro.Cidade.Estado = _mapper.Map<EstadoSearch>(logradouro.Bairro.Cidade.Estado);

            return logradouroSearch;
        }

        public async Task Create(LogradouroDTO logradouroDTO)
		{
			var logradouro = _mapper.Map<LogradouroModel>(logradouroDTO);
			await _logradouroRepository.Create(logradouro);
			logradouroDTO.Id = logradouro.Id;
		}

		public async Task Update(LogradouroDTO logradouroDTO)
		{
			var logradouro = _mapper.Map<LogradouroModel>(logradouroDTO);
			await _logradouroRepository.Update(logradouro);
		}

		public async Task Remove(int id)
		{
			await _logradouroRepository.Delete(id);
		}
	}
}
