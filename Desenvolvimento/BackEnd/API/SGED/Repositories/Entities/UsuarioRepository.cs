using SGED.Context;
using SGED.DTOs.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using SGED.Objects.Models.Entities;
using SGED.Objects.Server;
using SGED.Objects.Utilities;

namespace SGED.Repositories.Entities;
public class UsuarioRepository : IUsuarioRepository
{

    private readonly AppDBContext _dbContext;

    public UsuarioRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<UsuarioModel>> GetAll()
    {
        var usuarios = await _dbContext.Usuario
            .Where(u => u.Id != 1)
            .AsNoTracking()
            .ToListAsync();

        foreach (var user in usuarios)
        {
            user.SenhaUsuario = string.Empty;
        }

        return usuarios;
    }

    public async Task<IEnumerable<UsuarioModel>> Search(string search)
    {
        if (string.IsNullOrWhiteSpace(search))
        {
            return new List<UsuarioModel>();
        }

        // Carregar todos os usuarios do banco de dados
        var usuarios = await _dbContext.Usuario.AsNoTracking().ToListAsync();

        // Normaliza e converte o termo de pesquisa para lowercase, removendo acentuação
        string normalizedSearch = Operator.RemoveAccents(search.ToLower());

        // Filtrar os usuarios no lado do cliente
        return usuarios.Where(u => u.NomePessoa != null &&
            Operator.RemoveAccents(u.NomePessoa.ToLower()).Contains(normalizedSearch))
            .ToList();
    }

    public async Task<IEnumerable<UsuarioModel>> GetByEmail(int id, string email)
    {
        var usuarios = await _dbContext.Usuario
            .Where(u => u.EmailPessoa.Contains(email))
            .AsNoTracking()
            .ToListAsync();

        foreach (var user in usuarios)
        {
            user.SenhaUsuario = string.Empty;
        }

        return usuarios;
    }

    public async Task<UsuarioModel> GetById(int id)
    {
        var usuario = await _dbContext.Usuario
            .AsNoTracking()
            .FirstOrDefaultAsync(u => u.Id == id);

        if (usuario != null)
        {
            usuario.SenhaUsuario = string.Empty;
        }

        return usuario;
    }

    public async Task<UsuarioModel> Login(Login login)
    {
        var usuario = await _dbContext.Usuario
            .Where(u => u.EmailPessoa == login.Email && u.SenhaUsuario == login.Senha)
            .Include(u => u.TipoUsuario)
            .AsNoTracking()
            .FirstOrDefaultAsync();

        if (usuario != null)
        {
            usuario.SenhaUsuario = string.Empty;
        }

        return usuario;
    }

    public async Task<UsuarioModel> Create(UsuarioModel usuario)
    {
        _dbContext.Usuario.Add(usuario);
        await _dbContext.SaveChangesAsync();

        usuario.SenhaUsuario = string.Empty;
        return usuario;
    }

    public async Task<UsuarioModel> Update(UsuarioModel usuario)
    {
        _dbContext.ChangeTracker.Clear();
        _dbContext.Entry(usuario).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();

        usuario.SenhaUsuario = string.Empty;
        return usuario;
    }

    public async Task<UsuarioModel> Delete(int id)
    {
        var usuario = await GetById(id);
        if (usuario != null)
        {
            _dbContext.Usuario.Remove(usuario);
            await _dbContext.SaveChangesAsync();

            usuario.SenhaUsuario = string.Empty;
        }
        return usuario;
    }

}
