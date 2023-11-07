using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SGED.Repositories.Entities;
public class MunicipeRepository : IMunicipeRepository
{

    private readonly AppDBContext _dbContext;

    public MunicipeRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Municipe>> GetAll()
    {
        return await _dbContext.Municipe.ToListAsync();
    }

    public async Task<Municipe> GetById(int id)
    {
        return await _dbContext.Municipe.Where(p => p.Id == id).FirstOrDefaultAsync();
    }


    public async Task<Municipe> Create(Municipe municipe)
    {
        _dbContext.Municipe.Add(municipe);
        await _dbContext.SaveChangesAsync();
        return municipe;
    }

    public async Task<Municipe> Update(Municipe municipe)
    {
        _dbContext.Entry(municipe).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return municipe;
    }

    public async Task<Municipe> Delete(int id)
    {
        var municipe = await GetById(id);
        _dbContext.Municipe.Remove(municipe);
        await _dbContext.SaveChangesAsync();
        return municipe;
    }

}
