using SGED.Models.Entities;
using SGED.DTO.Entities;

namespace SGED.Repositories.Interfaces;
public interface IBairroRepository
{
    Task<IEnumerable<Bairro>> GetAll();
    Task<Bairro> GetById(int id);
    Task<Bairro> Create(Bairro Bairro);
    Task<Bairro> Update(Bairro Bairro);
    Task<Bairro> Delete(int id);
}
