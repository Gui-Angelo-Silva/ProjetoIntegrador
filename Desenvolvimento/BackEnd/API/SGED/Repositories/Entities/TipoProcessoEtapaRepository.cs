using SGED.Context;
using SGED.Models.Entities;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

namespace SGED.Repositories.Entities;
public class TipoProcessoEtapaRepository : ITipoProcessoEtapaRepository
{

    private readonly AppDBContext _dbContext;

    public TipoProcessoEtapaRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<TipoProcessoEtapa>> GetAll()
    {
        return await _dbContext.TipoProcessoEtapa.Include(objeto => objeto.TipoProcesso).ToListAsync();
    }

    public async Task<TipoProcessoEtapa> GetById(int id)
    {
        return await _dbContext.TipoProcessoEtapa.Include(objeto => objeto.TipoProcesso).Where(b => b.Id == id).FirstOrDefaultAsync();
    }
    public async Task<IEnumerable<TipoProcessoEtapa>> GetAll()
    {
        return await _dbContext.TipoProcessoEtapa.Include(objeto => objeto.Etapa).ToListAsync();
    }

    public async Task<TipoProcessoEtapa> GetById(int id)
    {
        return await _dbContext.TipoProcessoEtapa.Include(objeto => objeto.Etapa).Where(b => b.Id == id).FirstOrDefaultAsync();


        public async Task<TipoProcessoEtapa> Create(TipoProcessoEtapa TipoProcessoEtapa)
        {
            _dbContext.TipoProcessoEtapa.Add(TipoProcessoEtapa);
            await _dbContext.SaveChangesAsync();
            return TipoProcessoEtapa;
        }

        public async Task<TipoProcessoEtapa> Update(TipoProcessoEtapa TipoProcessoEtapa)
        {
            _dbContext.Entry(TipoProcessoEtapa).State = EntityState.Modified;
            await _dbContext.SaveChangesAsync();
            return TipoProcessoEtapa;
        }

        public async Task<TipoProcessoEtapa> Delete(int id)
        {
            var TipoProcessoEtapa = await GetById(id);
            _dbContext.TipoProcessoEtapa.Remove(TipoProcessoEtapa);
            await _dbContext.SaveChangesAsync();
            return TipoProcessoEtapa;
        }

    }
}
