using SGED.Models.Entities;
using SGED.DTO.Entities;

namespace SGED.Repositories.Interfaces;
public interface ITipoDocumentoEtapaRepository
{
    Task<IEnumerable<TipoDocumentoEtapa>> GetAll();
    Task<TipoDocumentoEtapa> GetById(int id);
    Task<TipoDocumentoEtapa> Create(TipoDocumentoEtapa TipoDocumentoEtapa);
    Task<TipoDocumentoEtapa> Update(TipoDocumentoEtapa TipoDocumentoEtapa);
    Task<TipoDocumentoEtapa> Delete(int id);
}
