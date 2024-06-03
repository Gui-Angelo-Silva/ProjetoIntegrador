using SGED.DTO.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ICidadeRepository
{
    Task<IEnumerable<Cidade>> GetAll();
    Task<IEnumerable<Cidade>> GetByState(int idEstado);
    Task<Cidade> GetById(int id);
    Task<Cidade> Create(Cidade cidade);
    Task<Cidade> Update(Cidade cidade);
    Task<Cidade> Delete(int id);
}
