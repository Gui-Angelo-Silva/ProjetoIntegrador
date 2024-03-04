using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SGED.Repositories.Entities;
public class SessaoRepository : ISessaoRepository
{

    private readonly AppDBContext _dbContext;

    public SessaoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Sessao>> GetAll()
    {
        return await _dbContext.Sessao.ToListAsync();
    }

    public async Task<IEnumerable<IEnumerable<Sessao>>> GetAllSessionsGroupedByUser()
    {
        return await _dbContext.Sessao.GroupBy(sessao => sessao.IdUsuario).Select(group => group.OrderBy(sessao => sessao.Id)).ToListAsync();
    }

    public async Task<IEnumerable<Sessao>> GetOpenSessions()
    {
        return await _dbContext.Sessao.Where(objeto => objeto.StatusSessao).Include(objeto => objeto.Usuario).ToListAsync();
    }

    public async Task<IEnumerable<Sessao>> GetCloseSessions()
    {
        return await _dbContext.Sessao.Where(objeto => !objeto.StatusSessao).ToListAsync();
    }

    public async Task<Sessao> GetLastSession(int id)
    {
        return await _dbContext.Sessao.Where(objeto => objeto.IdUsuario == id).OrderByDescending(objeto => objeto.Id).FirstOrDefaultAsync(); ;
    }

    public async Task<Sessao> GetById(int id)
    {
        return await _dbContext.Sessao.Where(objeto => objeto.Id == id).Include(objeto => objeto.Usuario).ThenInclude(usuario => usuario.TipoUsuario).FirstOrDefaultAsync();
    }

    public async Task<Usuario> GetUser(int id)
    {
        return await _dbContext.Sessao.Where(s => s.Id == id).Select(s => s.Usuario).FirstOrDefaultAsync();
    }

    public async Task<Sessao> Create(Sessao sessao)
    {
        _dbContext.Sessao.Add(sessao);
        await _dbContext.SaveChangesAsync();
        return sessao;
    }

    public async Task<Sessao> Update(Sessao sessao)
    {
        _dbContext.ChangeTracker.Clear();
        _dbContext.Entry(sessao).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return sessao;
    }

    public async Task<Sessao> Delete(int id)
    {
        var sessao = await GetById(id);
        _dbContext.Sessao.Remove(sessao);
        await _dbContext.SaveChangesAsync();
        return sessao;
    }


    public async Task<IEnumerable<Usuario>> GetOnlineUser()
    {
        return await _dbContext.Usuario.GroupJoin(
            _dbContext.Sessao,
            usuario => usuario.Id,
            sessao => sessao.IdUsuario,
            (usuario, sessoes) => new { Usuario = usuario, UltimaSessao = sessoes.OrderByDescending(s => s.Id).FirstOrDefault() }
        ).Where(u => u.Usuario.Id != 1 && (u.UltimaSessao != null && u.UltimaSessao.StatusSessao)).Select(u => u.Usuario).ToListAsync();
    }

    public async Task<IEnumerable<Usuario>> GetOfflineUser()
    {
        return await _dbContext.Usuario.GroupJoin(
            _dbContext.Sessao,
            usuario => usuario.Id,
            sessao => sessao.IdUsuario,
            (usuario, sessoes) => new { Usuario = usuario, UltimaSessao = sessoes.OrderByDescending(s => s.Id).FirstOrDefault() }
        ).Where(objeto => objeto.Usuario.Id != 1 && (objeto.UltimaSessao == null || !objeto.UltimaSessao.StatusSessao)).Select(objeto => objeto.Usuario).ToListAsync();
    }

}
