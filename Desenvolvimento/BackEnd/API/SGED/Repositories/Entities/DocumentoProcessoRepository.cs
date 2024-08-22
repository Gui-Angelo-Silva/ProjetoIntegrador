using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities.StatusState;

namespace SGED.Repositories.Entities;
public class DocumentoProcessoRepository : IDocumentoProcessoRepository
{

	private readonly AppDBContext _dbContext;
	private readonly RemoveContext _remove;

	public DocumentoProcessoRepository(AppDBContext dbContext)
	{
		_dbContext = dbContext;
		_remove = new RemoveContext(dbContext);
	}

	public async Task<IEnumerable<DocumentoProcesso>> GetAll()
	{
		return await _dbContext.DocumentoProcesso.AsNoTracking().ToListAsync();
	}

	public async Task<DocumentoProcesso> GetById(int id)
	{
		return await _dbContext.DocumentoProcesso.AsNoTracking().FirstOrDefaultAsync(tde => tde.Id == id);
	}


	public async Task<DocumentoProcesso> Create(DocumentoProcesso DocumentoProcesso)
	{
		_dbContext.DocumentoProcesso.Add(DocumentoProcesso);
		await _dbContext.SaveChangesAsync();
		return DocumentoProcesso;
	}

	public async Task<DocumentoProcesso> Update(DocumentoProcesso DocumentoProcesso)
	{
		_dbContext.Entry(DocumentoProcesso).State = EntityState.Modified;
		await _dbContext.SaveChangesAsync();
		return DocumentoProcesso;
	}

	public async Task<DocumentoProcesso> Delete(int id)
	{
		var DocumentoProcesso = await GetById(id);
		_dbContext.DocumentoProcesso.Remove(DocumentoProcesso);
		await _dbContext.SaveChangesAsync();
		return DocumentoProcesso;
	}

	public async Task<IEnumerable<DocumentoProcesso>> GetTypeDocumentStagesRelatedToStage(int IdEtapa)
	{
		return await _dbContext.DocumentoProcesso.Where(tde => tde.IdEtapa == IdEtapa).AsNoTracking().ToListAsync();
	}

	public async Task<IEnumerable<TipoDocumento>> GetTypeDocumentsRelatedToStage(int IdEtapa)
	{
		var tipoDocumentoIdsRelacionados = await _dbContext.DocumentoProcesso.Where(tde => tde.IdEtapa == IdEtapa).AsNoTracking().Select(tde => tde.IdTipoDocumento).ToListAsync();
		return await _dbContext.TipoDocumento.Where(td => tipoDocumentoIdsRelacionados.Contains(td.Id)).AsNoTracking().ToListAsync();
	}


	public async Task<IEnumerable<TipoDocumento>> GetTypeDocumentsNoRelatedToStage(int IdEtapa)
	{
		var tipoDocumentoIdsRelacionados = await _dbContext.DocumentoProcesso.Where(tde => tde.IdEtapa == IdEtapa).AsNoTracking().Select(tde => tde.IdTipoDocumento).ToListAsync();
		return await _dbContext.TipoDocumento.Where(td => !tipoDocumentoIdsRelacionados.Contains(td.Id)).AsNoTracking().ToListAsync();
	}


}
