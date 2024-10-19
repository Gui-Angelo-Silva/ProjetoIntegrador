using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class FiscalRepository : IFiscalRepository
{

    private readonly AppDBContext _dbContext;

    public FiscalRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<FiscalModel>> GetAll()
    {
        return await _dbContext.Fiscal.AsNoTracking().ToListAsync();
    }

    public async Task<FiscalModel> GetById(int id)
    {
        return await _dbContext.Fiscal.AsNoTracking().FirstOrDefaultAsync(f => f.Id == id);
    }


    public async Task<FiscalModel> Create(FiscalModel fiscal)
    {
        _dbContext.Fiscal.Add(fiscal);
        await _dbContext.SaveChangesAsync();
        return fiscal;
    }

    public async Task<FiscalModel> Update(FiscalModel fiscal)
    {
        _dbContext.Entry(fiscal).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return fiscal;
    }

    public async Task<FiscalModel> Delete(int id)
    {
        var fiscal = await GetById(id);
        _dbContext.Fiscal.Remove(fiscal);
        await _dbContext.SaveChangesAsync();
        return fiscal;
    }
}
