using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class EngenheiroRepository : IEngenheiroRepository
{

    private readonly AppDBContext _dbContext;

    public EngenheiroRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Engenheiro>> GetAll()
    {
		return await _dbContext.Engenheiro.AsNoTracking().ToListAsync();
    }

    public async Task<Engenheiro> GetById(int id)
    {
        return await _dbContext.Engenheiro.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
    }


    public async Task<Engenheiro> Create(Engenheiro engenheiro)
    {
        _dbContext.Engenheiro.Add(engenheiro);
        await _dbContext.SaveChangesAsync();
        return engenheiro;
    }

    public async Task<Engenheiro> Update(Engenheiro engenheiro)
    {
        _dbContext.ChangeTracker.Clear();
        _dbContext.Entry(engenheiro).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return engenheiro;
    }

    public async Task<Engenheiro> Delete(int id)
    {
        var engenheiro = await GetById(id);
        _dbContext.Engenheiro.Remove(engenheiro);
        await _dbContext.SaveChangesAsync();
        return engenheiro;
    }

}
