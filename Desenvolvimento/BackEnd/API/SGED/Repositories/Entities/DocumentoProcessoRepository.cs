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

    public async Task<IEnumerable<DocumentoProcesso>> GetByProcess(Guid idProcesso)
    {
        return await _dbContext.DocumentoProcesso.AsNoTracking().Where(dp => dp.IdProcesso == idProcesso).ToListAsync();
    }

    public async Task<DocumentoProcesso> GetById(Guid id)
	{
		return await _dbContext.DocumentoProcesso.AsNoTracking().FirstOrDefaultAsync(dp => dp.Id == id);
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

	public async Task<DocumentoProcesso> Delete(Guid id)
	{
		var DocumentoProcesso = await GetById(id);
		_dbContext.DocumentoProcesso.Remove(DocumentoProcesso);
		await _dbContext.SaveChangesAsync();
		return DocumentoProcesso;
	}

	public async Task<IEnumerable<DocumentoProcesso>> GetDocumentProcessRelatedToTypeDocument(int IdTipoDocumento)
	{
		return await _dbContext.DocumentoProcesso.Where(tde => tde.IdTipoDocumentoEtapa == IdTipoDocumento).AsNoTracking().ToListAsync();
	}


}
