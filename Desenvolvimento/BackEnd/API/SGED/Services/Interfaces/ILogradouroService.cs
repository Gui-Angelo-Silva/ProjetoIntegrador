using SGED.Objects.DTO.Entities;
using SGED.Objects.DTO.Searchs;

namespace SGED.Services.Interfaces
{
    public interface ILogradouroService
	{
		Task<IEnumerable<LogradouroDTO>> GetAll();
        Task<IEnumerable<LogradouroDTO>> GetByNeighbourhood(int idBairro);
        Task<LogradouroDTO> GetById(int id);
        Task<LogradouroSearch> GetByCEP(string cep);
        Task Create(LogradouroDTO logradouroDTO);
		Task Update(LogradouroDTO logradouroDTO);
		Task Remove(int id);
	}
}
