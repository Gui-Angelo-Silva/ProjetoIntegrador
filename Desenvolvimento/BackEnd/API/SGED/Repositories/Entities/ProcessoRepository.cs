using SGED.Context;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class ProcessoRepository : IProcessoRepository
{

    private readonly AppDBContext _dbContext;

    public ProcessoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Processo>> GetAll()
    {
        return await _dbContext.Processo.AsNoTracking().ToListAsync();
    }

    public async Task<Processo> GetById(Guid id)
    {
        return await _dbContext.Processo.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<Processo> Create(Processo Processo)
    {
        _dbContext.Processo.Add(Processo);
        await _dbContext.SaveChangesAsync();
        return Processo;
    }

    public async Task<Processo> Update(Processo Processo)
    {
        _dbContext.Entry(Processo).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return Processo;
    }

    public async Task<Processo> Delete(Guid id)
    {
        var Processo = await GetById(id);
        _dbContext.Processo.Remove(Processo);
        await _dbContext.SaveChangesAsync();
        return Processo;
    }

}
