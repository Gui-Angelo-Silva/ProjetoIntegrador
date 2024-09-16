using SGED.DTO.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IDocumentoProcessoRepository
{
    Task<IEnumerable<DocumentoProcesso>> GetAll();
    Task<IEnumerable<DocumentoProcesso>> GetByProcess(Guid idProcesso);
    Task<DocumentoProcesso> GetById(Guid id);
    Task<DocumentoProcesso> Create(DocumentoProcesso DocumentoProcesso);
    Task<DocumentoProcesso> Update(DocumentoProcesso DocumentoProcesso);
    Task<DocumentoProcesso> Delete(Guid id);

    Task<IEnumerable<DocumentoProcesso>> GetDocumentProcessRelatedToTypeDocument(int IdTipoDocumento);
}
