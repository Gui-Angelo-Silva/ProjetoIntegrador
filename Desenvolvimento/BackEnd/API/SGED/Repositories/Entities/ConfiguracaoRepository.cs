using Microsoft.EntityFrameworkCore;
using SGED.Context;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;

namespace SGED.Repositories.Entities
{
	public class ConfiguracaoRepository : IConfiguracaoRepository
	{
		private readonly AppDBContext _dbContext;

		public ConfiguracaoRepository(AppDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<IEnumerable<Configuracao>> GetAll()
		{
			return await _dbContext.Set<Configuracao>().ToListAsync();
		}

		public async Task<Configuracao> Activate(int id)
		{
			var config = await _dbContext.Set<Configuracao>().FindAsync(id);
            if (config != null)
            {
				config.Valor = true;
				await _dbContext.SaveChangesAsync();
            }
			return config;
		}

		public async Task<Configuracao> Disable(int id)
		{
			var config = await _dbContext.Set<Configuracao>().FindAsync(id);
			if (config != null)
			{
				config.Valor = false;
				await _dbContext.SaveChangesAsync();
			}
			return config;
		}
	}
}
