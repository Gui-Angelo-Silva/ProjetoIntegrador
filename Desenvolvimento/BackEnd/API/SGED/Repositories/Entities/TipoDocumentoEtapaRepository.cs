using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities.StatusState;

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

    public async Task<IEnumerable<TipoDocumentoEtapaModel>> GetAll()
    {
        return await _dbContext.TipoDocumentoEtapa.AsNoTracking().ToListAsync();
    }

    public async Task<TipoDocumentoEtapaModel> GetById(int id)
    {
        return await _dbContext.TipoDocumentoEtapa.AsNoTracking().FirstOrDefaultAsync(tde => tde.Id == id);
    }


    public async Task<TipoDocumentoEtapaModel> Create(TipoDocumentoEtapaModel TipoDocumentoEtapa)
    {
        _dbContext.TipoDocumentoEtapa.Add(TipoDocumentoEtapa);
        await _dbContext.SaveChangesAsync();
        return TipoDocumentoEtapa;
    }

    public async Task<TipoDocumentoEtapaModel> Update(TipoDocumentoEtapaModel TipoDocumentoEtapa)
    {
        _dbContext.Entry(TipoDocumentoEtapa).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return TipoDocumentoEtapa;
    }

    public async Task<TipoDocumentoEtapaModel> Delete(int id)
    {
        var TipoDocumentoEtapa = await GetById(id);
        _dbContext.TipoDocumentoEtapa.Remove(TipoDocumentoEtapa);
        await _dbContext.SaveChangesAsync();
        return TipoDocumentoEtapa;
    }

    public async Task<IEnumerable<TipoDocumentoEtapaModel>> GetTypeDocumentStagesRelatedToStage(int IdEtapa)
    {
        return await _dbContext.TipoDocumentoEtapa.Where(tde => tde.IdEtapa == IdEtapa).AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<TipoDocumentoModel>> GetTypeDocumentsRelatedToStage(int IdEtapa)
    {
        var tipoDocumentoIdsRelacionados = await _dbContext.TipoDocumentoEtapa.Where(tde => tde.IdEtapa == IdEtapa).AsNoTracking().Select(tde => tde.IdTipoDocumento).ToListAsync();
        return await _dbContext.TipoDocumento.Where(td => tipoDocumentoIdsRelacionados.Contains(td.Id)).AsNoTracking().ToListAsync();
    }


    public async Task<IEnumerable<TipoDocumentoModel>> GetTypeDocumentsNoRelatedToStage(int IdEtapa)
    {
        var tipoDocumentoIdsRelacionados = await _dbContext.TipoDocumentoEtapa.Where(tde => tde.IdEtapa == IdEtapa).AsNoTracking().Select(tde => tde.IdTipoDocumento).ToListAsync();
        return await _dbContext.TipoDocumento.Where(td => !tipoDocumentoIdsRelacionados.Contains(td.Id)).AsNoTracking().ToListAsync();
    }


}
