using SGED.DTOs.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ICidadeRepository
{
    Task<IEnumerable<CidadeModel>> GetAll();
    Task<IEnumerable<CidadeModel>> GetByState(int idEstado);
    Task<CidadeModel> GetById(int id);
    Task<CidadeModel> Create(CidadeModel cidade);
    Task<CidadeModel> Update(CidadeModel cidade);
    Task<CidadeModel> Delete(int id);
}
