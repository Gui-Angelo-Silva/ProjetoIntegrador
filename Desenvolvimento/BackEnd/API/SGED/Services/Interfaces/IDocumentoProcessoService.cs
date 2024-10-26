using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface IDocumentoProcessoService
    {
        Task<IEnumerable<DocumentoProcessoDTO>> GetAll();
        Task<IEnumerable<DocumentoProcessoDTO>> GetByStatus(int status);
        Task<IEnumerable<DocumentoProcessoDTO>> GetByProcess(Guid idProcesso);
        Task<DocumentoProcessoDTO> GetById(Guid id);
        Task Create(DocumentoProcessoDTO DocumentoProcessoDTO);
        Task Update(DocumentoProcessoDTO DocumentoProcessoDTO);
        Task Remove(Guid id);

        Task<IEnumerable<DocumentoProcessoDTO>> GetDocumentProcessRelatedToTypeDocument(int IdTipoDocumento);
    }
}
