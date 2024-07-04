using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
	public interface IConfiguracaoRepository
	{
		Task<IEnumerable<Configuracao>> GetAll();
		Task<Configuracao> Active(int id);
		Task<Configuracao> Disable(int id);
	}
}