using AutoMapper;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class FiscalService : IFiscalService
{

    private readonly IFiscalRepository _fiscalRepository;
    private readonly IMapper _mapper;

    public FiscalService(IFiscalRepository fiscalRepository, IMapper mapper)
    {
        _fiscalRepository = fiscalRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<FiscalDTO>> GetAll()
    {
        var fiscais = await _fiscalRepository.GetAll();
        return _mapper.Map<IEnumerable<FiscalDTO>>(fiscais);
    }

    public async Task<IEnumerable<FiscalDTO>> Search(string search)
    {
        var fiscais = await _fiscalRepository.Search(search);
        return _mapper.Map<IEnumerable<FiscalDTO>>(fiscais);
    }

    public async Task<FiscalDTO> GetById(int id)
    {
        var fiscal = await _fiscalRepository.GetById(id);
        return _mapper.Map<FiscalDTO>(fiscal);
    }

    public async Task Create(FiscalDTO fiscalDTO)
    {
        var fiscal = _mapper.Map<FiscalModel>(fiscalDTO);
        await _fiscalRepository.Create(fiscal);
        fiscalDTO.Id = fiscal.Id;
    }

    public async Task Update(FiscalDTO  fiscalDTO)
    {
        var fiscal = _mapper.Map<FiscalModel>(fiscalDTO);
        await _fiscalRepository.Update(fiscal);
    }

    public async Task Remove(int id)
    {
        await _fiscalRepository.Delete(id);
    }
}
