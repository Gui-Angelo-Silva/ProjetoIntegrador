using Microsoft.EntityFrameworkCore;
using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;

namespace SGED.Repositories.Entities
{
	public class EtapaRepository : IEtapaRepository
	{
		private readonly AppDBContext _dbContext;

		public EtapaRepository(AppDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<IEnumerable<Etapa>> GetAll()
		{
			return await _dbContext.Etapa.Include(objeto => objeto.TipoProcesso).ToListAsync();
		}

		public async Task<Etapa> GetById(int id)
		{
			return await _dbContext.Etapa.Include(objeto => objeto.TipoProcesso).Where(objeto => objeto.Id == id).FirstOrDefaultAsync();
		}

		public async Task<Etapa> Create(Etapa etapa)
		{
			_dbContext.Add(etapa);
			await _dbContext.SaveChangesAsync();
			return etapa;
		}

		public async Task<Etapa> Update(Etapa etapa)
		{
			_dbContext.Entry(etapa).State = EntityState.Modified; 
			await _dbContext.SaveChangesAsync();
			return etapa;
		}

		public async Task<Etapa> Delete(int id)
		{
			var etapa = await GetById(id);
			_dbContext.Etapa.Remove(etapa);
			await _dbContext.SaveChangesAsync();
			return etapa;
		}

	}
}
