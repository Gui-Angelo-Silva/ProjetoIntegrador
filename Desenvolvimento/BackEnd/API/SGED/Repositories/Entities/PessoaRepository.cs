using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SGED.Repositories.Entities;
public class PessoaRepository : IPessoaRepository
{

    private readonly AppDBContext _dbContext;

    public PessoaRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Pessoa>> GetAll()
    {
        return await _dbContext.Pessoa.ToListAsync();
    }

    public async Task<Pessoa> GetById(int id)
    {
        return await _dbContext.Pessoa.Where(p => p.Id == id).FirstOrDefaultAsync();
    }


    public async Task<Pessoa> Create(Pessoa pessoa)
    {
        _dbContext.Pessoa.Add(pessoa);
        await _dbContext.SaveChangesAsync();
        return pessoa;
    }

    public async Task<Pessoa> Update(Pessoa pessoa)
    {
        _dbContext.Entry(pessoa).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return pessoa;
    }

    public async Task<Pessoa> Delete(int id)
    {
        var pessoa = await GetById(id);
        _dbContext.Pessoa.Remove(pessoa);
        await _dbContext.SaveChangesAsync();
        return pessoa;
    }

}
