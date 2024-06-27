using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class OcupacaoAtualRepository : IOcupacaoAtualRepository
{

    private readonly AppDBContext _dbContext;

    public OcupacaoAtualRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<OcupacaoAtual>> GetAll()
    {
        return await _dbContext.OcupacaoAtual.AsNoTracking().ToListAsync();
    }

    public async Task<OcupacaoAtual> GetById(int id)
    {
        return await _dbContext.OcupacaoAtual.AsNoTracking().FirstOrDefaultAsync(oa => oa.Id == id);
    }

    public async Task<OcupacaoAtual> Create(OcupacaoAtual ocupacaoatual)
    {
        _dbContext.OcupacaoAtual.Add(ocupacaoatual);
        await _dbContext.SaveChangesAsync();
        return ocupacaoatual;
    }

    public async Task<OcupacaoAtual> Update(OcupacaoAtual ocupacaoatual)
    {
        _dbContext.Entry(ocupacaoatual).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return ocupacaoatual;
    }

    public async Task<OcupacaoAtual> Delete(int id)
    {
        var ocupacaoatual = await GetById(id);
        _dbContext.OcupacaoAtual.Remove(ocupacaoatual);
        await _dbContext.SaveChangesAsync();
        return ocupacaoatual;
    }
}
