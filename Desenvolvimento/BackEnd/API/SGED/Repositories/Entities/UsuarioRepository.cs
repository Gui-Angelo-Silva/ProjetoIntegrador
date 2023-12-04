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
        return await _dbContext.Usuario.Where(p => p.EmailPessoa != "devops@development.com").ToListAsync();
    }

    public async Task<Usuario> GetById(int id)
    {
        return await _dbContext.Usuario.Where(p => p.Id == id && p.EmailPessoa != "devops@development.com").FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Usuario>> GetByEmail(int id, string email)
    {
        return await _dbContext.Usuario.Where(p => p.Id != id && p.EmailPessoa.Contains(email) && p.EmailPessoa != "devops@development.com").ToListAsync();
    }

    public async Task<Usuario> Autentication(Autentication autentication)
    {
        return await _dbContext.Usuario.Where(p => p.EmailPessoa == autentication.Email && p.SenhaUsuario == autentication.Senha).FirstOrDefaultAsync();
    }

    public async Task<Usuario> Create(Usuario usuario)
    {
        _dbContext.Usuario.Add(usuario);
        await _dbContext.SaveChangesAsync();
        return usuario;
    }

    public async Task<Usuario> Update(Usuario usuario)
    {
        _dbContext.Entry(usuario).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return usuario;
    }

    public async Task<Usuario> Delete(int id)
    {
        var usuario = await GetById(id);
        _dbContext.Usuario.Remove(usuario);
        await _dbContext.SaveChangesAsync();
        return usuario;
    }

}
