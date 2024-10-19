using AutoMapper;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class ProcessoService : IProcessoService
{

    private readonly IProcessoRepository _processoRepository;
    private readonly IMapper _mapper;

    public ProcessoService(IProcessoRepository processoRepository, IMapper mapper)
    {
        _processoRepository = processoRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProcessoDTO>> GetAll()
    {
        var processos = await _processoRepository.GetAll();
        return _mapper.Map<IEnumerable<ProcessoDTO>>(processos);
    }

    public async Task<ProcessoDTO> GetById(Guid id)
    {
        var processo = await _processoRepository.GetById(id);
        return _mapper.Map<ProcessoDTO>(processo);
    }

    public async Task Create(ProcessoDTO processoDTO)
    {
        var processo = _mapper.Map<ProcessoModel>(processoDTO);
        await _processoRepository.Create(processo);
        processoDTO.Id = processo.Id;
    }

    public async Task Update(ProcessoDTO processoDTO)
    {
        var processo = _mapper.Map<ProcessoModel>(processoDTO);
        await _processoRepository.Update(processo);
    }

    public async Task Remove(Guid id)
    {
        await _processoRepository.Delete(id);
    }
}
