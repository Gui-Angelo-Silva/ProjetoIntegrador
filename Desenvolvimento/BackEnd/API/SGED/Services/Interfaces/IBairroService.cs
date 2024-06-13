using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IBairroService
    {
        Task<IEnumerable<BairroDTO>> GetAll();
        Task<IEnumerable<BairroDTO>> GetByCity(int idCidade);
        Task<BairroDTO> GetById(int id);
        Task Create(BairroDTO BairroDTO);
        Task Update(BairroDTO BairroDTO);
        Task Remove(int id);
    }
}
