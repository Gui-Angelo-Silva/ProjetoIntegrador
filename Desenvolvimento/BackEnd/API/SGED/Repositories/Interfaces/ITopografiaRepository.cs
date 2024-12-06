using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface ITopografiaRepository
{
    Task<IEnumerable<TopografiaModel>> GetAll();
    Task<TopografiaModel> GetById(int id);
    Task<TopografiaModel> Create(TopografiaModel topografia);
    Task<TopografiaModel> Update(TopografiaModel topografia);
    Task<TopografiaModel> Delete(int id);
}
