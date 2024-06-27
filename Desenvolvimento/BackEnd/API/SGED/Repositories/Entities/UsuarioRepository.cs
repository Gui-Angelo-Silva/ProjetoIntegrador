using SGED.Context;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using SGED.Objects.Models.Entities;

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
        return await _dbContext.Usuario.Where(u => u.Id != 1).AsNoTracking().ToListAsync();
    }

    public async Task<Usuario> GetById(int id)
    {
        return await _dbContext.Usuario.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<IEnumerable<Usuario>> GetByEmail(int id, string email)
    {
        return await _dbContext.Usuario.Where(u => u.EmailPessoa.Contains(email)).AsNoTracking().ToListAsync();
    }

    public async Task<Usuario> Login(Login login)
    {
        return await _dbContext.Usuario.Where(u => u.EmailPessoa == login.Email && u.SenhaUsuario == login.Senha).Include(u => u.TipoUsuario).AsNoTracking().FirstOrDefaultAsync();
    }

    public async Task<Usuario> Create(Usuario usuario)
    {
        _dbContext.Usuario.Add(usuario);
        await _dbContext.SaveChangesAsync();
        return usuario;
    }

    public async Task<Usuario> Update(Usuario usuario)
    {
        _dbContext.ChangeTracker.Clear();
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
