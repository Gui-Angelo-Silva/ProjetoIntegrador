using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities
{
    public class ImovelService : IImovelService
	{
		private readonly IImovelRepository _imovelRepository;
		private readonly IMapper _mapper;

		public ImovelService(IImovelRepository imovelRepository, IMapper mapper)
		{
			_imovelRepository = imovelRepository;
			_mapper = mapper;
		}

		public async Task<IEnumerable<ImovelDTO>> GetAll()
		{
			var imovel = await _imovelRepository.GetAll();
			return _mapper.Map<IEnumerable<ImovelDTO>>(imovel);	
		}

		public async Task<ImovelDTO> GetById(int id)
		{
			var imovel = await _imovelRepository.GetById(id);
			return _mapper.Map<ImovelDTO>(imovel);
		}

		public async Task Create(ImovelDTO imovelDTO)
		{
			var imovel = _mapper.Map<Imovel>(imovelDTO);
			await _imovelRepository.Create(imovel);
			imovelDTO.Id = imovel.Id;
		}

		public async Task Update(ImovelDTO imovelDTO)
		{
			var imovel = _mapper.Map<Imovel>(imovelDTO);
			await _imovelRepository.Update(imovel);
		}

		public async Task Remove(int id)
		{
			await _imovelRepository.Delete(id);
		}
	}
}
