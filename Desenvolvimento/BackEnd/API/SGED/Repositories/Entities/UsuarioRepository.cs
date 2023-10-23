using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SGED.Repositories.Entities;
public class UsuarioRepository : IUsuarioRepository
{

    private readonly AppDBContext _dbContext;

    public UsuarioRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Usuario>> GetAll()
    {
        return await _dbContext.Usuario.ToListAsync();
    }

    public async Task<Usuario> GetById(int id)
    {
        return await _dbContext.Usuario.Where(p => p.Id == id).FirstOrDefaultAsync();
    }


    public async Task<Usuario> Create(Usuario pessoa)
    {
        _dbContext.Usuario.Add(pessoa);
        await _dbContext.SaveChangesAsync();
        return pessoa;
    }

    public async Task<Usuario> Update(Usuario pessoa)
    {
        _dbContext.Entry(pessoa).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return pessoa;
    }

    public async Task<Usuario> Delete(int id)
    {
        var pessoa = await GetById(id);
        _dbContext.Usuario.Remove(pessoa);
        await _dbContext.SaveChangesAsync();
        return pessoa;
    }

}
