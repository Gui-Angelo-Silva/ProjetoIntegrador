using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IDocumentoProcessoService
    {
        Task<IEnumerable<DocumentoProcessoDTO>> GetAll();
        Task<DocumentoProcessoDTO> GetById(int id);
        Task Create(DocumentoProcessoDTO DocumentoProcessoDTO);
        Task Update(DocumentoProcessoDTO DocumentoProcessoDTO);
        Task Remove(int id);

        Task<IEnumerable<DocumentoProcessoDTO>> GetDocumentProcessRelatedToTypeDocument(int IdTipoDocumento);
    }
}
