using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface IEtapaRepository
	{
		Task<IEnumerable<Etapa>> GetAll();
		Task<Etapa> GetById(int id);
		Task<Etapa> Create(Etapa etapa);
		Task<Etapa> Update(Etapa etapa);
		Task<Etapa> Delete(int id);
		Task<IEnumerable<Etapa>> GetStagesRelatedToTypeProcess(int idTipoProcesso);
	}
}
