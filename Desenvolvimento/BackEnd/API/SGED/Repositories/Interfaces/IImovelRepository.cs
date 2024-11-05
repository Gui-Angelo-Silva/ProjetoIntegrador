using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface IImovelRepository
	{
		Task<IEnumerable<ImovelModel>> GetAll();
        Task<IEnumerable<ImovelModel>> Search(string search);
        Task<ImovelModel> GetByProperty(string propertyName, string data);
        Task<ImovelModel> GetById(int id);
        Task<ImovelModel> Create(ImovelModel imovel);
		Task<ImovelModel> Update(ImovelModel imovel);
		Task<ImovelModel> Delete(int id);
	}
}
