using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;

public interface ITipoDocumentoRepository
{
	Task<IEnumerable<TipoDocumentoModel>> GetAll();
	Task<TipoDocumentoModel> GetById(int id);
	Task<TipoDocumentoModel> Create(TipoDocumentoModel TipoDocumento);
	Task<TipoDocumentoModel> Update(TipoDocumentoModel TipoDocumento);
	Task<TipoDocumentoModel> Delete(int id);
}

