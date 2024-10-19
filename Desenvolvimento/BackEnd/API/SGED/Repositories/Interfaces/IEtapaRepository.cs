using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface IEtapaRepository
	{
		Task<IEnumerable<EtapaModel>> GetAll();
		Task<EtapaModel> GetById(int id);
		Task<EtapaModel> Create(EtapaModel etapa);
		Task<EtapaModel> Update(EtapaModel etapa);
		Task<EtapaModel> Delete(int id);
		Task<IEnumerable<EtapaModel>> GetStagesRelatedToTypeProcess(int idTipoProcesso);
	}
}
