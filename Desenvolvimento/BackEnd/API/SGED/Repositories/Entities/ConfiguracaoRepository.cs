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

		public async Task<IEnumerable<ConfiguracaoModel>> GetAll()
		{
			return await _dbContext.Set<ConfiguracaoModel>().ToListAsync();
		}

		public async Task<ConfiguracaoModel> GetById(int id)
		{
			return await _dbContext.Configuracao.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task<ConfiguracaoModel> Activate(int id)
		{
			var config = await _dbContext.Set<ConfiguracaoModel>().FindAsync(id);
            if (config != null)
            {
				config.Valor = true;
				await _dbContext.SaveChangesAsync();
            }
			return config;
		}

		public async Task<ConfiguracaoModel> Disable(int id)
		{
			var config = await _dbContext.Set<ConfiguracaoModel>().FindAsync(id);
			if (config != null)
			{
				config.Valor = false;
				await _dbContext.SaveChangesAsync();
			}
			return config;
		}
	}
}
