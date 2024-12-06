using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class TopografiaRepository : ITopografiaRepository
{

    private readonly AppDBContext _dbContext;

    public TopografiaRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<TopografiaModel>> GetAll()
    {
        return await _dbContext.Topografia.AsNoTracking().ToListAsync();
    }

    public async Task<TopografiaModel> GetById(int id)
    {
        return await _dbContext.Topografia.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<TopografiaModel> Create(TopografiaModel topografia)
    {
        _dbContext.Topografia.Add(topografia);
        await _dbContext.SaveChangesAsync();
        return topografia;
    }

    public async Task<TopografiaModel> Update(TopografiaModel topografia)
    {
        _dbContext.Entry(topografia).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return topografia;
    }

    public async Task<TopografiaModel> Delete(int id)
    {
        var topografia = await GetById(id);
        _dbContext.Topografia.Remove(topografia);
        await _dbContext.SaveChangesAsync();
        return topografia;
    }
}
