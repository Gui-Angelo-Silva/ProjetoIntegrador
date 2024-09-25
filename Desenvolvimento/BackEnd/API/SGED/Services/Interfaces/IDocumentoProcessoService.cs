using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IDocumentoProcessoService
    {
        Task<IEnumerable<DocumentoProcessoDTO>> GetAll();
        Task<IEnumerable<DocumentoProcessoDTO>> GetByProcess(Guid idProcesso);
        Task<DocumentoProcessoDTO> GetById(Guid id);
        Task Create(DocumentoProcessoDTO DocumentoProcessoDTO);
        Task Update(DocumentoProcessoDTO DocumentoProcessoDTO);
        Task Remove(Guid id);

        Task<IEnumerable<DocumentoProcessoDTO>> GetDocumentProcessRelatedToTypeDocument(int IdTipoDocumento);
    }
}
