using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
	public interface IConfiguracaoRepository
	{
		Task<IEnumerable<ConfiguracaoModel>> GetAll();
		Task<ConfiguracaoModel> GetById(int id);
		Task<ConfiguracaoModel> Activate(int id);
		Task<ConfiguracaoModel> Disable(int id);
	}
}