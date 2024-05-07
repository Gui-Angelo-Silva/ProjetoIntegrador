using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IImovelService
	{
		Task<IEnumerable<ImovelDTO>> GetAll();
		Task<ImovelDTO> GetById(int id);
		Task Create(ImovelDTO imovelDTO);
		Task Update(ImovelDTO imovelDTO);
		Task Remove(int id);
	}
}
