using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class InstalacaoRepository : IInstalacaoRepository
{

    private readonly AppDBContext _dbContext;

    public InstalacaoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Instalacao>> GetAll()
    {
        return await _dbContext.Instalacao.AsNoTracking().ToListAsync();
    }

    public async Task<Instalacao> GetById(int id)
    {
        return await _dbContext.Instalacao.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);
    }

    public async Task<Instalacao> Create(Instalacao instalacao)
    {
        _dbContext.Instalacao.Add(instalacao);
        await _dbContext.SaveChangesAsync();
        return instalacao;
    }

    public async Task<Instalacao> Update(Instalacao instalacao)
    {
        _dbContext.Entry(instalacao).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return instalacao;
    }

    public async Task<Instalacao> Delete(int id)
    {
        var instalacao = await GetById(id);
        _dbContext.Instalacao.Remove(instalacao);
        await _dbContext.SaveChangesAsync();
        return instalacao;
    }
}
