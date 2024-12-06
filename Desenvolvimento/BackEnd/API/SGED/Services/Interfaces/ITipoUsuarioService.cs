using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface ITipoUsuarioService
	{
		Task<IEnumerable<TipoUsuarioDTO>> GetAll();
		Task<TipoUsuarioDTO> GetById(int id);
		Task Create(TipoUsuarioDTO tipoUsuarioDTO);
		Task Update(TipoUsuarioDTO tipousuarioDTO);
		Task Remove(int id);
	}
}
