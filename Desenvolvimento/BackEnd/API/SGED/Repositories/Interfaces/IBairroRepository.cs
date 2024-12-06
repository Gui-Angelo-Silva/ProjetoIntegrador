using SGED.DTOs.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IBairroRepository
{
    Task<IEnumerable<BairroModel>> GetAll();
    Task<IEnumerable<BairroModel>> GetByCity(int idCidade);
    Task<BairroModel> GetById(int id);
    Task<BairroModel> Create(BairroModel bairro);
    Task<BairroModel> Update(BairroModel bairro);
    Task<BairroModel> Delete(int id);
}
