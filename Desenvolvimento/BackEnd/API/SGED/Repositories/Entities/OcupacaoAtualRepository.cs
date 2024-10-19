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

    public async Task<IEnumerable<OcupacaoAtualModel>> GetAll()
    {
        return await _dbContext.OcupacaoAtual.AsNoTracking().ToListAsync();
    }

    public async Task<OcupacaoAtualModel> GetById(int id)
    {
        return await _dbContext.OcupacaoAtual.AsNoTracking().FirstOrDefaultAsync(oa => oa.Id == id);
    }

    public async Task<OcupacaoAtualModel> Create(OcupacaoAtualModel ocupacaoatual)
    {
        _dbContext.OcupacaoAtual.Add(ocupacaoatual);
        await _dbContext.SaveChangesAsync();
        return ocupacaoatual;
    }

    public async Task<OcupacaoAtualModel> Update(OcupacaoAtualModel ocupacaoatual)
    {
        _dbContext.Entry(ocupacaoatual).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return ocupacaoatual;
    }

    public async Task<OcupacaoAtualModel> Delete(int id)
    {
        var ocupacaoatual = await GetById(id);
        _dbContext.OcupacaoAtual.Remove(ocupacaoatual);
        await _dbContext.SaveChangesAsync();
        return ocupacaoatual;
    }
}
