using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities;

namespace SGED.Repositories.Entities;
public class TipoProcessoRepository : ITipoProcessoRepository
{

    private readonly AppDBContext _dbContext;

    public TipoProcessoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<TipoProcessoModel>> GetAll()
    {
        return await _dbContext.TipoProcesso.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<TipoProcessoModel>> Search(string search)
    {
        if (string.IsNullOrWhiteSpace(search))
        {
            return new List<TipoProcessoModel>();
        }

        // Carregar todos os tipo processos do banco de dados
        var tipoProcessos = await _dbContext.TipoProcesso.AsNoTracking().ToListAsync();

        // Normaliza e converte o termo de pesquisa para lowercase, removendo acentuação
        string normalizedSearch = Operator.RemoveAccents(search.ToLower());

        // Filtrar os tipo processos no lado do cliente
        return tipoProcessos.Where(e => e.NomeTipoProcesso != null &&
            Operator.RemoveAccents(e.NomeTipoProcesso.ToLower()).Contains(normalizedSearch))
            .ToList();
    }

    public async Task<TipoProcessoModel> GetById(int id)
    {
        return await _dbContext.TipoProcesso.AsNoTracking().FirstOrDefaultAsync(tp => tp.Id == id);
    }

    public async Task<TipoProcessoModel> Create(TipoProcessoModel tipoProcesso)
    {
        _dbContext.TipoProcesso.Add(tipoProcesso);
        await _dbContext.SaveChangesAsync();
        return tipoProcesso;
    }

    public async Task<TipoProcessoModel> Update(TipoProcessoModel tipoProcesso)
    {
        _dbContext.Entry(tipoProcesso).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return tipoProcesso;
    }

    public async Task<TipoProcessoModel> Remove(int id)
    {
        var tipoProcesso = await GetById(id);
        if (tipoProcesso != null)
        {
            _dbContext.TipoProcesso.Remove(tipoProcesso);
            await _dbContext.SaveChangesAsync();
        }
        return tipoProcesso;
    }
}
