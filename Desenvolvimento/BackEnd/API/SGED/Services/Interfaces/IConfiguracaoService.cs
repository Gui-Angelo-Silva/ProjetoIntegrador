using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
	public interface IConfiguracaoService
	{
		Task<IEnumerable<ConfiguracaoDTO>> GetAll();
		Task<ConfiguracaoDTO> Activate(int id);
		Task<ConfiguracaoDTO> Disable(int id);
	}
}
