using SGED.Objects.DTOs.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Services.Interfaces
{
    public interface IImovelService
	{
		Task<IEnumerable<ImovelDTO>> GetAll();
		Task<ImovelDTO> GetById(int id);
		Task<ImovelDTO> GetByProperty(string propertyName, string data);
        Task Create(ImovelDTO imovelDTO);
		Task Update(ImovelDTO imovelDTO);
		Task Remove(int id);
	}
}
