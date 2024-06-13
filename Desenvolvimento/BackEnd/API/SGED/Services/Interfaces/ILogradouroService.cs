using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface ILogradouroService
	{
		Task<IEnumerable<LogradouroDTO>> GetAll();
        Task<IEnumerable<LogradouroDTO>> GetByNeighbourhood(int idBairro);
        Task<LogradouroDTO> GetById(int id);
		Task Create(LogradouroDTO logradouroDTO);
		Task Update(LogradouroDTO logradouroDTO);
		Task Remove(int id);
	}
}
