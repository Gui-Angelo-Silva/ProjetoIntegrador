using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;
using SGED.Objects.Enums.Status;

namespace SGED.Repositories.Entities;
public class DocumentoProcessoRepository : IDocumentoProcessoRepository
{
    private readonly ITipoDocumentoRepository _tipoDocumentoRepository;
    private readonly ITipoDocumentoEtapaRepository _tipoDocumentoEtapaRepository;
    private readonly AppDBContext _dbContext;
    private readonly RemoveContext _remove;

    public DocumentoProcessoRepository(ITipoDocumentoRepository tipoDocumentoRepository, ITipoDocumentoEtapaRepository tipoDocumentoEtapaRepository, AppDBContext dbContext)
    {
        _tipoDocumentoRepository = tipoDocumentoRepository;
        _tipoDocumentoEtapaRepository = tipoDocumentoEtapaRepository;
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
        // Gera o código
        DocumentoProcesso.IdentificacaoDocumento = await GenerateCode(DocumentoProcesso);

        _dbContext.DocumentoProcesso.Add(DocumentoProcesso);
        await _dbContext.SaveChangesAsync();
        return DocumentoProcesso;
    }

    public async Task<DocumentoProcessoModel> Update(DocumentoProcessoModel DocumentoProcesso)
    {
        // Gera o código
        DocumentoProcesso.IdentificacaoDocumento = await GenerateCode(DocumentoProcesso);

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

    private async Task<DocumentoProcessoModel> GetLastByCode(string codigo)
    {
        return await _dbContext.DocumentoProcesso
            .AsNoTracking()
            .Where(dp => dp.IdentificacaoDocumento.StartsWith(codigo))
            .OrderByDescending(dp => dp.IdentificacaoDocumento)
            .FirstOrDefaultAsync();
    }

    public async Task<string> GenerateCode(DocumentoProcessoModel documento)
    {
        var tipoDocumentoEtapa = await _tipoDocumentoEtapaRepository.GetById(documento.IdTipoDocumentoEtapa);
        var tipoDocumento = await _tipoDocumentoRepository.GetById(tipoDocumentoEtapa.IdTipoDocumento);
        var codigo = string.Concat(tipoDocumento.NomeTipoDocumento
            .Split(' ')
            .Where(word => char.IsUpper(word[0]))
            .Select(word => word[0]));

        var documentoExistente = await GetLastByCode(codigo);

        if (documentoExistente == null)
        {
            documento.IdentificacaoDocumento = $"{codigo}-0001";
        }
        else
        {
            var slots = documentoExistente?.IdentificacaoDocumento
                .Split($"{codigo}-")?[1]
                .Split('.') ?? new string[] { "0000" };

            int slot = int.Parse(slots[^1]);
            if (slot >= 9999)
            {
                slots = slots.Append("0001").ToArray();
            }
            else
            {
                slots[^1] = (slot + 1).ToString("D4");
            }

            documento.IdentificacaoDocumento = $"{codigo}-{string.Join('.', slots)}";
        }

        return documento.IdentificacaoDocumento;
    }
}
