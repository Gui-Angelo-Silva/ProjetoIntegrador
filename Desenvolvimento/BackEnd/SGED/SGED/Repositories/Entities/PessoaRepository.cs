using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SGED.Repositories.Entities;
public class PessoaRepository : IPessoaRepository
{
    public Task<Pessoa> Create(Pessoa pessoa)
    {
        throw new NotImplementedException();
    }

    public Task<Pessoa> Delete(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<Pessoa>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<Pessoa> GetById(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Pessoa> Update(Pessoa pessoa)
    {
        throw new NotImplementedException();
    }
}
