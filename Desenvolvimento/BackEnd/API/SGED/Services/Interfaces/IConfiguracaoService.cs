using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
	public interface IConfiguracaoService
	{
		Task<IEnumerable<ConfiguracaoDTO>> GetAll();
		Task<ConfiguracaoDTO> GetById(int id);	
		Task<ConfiguracaoDTO> Activate(int id);
		Task<ConfiguracaoDTO> Disable(int id);
	}
}
