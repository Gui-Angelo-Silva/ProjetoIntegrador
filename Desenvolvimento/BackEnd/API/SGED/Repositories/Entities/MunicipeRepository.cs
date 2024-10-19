using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class MunicipeRepository : IMunicipeRepository
{

    private readonly AppDBContext _dbContext;

    public MunicipeRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<MunicipeModel>> GetAll()
    {
        return await _dbContext.Municipe.AsNoTracking().ToListAsync();
    }

    public async Task<MunicipeModel> GetById(int id)
    {
        return await _dbContext.Municipe.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);
    }


    public async Task<MunicipeModel> Create(MunicipeModel municipe)
    {
        _dbContext.Municipe.Add(municipe);
        await _dbContext.SaveChangesAsync();
        return municipe;
    }

    public async Task<MunicipeModel> Update(MunicipeModel municipe)
    {
        _dbContext.ChangeTracker.Clear();
        _dbContext.Entry(municipe).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return municipe;
    }

    public async Task<MunicipeModel> Delete(int id)
    {
        var municipe = await GetById(id);
        _dbContext.Municipe.Remove(municipe);
        await _dbContext.SaveChangesAsync();
        return municipe;
    }

}
