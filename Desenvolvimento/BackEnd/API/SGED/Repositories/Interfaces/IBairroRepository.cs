using SGED.DTO.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IBairroRepository
{
    Task<IEnumerable<Bairro>> GetAll();
    Task<IEnumerable<Bairro>> GetByCity(int idCidade);
    Task<Bairro> GetById(int id);
    Task<Bairro> Create(Bairro Bairro);
    Task<Bairro> Update(Bairro Bairro);
    Task<Bairro> Delete(int id);
}
