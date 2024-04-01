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
        return await _dbContext.Sessao.Where(sessao => sessao.StatusSessao).ToListAsync();
    }

    public async Task<IEnumerable<Sessao>> GetCloseSessions()
    {
        return await _dbContext.Sessao.Where(sessao => !sessao.StatusSessao).ToListAsync();
    }

    public async Task<Sessao> GetLastSession(int id)
    {
        return await _dbContext.Sessao.Where(sessao => sessao.IdUsuario == id).OrderByDescending(sessao => sessao.Id).FirstOrDefaultAsync();
    }

    public async Task<Sessao> GetById(int id)
    {
        // return await _dbContext.Sessao.Where(sessao => sessao.Id == id).Include(sessao => sessao.Usuario).ThenInclude(usuario => usuario.TipoUsuario).FirstOrDefaultAsync();
        return await _dbContext.Sessao.Where(sessao => sessao.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Sessao> GetByToken(string token)
    {
        return await _dbContext.Sessao.Where(sessao => sessao.TokenSessao == token).FirstOrDefaultAsync();
    }

    public async Task<Usuario> GetUser(string token)
    {
        var sessao = await _dbContext.Sessao
            .Include(s => s.Usuario)
                .ThenInclude(u => u.TipoUsuario)
            .FirstOrDefaultAsync(s => s.TokenSessao == token);

        return sessao?.Usuario;
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

    public async Task<IEnumerable<Usuario>> GetOnlineUsers()
    {
        return await _dbContext.Usuario.GroupJoin(
            _dbContext.Sessao,
            usuario => usuario.Id,
            sessao => sessao.IdUsuario,
            (usuario, sessoes) => new { Usuario = usuario, UltimaSessao = sessoes.OrderByDescending(s => s.Id).FirstOrDefault() }
        ).Where(sessao => sessao.Usuario.Id != 1 && (sessao.UltimaSessao != null && sessao.UltimaSessao.StatusSessao)).Select(sessao => sessao.Usuario).ToListAsync();
    }

    public async Task<IEnumerable<Usuario>> GetOfflineUsers()
    {
        return await _dbContext.Usuario.GroupJoin(
            _dbContext.Sessao,
            usuario => usuario.Id,
            sessao => sessao.IdUsuario,
            (usuario, sessoes) => new { Usuario = usuario, UltimaSessao = sessoes.OrderByDescending(s => s.Id).FirstOrDefault() }
        ).Where(sessao => sessao.Usuario.Id != 1 && (sessao.UltimaSessao == null || !sessao.UltimaSessao.StatusSessao)).Select(sessao => sessao.Usuario).ToListAsync();
    }

    public async Task<IEnumerable<Sessao>> GetOpenSessionByUser(int id)
    {
        return await _dbContext.Sessao.Where(sessao => sessao.StatusSessao && sessao.IdUsuario == id).ToListAsync();
    }

}
