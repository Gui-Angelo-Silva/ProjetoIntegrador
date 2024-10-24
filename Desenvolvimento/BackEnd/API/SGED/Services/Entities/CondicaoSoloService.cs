using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities
{
    public class CondicaoSoloService : ICondicaoSoloService
    {
        private readonly ICondicaoSoloRepository _condicaosoloRepository;
        private readonly IMapper _mapper;

        public CondicaoSoloService(ICondicaoSoloRepository condicaosoloRepository, IMapper mapper)
        {
            _condicaosoloRepository = condicaosoloRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CondicaoSoloDTO>> GetAll()
        {
            var condicaosolo = await _condicaosoloRepository.GetAll();
            return _mapper.Map<IEnumerable<CondicaoSoloDTO>>(condicaosolo); 
        }

        public async Task<CondicaoSoloDTO> GetById(int id)
        {
            var condicaosolo = await _condicaosoloRepository.GetById(id);
            return _mapper.Map<CondicaoSoloDTO>(condicaosolo);  
        }

        public async Task<IEnumerable<CondicaoSoloDTO>> GetByCondiction(string condicaosolo)
        {
            var conndicaosolo = await _condicaosoloRepository.GetByCondiction(condicaosolo);
            return _mapper.Map<IEnumerable<CondicaoSoloDTO>>(condicaosolo);
        }

        public async Task Create(CondicaoSoloDTO condicaosoloDTO)
        {
            var condicaosolo = _mapper.Map<CondicaoSolo>(condicaosoloDTO);
            await _condicaosoloRepository.Create(condicaosolo);
            condicaosoloDTO.Id = condicaosolo.Id;
        }

        public Task Update(CondicaoSoloDTO condicaosoloDTO)
        {
            throw new NotImplementedException();
        }

        public Task Remove(int id)
        {
            throw new NotImplementedException();
        }
    }
}
