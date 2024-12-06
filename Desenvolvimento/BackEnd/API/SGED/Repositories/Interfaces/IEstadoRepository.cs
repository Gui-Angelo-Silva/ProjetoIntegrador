using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Interfaces;
public interface IEstadoRepository
{
    Task<IEnumerable<EstadoModel>> GetAll();
    Task<IEnumerable<EstadoModel>> Search(string search);
    Task<IEnumerable<EstadoModel>> GetByName(string nome);
    Task<EstadoModel> GetById(int id);
    Task<EstadoModel> Create(EstadoModel estado);
    Task<EstadoModel> Update(EstadoModel estado);
    Task<EstadoModel> Delete(int id);
}