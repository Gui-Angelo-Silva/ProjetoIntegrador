using Microsoft.EntityFrameworkCore;
using SGED.Context;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;

namespace SGED.Repositories.Entities
{
    public class CondicaoRepository : ICondicaoSoloRepository
    {
        private readonly AppDBContext _dbContext;

        public CondicaoRepository(AppDBContext dBContext)
        {
            _dbContext = dBContext;
        }

        public async Task<IEnumerable<CondicaoSolo>> GetAll()
        {
            return await _dbContext.CondicaoSolo.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<CondicaoSolo>> GetByCondiction(string condicaosolo)
        {
            return await _dbContext.CondicaoSolo.Where(cs => cs.Condicao.ToUpper().Contains(condicaosolo.ToUpper())).AsNoTracking().ToListAsync();
        }

        public async Task<CondicaoSolo> GetById(int id)
        {
            return await _dbContext.CondicaoSolo.AsNoTracking().FirstOrDefaultAsync(cs => cs.Id == id);
        }

        public async Task<CondicaoSolo> Create(CondicaoSolo condicaosolo)
        {
            _dbContext.CondicaoSolo.Add(condicaosolo);
            await _dbContext.SaveChangesAsync();
            return condicaosolo;
        }
        public async Task<CondicaoSolo> Update(CondicaoSolo condicaosolo)
        {
            _dbContext.Entry(condicaosolo).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();    
            return condicaosolo;    
        }

        public async Task<CondicaoSolo> Delete(int id)
        {
            var condicaosolo = await GetById(id);
            _dbContext.CondicaoSolo.Remove(condicaosolo);
            await _dbContext.SaveChangesAsync();
            return condicaosolo;
        }
    }
}