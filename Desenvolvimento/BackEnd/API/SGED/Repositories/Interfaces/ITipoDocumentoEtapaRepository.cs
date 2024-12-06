using SGED.DTOs.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ITipoDocumentoEtapaRepository
{
    Task<IEnumerable<TipoDocumentoEtapaModel>> GetAll();
    Task<TipoDocumentoEtapaModel> GetById(int id);
    Task<TipoDocumentoEtapaModel> Create(TipoDocumentoEtapaModel TipoDocumentoEtapa);
    Task<TipoDocumentoEtapaModel> Update(TipoDocumentoEtapaModel TipoDocumentoEtapa);
    Task<TipoDocumentoEtapaModel> Delete(int id);

    Task<IEnumerable<TipoDocumentoEtapaModel>> GetTypeDocumentStagesRelatedToStage(int IdEtapa);
    Task<IEnumerable<TipoDocumentoModel>> GetTypeDocumentsRelatedToStage(int IdEtapa);
    Task<IEnumerable<TipoDocumentoModel>> GetTypeDocumentsNoRelatedToStage(int IdEtapa);
}
