using AutoMapper;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class AuditoriaService : IAuditoriaService
{

    private readonly IAuditoriaRepository _auditoriaRepository;
    private readonly IMapper _mapper;

    public AuditoriaService(IAuditoriaRepository auditoriaRepository, IMapper mapper)
    {
        _auditoriaRepository = auditoriaRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AuditoriaDTO>> GetAll()
    {
        var auditorias = await _auditoriaRepository.GetAll();
        return _mapper.Map<IEnumerable<AuditoriaDTO>>(auditorias);
    }

    public async Task<IEnumerable<AuditoriaDTO>> GetBySession(Guid idSessao)
    {
        var auditorias = await _auditoriaRepository.GetBySession(idSessao);
        return _mapper.Map<IEnumerable<AuditoriaDTO>>(auditorias);
    }

    public async Task<AuditoriaDTO> GetById(Guid id)
    {
        var auditoria = await _auditoriaRepository.GetById(id);
        return _mapper.Map<AuditoriaDTO>(auditoria);
    }

    public async Task Create(AuditoriaDTO auditoriaDTO)
    {
        var auditoria = _mapper.Map<AuditoriaModel>(auditoriaDTO);
        await _auditoriaRepository.Create(auditoria);
        auditoriaDTO.Id = auditoria.Id;
    }

    public async Task Update(AuditoriaDTO auditoriaDTO)
    {
        var auditoria = _mapper.Map<AuditoriaModel>(auditoriaDTO);
        await _auditoriaRepository.Update(auditoria);
    }

    public async Task Remove(Guid id)
    {
        await _auditoriaRepository.Delete(id);
    }
}
