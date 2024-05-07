using SGED.Objects.DTO.Entities;

namespace SGED.Services.Interfaces
{
    public interface IFiscalService
    {
        Task<IEnumerable<FiscalDTO>> GetAll();
        Task<FiscalDTO> GetById(int id);
        Task Create(FiscalDTO fiscalDTO);
        Task Update(FiscalDTO fiscalDTO);
        Task Remove(int id);
    }
}
