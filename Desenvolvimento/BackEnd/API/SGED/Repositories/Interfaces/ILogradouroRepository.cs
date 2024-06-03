using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces
{
    public interface ILogradouroRepository
	{
		Task<IEnumerable<Logradouro>> GetAll();
        Task<IEnumerable<Logradouro>> GetByNeighbourhood(int idBairro);
        Task<Logradouro> GetById(int id);
		Task<Logradouro> Create(Logradouro logradouro);
		Task<Logradouro> Update(Logradouro logradouro);
		Task<Logradouro> Delete(int id);
	}
}
