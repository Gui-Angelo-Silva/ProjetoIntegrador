using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class UsoRepository : IUsoRepository
{

    private readonly AppDBContext _dbContext;

    public UsoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Uso>> GetAll()
    {
        return await _dbContext.Uso.AsNoTracking().ToListAsync();
    }

    public async Task<Uso> GetById(int id)
    {
        return await _dbContext.Uso.AsNoTracking().FirstOrDefaultAsync(tu => tu.Id == id);
    }

    public async Task<Uso> Create(Uso uso)
    {
        _dbContext.Uso.Add(uso);
        await _dbContext.SaveChangesAsync();
        return uso;
    }

    public async Task<Uso> Update(Uso uso)
    {
        _dbContext.Entry(uso).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return uso;
    }

    public async Task<Uso> Delete(int id)
    {
        var uso = await GetById(id);
        _dbContext.Uso.Remove(uso);
        await _dbContext.SaveChangesAsync();
        return uso;
    }
}
