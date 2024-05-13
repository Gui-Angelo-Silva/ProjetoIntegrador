using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class TipoDocumentoEtapaRepository : ITipoDocumentoEtapaRepository
{

    private readonly AppDBContext _dbContext;
    private readonly RemoveContext _remove;

    public TipoDocumentoEtapaRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
        _remove = new RemoveContext(dbContext);
    }

    public async Task<IEnumerable<TipoDocumentoEtapa>> GetAll()
    {
        return await _dbContext.TipoDocumentoEtapa.Include(objeto => objeto.Etapa).Include(objeto => objeto.TipoDocumento).AsNoTracking().ToListAsync();
    }

    public async Task<TipoDocumentoEtapa> GetById(int id)
    {
        return await _dbContext.TipoDocumentoEtapa.Include(objeto => objeto.Etapa).Include(objeto => objeto.TipoDocumento).AsNoTracking().FirstOrDefaultAsync(objeto => objeto.Id == id);
    }


    public async Task<TipoDocumentoEtapa> Create(TipoDocumentoEtapa TipoDocumentoEtapa)
    {
        _dbContext.TipoDocumentoEtapa.Add(TipoDocumentoEtapa);
        await _dbContext.SaveChangesAsync();
        return TipoDocumentoEtapa;
    }

    public async Task<TipoDocumentoEtapa> Update(TipoDocumentoEtapa TipoDocumentoEtapa)
    {
        _dbContext.Entry(TipoDocumentoEtapa).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return TipoDocumentoEtapa;
    }

    public async Task<TipoDocumentoEtapa> Delete(int id)
    {
        var TipoDocumentoEtapa = await GetById(id);
        _dbContext.TipoDocumentoEtapa.Remove(TipoDocumentoEtapa);
        await _dbContext.SaveChangesAsync();
        return TipoDocumentoEtapa;
    }

    public async Task<IEnumerable<TipoDocumentoEtapa>> GetTypeDocumentStagesRelatedToStage(int IdEtapa)
    {
        return await _dbContext.TipoDocumentoEtapa.Where(td => td.IdEtapa == IdEtapa).AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<TipoDocumento>> GetTypeDocumentsRelatedToStage(int IdEtapa)
    {
        var tipoDocumentoIdsRelacionados = await _dbContext.TipoDocumentoEtapa.Where(td => td.IdEtapa == IdEtapa).AsNoTracking().Select(td => td.IdTipoDocumento).ToListAsync();
        return await _dbContext.TipoDocumento.Where(td => tipoDocumentoIdsRelacionados.Contains(td.Id)).AsNoTracking().ToListAsync();
    }


    public async Task<IEnumerable<TipoDocumento>> GetTypeDocumentsNoRelatedToStage(int IdEtapa)
    {
        var tipoDocumentoIdsRelacionados = await _dbContext.TipoDocumentoEtapa.Where(td => td.IdEtapa == IdEtapa).AsNoTracking().Select(td => td.IdTipoDocumento).ToListAsync();
        return await _dbContext.TipoDocumento.Where(td => !tipoDocumentoIdsRelacionados.Contains(td.Id)).AsNoTracking().ToListAsync();
    }


}
