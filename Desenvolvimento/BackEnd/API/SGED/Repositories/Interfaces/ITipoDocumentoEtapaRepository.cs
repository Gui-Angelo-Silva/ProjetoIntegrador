using SGED.DTO.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ITipoDocumentoEtapaRepository
{
    Task<IEnumerable<TipoDocumentoEtapa>> GetAll();
    Task<TipoDocumentoEtapa> GetById(int id);
    Task<TipoDocumentoEtapa> Create(TipoDocumentoEtapa TipoDocumentoEtapa);
    Task<TipoDocumentoEtapa> Update(TipoDocumentoEtapa TipoDocumentoEtapa);
    Task<TipoDocumentoEtapa> Delete(int id);

    Task<IEnumerable<TipoDocumentoEtapa>> GetTypeDocumentStagesRelatedToStage(int IdEtapa);
    Task<IEnumerable<TipoDocumento>> GetTypeDocumentsRelatedToStage(int IdEtapa);
    Task<IEnumerable<TipoDocumento>> GetTypeDocumentsNoRelatedToStage(int IdEtapa);
}
