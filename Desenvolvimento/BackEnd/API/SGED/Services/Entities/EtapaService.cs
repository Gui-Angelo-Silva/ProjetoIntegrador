using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities
{
    public class EtapaService : IEtapaService
	{
		private readonly IEtapaRepository _etaparepository;
		private readonly IMapper _mapper;

		public EtapaService(IEtapaRepository etaparepository, IMapper mapper)
		{
			_etaparepository = etaparepository;
			_mapper = mapper;
		}

		public async Task<IEnumerable<EtapaDTO>> GetAll()
		{
			var etapa = await _etaparepository.GetAll();
			return _mapper.Map<IEnumerable<EtapaDTO>>(etapa);
		}

		public async Task<EtapaDTO> GetById(int id)
		{
			var etapa = await _etaparepository.GetById(id);
			return _mapper.Map<EtapaDTO>(etapa);
		}

		public async Task Create(EtapaDTO etapaDTO)
		{
			var etapa = _mapper.Map<Etapa>(etapaDTO);
			await _etaparepository.Create(etapa);
			etapaDTO.Id = etapa.Id;
		}

		public async Task Update(EtapaDTO etapaDTO)
		{
			var etapa = _mapper.Map<Etapa>(etapaDTO);
			await _etaparepository.Update(etapa);
		}

		public async Task Remove(int id)
		{
			await _etaparepository.Delete(id);
		}


		public async Task<IEnumerable<EtapaDTO>> GetStagesRelatedToTypeProcess(int idTipoProcesso)
		{
			var etapa = await _etaparepository.GetStagesRelatedToTypeProcess(idTipoProcesso);
			return _mapper.Map<IEnumerable<EtapaDTO>>(etapa);
		}

	}
}
