using Microsoft.EntityFrameworkCore;
using SGED.Context;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;

namespace SGED.Repositories.Entities
{
    public class TipoDocumentoRepository : ITipoDocumentoRepository
	{
		private readonly AppDBContext _dbcontext;

        public TipoDocumentoRepository(AppDBContext dbcontext)
		{
			_dbcontext = dbcontext;
        }

		public async Task<IEnumerable<TipoDocumentoModel>> GetAll()
		{
			return await _dbcontext.TipoDocumento.AsNoTracking().ToListAsync();
		}

		public async Task<TipoDocumentoModel> GetById(int id)
		{
			return await _dbcontext.TipoDocumento.AsNoTracking().FirstOrDefaultAsync(td => td.Id == id);
		}

		public async Task<TipoDocumentoModel> Create(TipoDocumentoModel TipoDocumento)
		{
			_dbcontext.TipoDocumento.Add(TipoDocumento);
			await _dbcontext.SaveChangesAsync();
			return TipoDocumento;
		}

		public async Task<TipoDocumentoModel> Update(TipoDocumentoModel TipoDocumento)
		{
			_dbcontext.Entry(TipoDocumento).State = EntityState.Modified;
			await _dbcontext.SaveChangesAsync();
			return TipoDocumento;
		}

		public async Task<TipoDocumentoModel> Delete(int id)
		{
			var TipoDocumento = await GetById(id);
			_dbcontext.TipoDocumento.Remove(TipoDocumento);
			await _dbcontext.SaveChangesAsync();
			return TipoDocumento;
		}
	}
}
