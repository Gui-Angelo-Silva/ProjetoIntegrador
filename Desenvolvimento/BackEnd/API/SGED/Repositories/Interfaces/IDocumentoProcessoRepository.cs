using SGED.DTO.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IDocumentoProcessoRepository
{
    Task<IEnumerable<DocumentoProcesso>> GetAll();
    Task<DocumentoProcesso> GetById(int id);
    Task<DocumentoProcesso> Create(DocumentoProcesso DocumentoProcesso);
    Task<DocumentoProcesso> Update(DocumentoProcesso DocumentoProcesso);
    Task<DocumentoProcesso> Delete(int id);

    Task<IEnumerable<DocumentoProcesso>> GetDocumentProcessRelatedToTypeDocument(int IdTipoDocumento);
}
