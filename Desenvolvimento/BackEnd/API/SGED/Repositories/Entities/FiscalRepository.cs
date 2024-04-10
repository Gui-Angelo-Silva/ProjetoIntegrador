using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SGED.Repositories.Entities;
public class FiscalRepository : IFiscalRepository
{

    private readonly AppDBContext _dbContext;

    public FiscalRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Fiscal>> GetAll()
    {
        return await _dbContext.Fiscal.ToListAsync();
    }

    public async Task<Fiscal> GetById(int id)
    {
        return await _dbContext.Fiscal.Where(objeto => objeto.Id == id).FirstOrDefaultAsync();
    }


    public async Task<Fiscal> Create(Fiscal fiscal)
    {
        _dbContext.Fiscal.Add(fiscal);
        await _dbContext.SaveChangesAsync();
        return fiscal;
    }

    public async Task<Fiscal> Update(Fiscal fiscal)
    {
        _dbContext.Entry(fiscal).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return fiscal;
    }

    public async Task<Fiscal> Delete(int id)
    {
        var fiscal = await GetById(id);
        _dbContext.Fiscal.Remove(fiscal);
        await _dbContext.SaveChangesAsync();
        return fiscal;
    }
}
