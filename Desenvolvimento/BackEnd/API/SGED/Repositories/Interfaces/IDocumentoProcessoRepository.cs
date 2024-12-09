using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IDocumentoProcessoRepository
{
    Task<IEnumerable<DocumentoProcessoModel>> GetAll();
    Task<IEnumerable<DocumentoProcessoModel>> GetByStatus(int status);
    Task<IEnumerable<DocumentoProcessoModel>> GetByProcess(Guid idProcesso);
    Task<DocumentoProcessoModel> GetById(Guid id);
    Task<DocumentoProcessoModel> Create(DocumentoProcessoModel DocumentoProcesso);
    Task<DocumentoProcessoModel> Update(DocumentoProcessoModel DocumentoProcesso);
    Task<DocumentoProcessoModel> Delete(Guid id);

    Task<IEnumerable<DocumentoProcessoModel>> GetDocumentProcessRelatedToTypeDocument(int IdTipoDocumento);
}
