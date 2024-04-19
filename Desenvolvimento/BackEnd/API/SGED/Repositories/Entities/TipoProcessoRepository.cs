using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace SGED.Repositories.Entities;
public class TipoProcessoRepository : ITipoProcessoRepository
{

	private readonly AppDBContext _dbContext;

	public TipoProcessoRepository(AppDBContext dbContext)
	{
		_dbContext = dbContext;
	}

	public async Task<IEnumerable<TipoProcesso>> GetAll()
        {
            var result = await _dbContext.TipoProcesso.ToListAsync();
            DetachEntities(result);
            return result;
        }

        public async Task<TipoProcesso> GetById(int id)
        {
            var result = await _dbContext.TipoProcesso.FindAsync(id);
            DetachEntity(result);
            return result;
        }

        public async Task<TipoProcesso> Create(TipoProcesso tipoProcesso)
        {
            _dbContext.TipoProcesso.Add(tipoProcesso);
            await _dbContext.SaveChangesAsync();
            DetachEntity(tipoProcesso);
            return tipoProcesso;
        }

        public async Task<TipoProcesso> Update(TipoProcesso tipoProcesso)
        {
            _dbContext.Entry(tipoProcesso).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            DetachEntity(tipoProcesso);
            return tipoProcesso;
        }

        public async Task<TipoProcesso> Delete(int id)
        {
            var tipoProcesso = await GetById(id);
            _dbContext.TipoProcesso.Remove(tipoProcesso);
            await _dbContext.SaveChangesAsync();
            DetachEntity(tipoProcesso);
            return tipoProcesso;
        }

        private void DetachEntity(TipoProcesso entity)
        {
            if (entity != null)
            {
                _dbContext.Entry(entity).State = EntityState.Detached;
            }
        }

        private void DetachEntities(IEnumerable<TipoProcesso> entities)
        {
            foreach (var entity in entities)
            {
                DetachEntity(entity);
            }
        }
}
