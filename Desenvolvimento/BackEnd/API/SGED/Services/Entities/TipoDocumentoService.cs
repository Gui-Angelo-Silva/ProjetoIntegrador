using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities
{
    public class TipoDocumentoService : ITipoDocumentoService
	{
		private readonly ITipoDocumentoRepository _tipoDocumentoRepository;
		private readonly IMapper _mapper;

		public TipoDocumentoService(ITipoDocumentoRepository tipoDocumentoRepository, IMapper mapper)
		{
			_tipoDocumentoRepository = tipoDocumentoRepository;
			_mapper = mapper;
		}

		public async Task<IEnumerable<TipoDocumentoDTO>> GetAll()
		{
			var tipoDocumentos = await _tipoDocumentoRepository.GetAll();
			return _mapper.Map<IEnumerable<TipoDocumentoDTO>>(tipoDocumentos);
		}

		public async Task<TipoDocumentoDTO> GetById(int id)
		{
			var tipoDocumento = await _tipoDocumentoRepository.GetById(id);
			return _mapper.Map<TipoDocumentoDTO>(tipoDocumento);
		}

		public async Task Create(TipoDocumentoDTO TipoDocumentoDTO)
		{
			var tipoDocumento = _mapper.Map<TipoDocumento>(TipoDocumentoDTO);
			await _tipoDocumentoRepository.Create(tipoDocumento);
			TipoDocumentoDTO.Id = tipoDocumento.Id;
		}

		public async Task Update(TipoDocumentoDTO TipoDocumentoDTO)
		{
			var tipoDocumneto = _mapper.Map<TipoDocumento>(TipoDocumentoDTO);
			await _tipoDocumentoRepository.Update(tipoDocumneto);
		}

		public async Task Remove(int id)
		{
			await _tipoDocumentoRepository.Delete(id);
		}
	}
}
