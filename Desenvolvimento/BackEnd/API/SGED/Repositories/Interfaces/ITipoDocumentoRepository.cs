using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;

public interface ITipoDocumentoRepository
{
	Task<IEnumerable<TipoDocumento>> GetAll();
	Task<TipoDocumento> GetById(int id);
	Task<TipoDocumento> Create(TipoDocumento TipoDocumento);
	Task<TipoDocumento> Update(TipoDocumento TipoDocumento);
	Task<TipoDocumento> Delete(int id);
}

