using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SGED.Repositories.Entities;
public class EstadoRepository : IEstadoRepository
{

    private readonly AppDBContext _dbContext;

    public EstadoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Estado>> GetAll()
    {
        return await _dbContext.Estados.ToListAsync();
    }

    public async Task<Estado> GetById(int id)
    {
        return await _dbContext.Estados.Where(p => p.Id == id).FirstOrDefaultAsync();
    }


    public async Task<Estado> Create(Estado estado)
    {
        _dbContext.Estados.Add(estado);
        await _dbContext.SaveChangesAsync();
        return estado;
    }

    public async Task<Estado> Update(Estado estado)
    {
        _dbContext.Entry(estado).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return estado;
    }

    public async Task<Estado> Delete(int id)
    {
        var estado = await GetById(id);
        _dbContext.Estados.Remove(estado);
        await _dbContext.SaveChangesAsync();
        return estado;
    }

}
