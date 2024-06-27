using Microsoft.EntityFrameworkCore;
using SGED.Context;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;

namespace SGED.Repositories.Entities
{
    public class LogradouroRepository : ILogradouroRepository
	{
		private readonly AppDBContext _dbContext;

		public LogradouroRepository(AppDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<IEnumerable<Logradouro>> GetAll()
		{
			return await _dbContext.Logradouro.AsNoTracking().ToListAsync();
		}

        public async Task<IEnumerable<Logradouro>> GetByNeighbourhood(int idBairro)
        {
            return await _dbContext.Logradouro.Where(l => l.IdBairro == idBairro).AsNoTracking().ToListAsync();
        }

        public async Task<Logradouro> GetById(int id)
		{
			return await _dbContext.Logradouro.AsNoTracking().FirstOrDefaultAsync(l => l.Id == id);
		}

		public async Task<Logradouro> Create(Logradouro logradouro)
		{
			_dbContext.Logradouro.Add(logradouro);
			await _dbContext.SaveChangesAsync();
			return logradouro;
		}

		public async Task<Logradouro> Update(Logradouro logradouro)
		{
			_dbContext.Entry(logradouro).State = EntityState.Modified;
			await _dbContext.SaveChangesAsync();
			return logradouro;
		}

		public async Task<Logradouro> Delete(int id)
		{
			var logradouro = await GetById(id);
			_dbContext.Logradouro.Remove(logradouro);
			await _dbContext.SaveChangesAsync();
			return logradouro;
		}	
	}
}
