using Microsoft.EntityFrameworkCore;
using SGED.Context;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Objects.Utilities.StatusState;

namespace SGED.Repositories.Entities
{
    public class EtapaRepository : IEtapaRepository
	{
		private readonly AppDBContext _dbContext;
        private readonly RemoveContext _remove;

        public EtapaRepository(AppDBContext dbContext)
		{
			_dbContext = dbContext;
            _remove = new RemoveContext(dbContext);
        }

		public async Task<IEnumerable<EtapaModel>> GetAll()
		{
			return await _dbContext.Etapa.AsNoTracking().ToListAsync();
		}

		public async Task<EtapaModel> GetById(int id)
		{
			return await _dbContext.Etapa.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
		}

		public async Task<EtapaModel> Create(EtapaModel etapa)
		{
			_dbContext.Add(etapa);
			await _dbContext.SaveChangesAsync();
			return etapa;
		}

		public async Task<EtapaModel> Update(EtapaModel etapa)
		{
			_dbContext.Entry(etapa).State = EntityState.Modified; 
			await _dbContext.SaveChangesAsync();
			return etapa;
		}

		public async Task<EtapaModel> Delete(int id)
		{
			var etapa = await GetById(id);
			_dbContext.Etapa.Remove(etapa);
			await _dbContext.SaveChangesAsync();
			return etapa;
		}


		public async Task<IEnumerable<EtapaModel>> GetStagesRelatedToTypeProcess(int idTipoProcesso)
		{
			return await _dbContext.Etapa.Where(e => e.IdTipoProcesso == idTipoProcesso).AsNoTracking().ToListAsync();
		}

	}
}
