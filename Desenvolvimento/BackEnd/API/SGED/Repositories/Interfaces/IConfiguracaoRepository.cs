using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
	public interface IConfiguracaoRepository
	{
		Task<IEnumerable<Configuracao>> GetAll();
		Task<Configuracao> GetById(int id);
		Task<Configuracao> Activate(int id);
		Task<Configuracao> Disable(int id);
	}
}