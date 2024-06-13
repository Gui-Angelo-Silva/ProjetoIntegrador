using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class TipoProcessoService : ITipoProcessoService
{

    private readonly ITipoProcessoRepository _tipoProcessoRepository;
    private readonly IMapper _mapper;

    public TipoProcessoService(ITipoProcessoRepository tipoProcessoRepository, IMapper mapper)
    {
        _tipoProcessoRepository = tipoProcessoRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TipoProcessoDTO>> GetAll()
    {
        var tipoProcessos = await _tipoProcessoRepository.GetAll();
        return _mapper.Map<IEnumerable<TipoProcessoDTO>>(tipoProcessos);
    }

    public async Task<TipoProcessoDTO> GetById(int id)
    {
        var tipoProcesso = await _tipoProcessoRepository.GetById(id);
        return _mapper.Map<TipoProcessoDTO>(tipoProcesso);
    }

    public async Task Create(TipoProcessoDTO TipoProcessoDTO)
    {
        var tipoProcesso = _mapper.Map<TipoProcesso>(TipoProcessoDTO);
        await _tipoProcessoRepository.Create(tipoProcesso);
        TipoProcessoDTO.Id = tipoProcesso.Id;
    }

    public async Task Update(TipoProcessoDTO TipoProcessoDTO)
    {
        var tipoProcesso = _mapper.Map<TipoProcesso>(TipoProcessoDTO);
        await _tipoProcessoRepository.Update(tipoProcesso);
    }

    public async Task Remove(int id)
    {
        await _tipoProcessoRepository.Remove(id);
    }
}
