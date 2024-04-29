using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface ITipoLogradouroService
	{
		Task<IEnumerable<TipoLogradouroDTO>> GetAll();
		Task<TipoLogradouroDTO> GetById(int id);
		Task Create(TipoLogradouroDTO tipoLogradouroDTO);
		Task Update(TipoLogradouroDTO tipoLogradouroDTO);
		Task Remove(int id);
	}
}
