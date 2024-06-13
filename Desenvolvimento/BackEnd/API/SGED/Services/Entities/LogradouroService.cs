using AutoMapper;
using SGED.Objects.DTO.Entities;
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

		public async Task Create(LogradouroDTO logradouroDTO)
		{
			var logradouro = _mapper.Map<Logradouro>(logradouroDTO);
			await _logradouroRepository.Create(logradouro);
			logradouroDTO.Id = logradouro.Id;
		}

		public async Task Update(LogradouroDTO logradouroDTO)
		{
			var logradouro = _mapper.Map<Logradouro>(logradouroDTO);
			await _logradouroRepository.Update(logradouro);
		}

		public async Task Remove(int id)
		{
			await _logradouroRepository.Delete(id);
		}
	}
}
