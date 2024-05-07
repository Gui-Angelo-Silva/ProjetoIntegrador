using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces;

public interface ITipoDocumentoService
{
	Task<IEnumerable<TipoDocumentoDTO>> GetAll();
	Task<TipoDocumentoDTO> GetById(int id);
	Task Create(TipoDocumentoDTO TipoDocumentoDTO);
	Task Update(TipoDocumentoDTO TipoDocumentoDTO);
	Task Remove(int id);
}

