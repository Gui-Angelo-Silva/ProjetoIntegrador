using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities
{
    public class TipoLogradouroService : ITipoLogradouroService
	{
		private readonly ITipoLogradouroRepository _tipologradourorepository;
		private readonly IMapper _mapper;

		public TipoLogradouroService(ITipoLogradouroRepository tipologradourorepository, IMapper mapper)
		{
			_tipologradourorepository = tipologradourorepository;
			_mapper = mapper;
		}

		public async Task<IEnumerable<TipoLogradouroDTO>> GetAll()
		{
			var tipologradouro = await _tipologradourorepository.GetAll();
			return _mapper.Map<IEnumerable<TipoLogradouroDTO>>(tipologradouro);
		}

		public async Task<TipoLogradouroDTO> GetById(int id)
		{
			var tipologradouro = await _tipologradourorepository.GetById(id);
			return _mapper.Map<TipoLogradouroDTO>(tipologradouro);
		}

		public async Task Create(TipoLogradouroDTO tipoLogradouroDTO)
		{
			var tipologradouro = _mapper.Map<TipoLogradouro>(tipoLogradouroDTO);
			await _tipologradourorepository.Create(tipologradouro);
			tipoLogradouroDTO.Id = tipologradouro.Id;
		}

		public async Task Update(TipoLogradouroDTO tipoLogradouroDTO)
		{
			var tipologradouro = _mapper.Map<TipoLogradouro>(tipoLogradouroDTO);
			await _tipologradourorepository.Update(tipologradouro); ;
		}

		public async Task Remove(int id)
		{
			await _tipologradourorepository.Delete(id);
		}
	}
}
