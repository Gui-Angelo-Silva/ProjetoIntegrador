using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface IImovelRepository
	{
		Task<IEnumerable<Imovel>> GetAll();
		Task<Imovel> GetById(int id);
		Task<Imovel> Create(Imovel imovel);
		Task<Imovel> Update(Imovel imovel);
		Task<Imovel> Delete(int id);
	}
}
