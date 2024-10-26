using SGED.Context;
using SGED.DTOs.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using SGED.Objects.Models.Entities;
using SGED.Objects.Enums.Status;

namespace SGED.Repositories.Entities;
public class ProcessoRepository : IProcessoRepository
{

    private readonly AppDBContext _dbContext;

    public ProcessoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<ProcessoModel>> GetAll()
    {
        return await _dbContext.Processo.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<ProcessoModel>> GetByStatus(int status)
    {
        // Convertendo o valor numérico para o enum
        StatusProcess statusEnum = (StatusProcess)status;

        return await _dbContext.Processo
            .AsNoTracking()
            .Where(p => p.Status == statusEnum) // Comparando com o enum
            .ToListAsync();
    }

    public async Task<ProcessoModel> GetById(Guid id)
    {
        return await _dbContext.Processo.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<ProcessoModel> Create(ProcessoModel Processo)
    {
        _dbContext.Processo.Add(Processo);
        await _dbContext.SaveChangesAsync();
        return Processo;
    }

    public async Task<ProcessoModel> Update(ProcessoModel Processo)
    {
        _dbContext.Entry(Processo).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return Processo;
    }

    public async Task<ProcessoModel> Delete(Guid id)
    {
        var Processo = await GetById(id);
        _dbContext.Processo.Remove(Processo);
        await _dbContext.SaveChangesAsync();
        return Processo;
    }

}
