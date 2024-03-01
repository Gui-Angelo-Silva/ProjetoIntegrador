using SGED.Context;
using SGED.Models.Entities;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

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
        return await _dbContext.Usuario.Where(objeto => objeto.EmailPessoa != "devops@development.com").ToListAsync();
        //return await _dbContext.Usuario.Where(objeto => objeto.EmailPessoa != "devops@development.com").Include(objeto => objeto.TipoUsuario).ToListAsync();
    }

    public async Task<Usuario> GetById(int id)
    {
        return await _dbContext.Usuario.Where(objeto => objeto.Id == id && objeto.EmailPessoa != "devops@development.com").Include(objeto => objeto.TipoUsuario).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Usuario>> GetByEmail(int id, string email)
    {
        return await _dbContext.Usuario.Where(objeto => objeto.Id != id && objeto.EmailPessoa.Contains(email) && objeto.EmailPessoa != "devops@development.com").ToListAsync();
    }

    public async Task<Usuario> Autentication(Autentication autentication)
    {
        return await _dbContext.Usuario.Where(objeto => objeto.EmailPessoa == autentication.Email && objeto.SenhaUsuario == autentication.Senha).Include(objeto => objeto.TipoUsuario).FirstOrDefaultAsync();
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
