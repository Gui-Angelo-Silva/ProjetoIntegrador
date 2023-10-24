using SGED.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IPessoaRepository
{
    Task<IEnumerable<Pessoa>> GetAll();
    Task<Pessoa> GetById(int id);
    Task<Pessoa> Create(Pessoa pessoa);
    Task<Pessoa> Update(Pessoa pessoa);
    Task<Pessoa> Delete(int id);
}
