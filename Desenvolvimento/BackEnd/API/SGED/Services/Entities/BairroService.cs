using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class BairroService : IBairroService
{

    private readonly IBairroRepository _bairroRepository;
    private readonly IMapper _mapper;

    public BairroService(IBairroRepository bairroRepository, IMapper mapper)
    {
        _bairroRepository = bairroRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<BairroDTO>> GetAll()
    {
        var bairros = await _bairroRepository.GetAll();
        return _mapper.Map<IEnumerable<BairroDTO>>(bairros);
    }

    public async Task<IEnumerable<BairroDTO>> GetByCity(int idCidade)
    {
        var bairros = await _bairroRepository.GetByCity(idCidade);
        return _mapper.Map<IEnumerable<BairroDTO>>(bairros);
    }

    public async Task<BairroDTO> GetById(int id)
    {
        var bairro = await _bairroRepository.GetById(id);
        return _mapper.Map<BairroDTO>(bairro);
    }

    public async Task Create(BairroDTO bairroDTO)
    {
        var bairro = _mapper.Map<Bairro>(bairroDTO);
        await _bairroRepository.Create(bairro);
        bairroDTO.Id = bairro.Id;
    }

    public async Task Update(BairroDTO bairroDTO)
    {
        var bairro = _mapper.Map<Bairro>(bairroDTO);
        await _bairroRepository.Update(bairro);
    }

    public async Task Remove(int id)
    {
        await _bairroRepository.Delete(id);
    }
}
