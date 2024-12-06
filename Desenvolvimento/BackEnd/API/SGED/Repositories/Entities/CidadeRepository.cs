using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class CidadeRepository : ICidadeRepository
{

    private readonly AppDBContext _dbContext;

    public CidadeRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<CidadeModel>> GetAll()
    {
        return await _dbContext.Cidade.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<CidadeModel>> GetByState(int idEstado)
    {
        return await _dbContext.Cidade.Where(c => c.IdEstado == idEstado). AsNoTracking().ToListAsync();
    }

    public async Task<CidadeModel> GetById(int id)
    {
        return await _dbContext.Cidade.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<CidadeModel> Create(CidadeModel cidade)
    {
        _dbContext.Cidade.Add(cidade);
        await _dbContext.SaveChangesAsync();
        return cidade;
    }

    public async Task<CidadeModel> Update(CidadeModel cidade)
    {
        _dbContext.Entry(cidade).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return cidade;
    }

    public async Task<CidadeModel> Delete(int id)
    {
        var cidade = await GetById(id);
        _dbContext.Cidade.Remove(cidade);
        await _dbContext.SaveChangesAsync();
        return cidade;
    }
}