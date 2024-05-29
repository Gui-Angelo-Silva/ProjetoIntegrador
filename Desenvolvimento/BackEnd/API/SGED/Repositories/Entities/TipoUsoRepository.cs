using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class TipoUsoRepository : ITipoUsoRepository
{

    private readonly AppDBContext _dbContext;

    public TipoUsoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<TipoUso>> GetAll()
    {
        return await _dbContext.TipoUso.ToListAsync();
    }

    public async Task<TipoUso> GetById(int id)
    {
        return await _dbContext.TipoUso.Where(objeto => objeto.Id == id).FirstOrDefaultAsync();
    }

    public async Task<TipoUso> Create(TipoUso tipouso)
    {
        _dbContext.TipoUso.Add(tipouso);
        await _dbContext.SaveChangesAsync();
        return tipouso;
    }

    public async Task<TipoUso> Update(TipoUso tipouso)
    {
        _dbContext.Entry(tipouso).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return tipouso;
    }

    public async Task<TipoUso> Delete(int id)
    {
        var tipouso = await GetById(id);
        _dbContext.TipoUso.Remove(tipouso);
        await _dbContext.SaveChangesAsync();
        return tipouso;
    }
}
