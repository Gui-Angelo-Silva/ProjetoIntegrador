using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

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
        return await _dbContext.Cidades.Include(p => p.Estado).ToListAsync();
    }

    public async Task<Cidade> GetById(int id)
    {
        return await _dbContext.Cidades.Include(p => p.Estado).Where(b => b.Id == id).FirstOrDefaultAsync();
    }


    public async Task<Cidade> Create(Cidade cidade)
    {
        _dbContext.Cidades.Add(cidade);
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
        _dbContext.Cidades.Remove(cidade);
        await _dbContext.SaveChangesAsync();
        return cidade;
    }

}
