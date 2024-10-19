using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class SessaoRepository : ISessaoRepository
{

    private readonly AppDBContext _dbContext;

    public SessaoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<SessaoModel>> GetAll()
    {
        return await _dbContext.Sessao.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<IEnumerable<SessaoModel>>> GetAllSessionsGroupedByUser()
    {
        return await _dbContext.Sessao.GroupBy(s => s.IdUsuario).Select(group => group.OrderBy(s => s.Id)).AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<SessaoModel>> GetOpenSessions()
    {
        return await _dbContext.Sessao.Where(s => s.StatusSessao).AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<SessaoModel>> GetCloseSessions()
    {
        return await _dbContext.Sessao.Where(s => !s.StatusSessao).AsNoTracking().ToListAsync();
    }

    public async Task<SessaoModel> GetLastSession(int idUsuario)
    {
        return await _dbContext.Sessao.Where(s => s.IdUsuario == idUsuario).OrderByDescending(s => s.Id).AsNoTracking().FirstOrDefaultAsync();
    }

    public async Task<SessaoModel> GetById(Guid id)
    {
        return await _dbContext.Sessao.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<SessaoModel> GetByToken(string token)
    {
        return await _dbContext.Sessao.AsNoTracking().FirstOrDefaultAsync(s => s.TokenSessao == token);
    }

    public async Task<UsuarioModel> GetUser(string token)
    {
        var sessao = await _dbContext.Sessao.Where(s => s.TokenSessao == token).Include(s => s.Usuario).ThenInclude(u => u.TipoUsuario).AsNoTracking().FirstOrDefaultAsync();

        return sessao?.Usuario;
    }

    public async Task<SessaoModel> Create(SessaoModel sessao)
    {
        _dbContext.Sessao.Add(sessao);
        await _dbContext.SaveChangesAsync();
        return sessao;
    }

    public async Task<SessaoModel> Update(SessaoModel sessao)
    {
        _dbContext.ChangeTracker.Clear();
        _dbContext.Entry(sessao).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return sessao;
    }

    public async Task<SessaoModel> Delete(Guid id)
    {
        var sessao = await GetById(id);
        _dbContext.Sessao.Remove(sessao);
        await _dbContext.SaveChangesAsync();
        return sessao;
    }

    public async Task<IEnumerable<UsuarioModel>> GetOnlineUsers()
    {
        return await _dbContext.Usuario.GroupJoin(
            _dbContext.Sessao,
            u => u.Id,
            s => s.IdUsuario,
            (u, sessoes) => new { Usuario = u, UltimaSessao = sessoes.OrderByDescending(s => s.Id).FirstOrDefault() }
        ).Where(s => /*s.Usuario.Id != 1 &&*/ (s.UltimaSessao != null && s.UltimaSessao.StatusSessao)).AsNoTracking().Select(s => s.Usuario).ToListAsync();
    }

    public async Task<IEnumerable<UsuarioModel>> GetOfflineUsers()
    {
        return await _dbContext.Usuario.GroupJoin(
            _dbContext.Sessao,
            u => u.Id,
            s => s.IdUsuario,
            (u, sessoes) => new { Usuario = u, UltimaSessao = sessoes.OrderByDescending(s => s.Id).FirstOrDefault() }
        ).Where(s => /*s.Usuario.Id != 1 &&*/ (s.UltimaSessao == null || !s.UltimaSessao.StatusSessao)).AsNoTracking().Select(s => s.Usuario).ToListAsync();
    }

    public async Task<IEnumerable<SessaoModel>> GetOpenSessionByUser(int id)
    {
        return await _dbContext.Sessao.Where(s => s.StatusSessao && s.IdUsuario == id).AsNoTracking().ToListAsync();
    }

}
