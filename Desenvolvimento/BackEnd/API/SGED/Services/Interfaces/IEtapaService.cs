using SGED.DTO.Entities;

namespace SGED.Services.Interfaces
{
	public interface IEtapaService
	{
		Task<IEnumerable<EtapaDTO>> GetAll();
		Task<EtapaDTO> GetById(int id);	
		Task Create(EtapaDTO etapaDTO);
		Task Update(EtapaDTO etapaDTO);
		Task Remove(int id);
	}
}
