using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;

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
        return await _dbContext.TipoProcesso.AsNoTracking().ToListAsync();
    }

    public async Task<TipoProcesso> GetById(int id)
    {
        return await _dbContext.TipoProcesso.AsNoTracking().FirstOrDefaultAsync(tp => tp.Id == id);
    }

    public async Task<TipoProcesso> Create(TipoProcesso tipoProcesso)
    {
        _dbContext.TipoProcesso.Add(tipoProcesso);
        await _dbContext.SaveChangesAsync();
        return tipoProcesso;
    }

    public async Task<TipoProcesso> Update(TipoProcesso tipoProcesso)
    {
        _dbContext.Entry(tipoProcesso).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return tipoProcesso;
    }

    public async Task<TipoProcesso> Remove(int id)
    {
        var tipoProcesso = await GetById(id);
        if (tipoProcesso != null)
        {
            _dbContext.TipoProcesso.Remove(tipoProcesso);
            await _dbContext.SaveChangesAsync();
        }
        return tipoProcesso;
    }
}
