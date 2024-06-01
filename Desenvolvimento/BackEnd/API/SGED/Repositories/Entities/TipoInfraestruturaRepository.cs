using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class TipoInfraestruturaRepository : ITipoInfraestruturaRepository
{

    private readonly AppDBContext _dbContext;

    public TipoInfraestruturaRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<TipoInfraestrutura>> GetAll()
    {
        return await _dbContext.TipoInfraestrutura.AsNoTracking().ToListAsync();
    }

    public async Task<TipoInfraestrutura> GetById(int id)
    {
        return await _dbContext.TipoInfraestrutura.AsNoTracking().FirstOrDefaultAsync(ti => ti.Id == id);
    }

    public async Task<TipoInfraestrutura> Create(TipoInfraestrutura tipoinfraestrutura)
    {
        _dbContext.TipoInfraestrutura.Add(tipoinfraestrutura);
        await _dbContext.SaveChangesAsync();
        return tipoinfraestrutura;
    }

    public async Task<TipoInfraestrutura> Update(TipoInfraestrutura tipoinfraestrutura)
    {
        _dbContext.Entry(tipoinfraestrutura).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return tipoinfraestrutura;
    }

    public async Task<TipoInfraestrutura> Delete(int id)
    {
        var tipoinfraestrutura = await GetById(id);
        _dbContext.TipoInfraestrutura.Remove(tipoinfraestrutura);
        await _dbContext.SaveChangesAsync();
        return tipoinfraestrutura;
    }
}
