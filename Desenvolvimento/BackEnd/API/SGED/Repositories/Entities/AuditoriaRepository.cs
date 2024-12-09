using SGED.Context;
using SGED.DTOs.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class AuditoriaRepository : IAuditoriaRepository
{

    private readonly AppDBContext _dbContext;

    public AuditoriaRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<AuditoriaModel>> GetAll()
    {
        return await _dbContext.Auditoria.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<AuditoriaModel>> GetBySession(Guid idSessao)
    {
        return await _dbContext.Auditoria.Where(b => b.IdSessao == idSessao).AsNoTracking().ToListAsync();
    }

    public async Task<AuditoriaModel> GetById(Guid id)
    {
        return await _dbContext.Auditoria.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<AuditoriaModel> Create(AuditoriaModel auditoria)
    {
        _dbContext.Auditoria.Add(auditoria);
        await _dbContext.SaveChangesAsync();
        return auditoria;
    }

    public async Task<AuditoriaModel> Update(AuditoriaModel auditoria)
    {
        _dbContext.Entry(auditoria).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return auditoria;
    }

    public async Task<AuditoriaModel> Delete(Guid id)
    {
        var auditoria = await GetById(id);
        _dbContext.Auditoria.Remove(auditoria);
        await _dbContext.SaveChangesAsync();
        return auditoria;
    }

}
