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

    public async Task<IEnumerable<Cidade>> GetAll()
    {
        return await _dbContext.Cidade.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<Cidade>> GetByState(int idEstado)
    {
        return await _dbContext.Cidade.Where(c => c.IdEstado == idEstado). AsNoTracking().ToListAsync();
    }

    public async Task<Cidade> GetById(int id)
    {
        return await _dbContext.Cidade.AsNoTracking().FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task<Cidade> Create(Cidade cidade)
    {
        _dbContext.Cidade.Add(cidade);
        await _dbContext.SaveChangesAsync();
        return cidade;
    }

    public async Task<Cidade> Update(Cidade cidade)
    {
        _dbContext.Entry(cidade).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return cidade;
    }

    public async Task<Cidade> Delete(int id)
    {
        var cidade = await GetById(id);
        _dbContext.Cidade.Remove(cidade);
        await _dbContext.SaveChangesAsync();
        return cidade;
    }
}