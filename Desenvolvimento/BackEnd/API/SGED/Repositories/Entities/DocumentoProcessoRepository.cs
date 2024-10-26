using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;
using SGED.Objects.Enums.Status;

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

	public async Task<IEnumerable<DocumentoProcessoModel>> GetAll()
	{
		return await _dbContext.DocumentoProcesso.AsNoTracking().ToListAsync();
	}

    public async Task<IEnumerable<DocumentoProcessoModel>> GetByStatus(int status)
    {
        // Convertendo o valor numérico para o enum
        StatusDocumentProcess statusEnum = (StatusDocumentProcess)status;

        return await _dbContext.DocumentoProcesso
            .AsNoTracking()
            .Where(dp => dp.Status == statusEnum) // Comparando com o enum
            .ToListAsync();
    }

    public async Task<IEnumerable<DocumentoProcessoModel>> GetByProcess(Guid idProcesso)
    {
        return await _dbContext.DocumentoProcesso.AsNoTracking().Where(dp => dp.IdProcesso == idProcesso).ToListAsync();
    }

    public async Task<DocumentoProcessoModel> GetById(Guid id)
	{
		return await _dbContext.DocumentoProcesso.AsNoTracking().FirstOrDefaultAsync(dp => dp.Id == id);
	}

	public async Task<DocumentoProcessoModel> Create(DocumentoProcessoModel DocumentoProcesso)
	{
		_dbContext.DocumentoProcesso.Add(DocumentoProcesso);
		await _dbContext.SaveChangesAsync();
		return DocumentoProcesso;
	}

	public async Task<DocumentoProcessoModel> Update(DocumentoProcessoModel DocumentoProcesso)
	{
		_dbContext.Entry(DocumentoProcesso).State = EntityState.Modified;
		await _dbContext.SaveChangesAsync();
		return DocumentoProcesso;
	}

	public async Task<DocumentoProcessoModel> Delete(Guid id)
	{
		var DocumentoProcesso = await GetById(id);
		_dbContext.DocumentoProcesso.Remove(DocumentoProcesso);
		await _dbContext.SaveChangesAsync();
		return DocumentoProcesso;
	}

	public async Task<IEnumerable<DocumentoProcessoModel>> GetDocumentProcessRelatedToTypeDocument(int IdTipoDocumento)
	{
		return await _dbContext.DocumentoProcesso.Where(tde => tde.IdTipoDocumentoEtapa == IdTipoDocumento).AsNoTracking().ToListAsync();
	}


}
