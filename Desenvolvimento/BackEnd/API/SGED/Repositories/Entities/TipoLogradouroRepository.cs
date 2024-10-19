using Microsoft.EntityFrameworkCore;
using SGED.Context;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;

namespace SGED.Repositories.Entities
{
    public class TipoLogradouroRepository : ITipoLogradouroRepository
	{
		private readonly AppDBContext _dbContext;

		public TipoLogradouroRepository(AppDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<IEnumerable<TipoLogradouroModel>> GetAll()
		{
			return await _dbContext.TipoLogradouro.AsNoTracking().ToListAsync();
		}
		public async Task<TipoLogradouroModel> GetById(int id)
		{
			return await _dbContext.TipoLogradouro.AsNoTracking().FirstOrDefaultAsync(tl => tl.Id == id);
		}

		public async Task<TipoLogradouroModel> Create(TipoLogradouroModel tipoLogradouro)
		{
			_dbContext.TipoLogradouro.Add(tipoLogradouro);
			await _dbContext.SaveChangesAsync();
			return tipoLogradouro;
		}
		public async Task<TipoLogradouroModel> Update(TipoLogradouroModel tipoLogradouro)
		{
			_dbContext.Entry(tipoLogradouro).State = EntityState.Modified;
			await _dbContext.SaveChangesAsync();
			return tipoLogradouro;
		}

		public async Task<TipoLogradouroModel> Delete(int id)
		{
			var tipologradouro = await GetById(id);
			_dbContext.TipoLogradouro.Remove(tipologradouro);
			await _dbContext.SaveChangesAsync();
			return tipologradouro;
		}
	}
}
