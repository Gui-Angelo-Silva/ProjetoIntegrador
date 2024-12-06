using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface ILogradouroRepository
	{
		Task<IEnumerable<LogradouroModel>> GetAll();
        Task<IEnumerable<LogradouroModel>> GetByNeighbourhood(int idBairro);
        Task<LogradouroModel> GetById(int id);
		Task<LogradouroModel> GetByCEP(string cep);
		Task<LogradouroModel> Create(LogradouroModel logradouro);
		Task<LogradouroModel> Update(LogradouroModel logradouro);
		Task<LogradouroModel> Delete(int id);
    }
}
