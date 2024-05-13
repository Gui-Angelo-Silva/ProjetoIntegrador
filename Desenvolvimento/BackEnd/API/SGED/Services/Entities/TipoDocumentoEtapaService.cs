using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class TipoDocumentoEtapaService : ITipoDocumentoEtapaService
{

    private readonly ITipoDocumentoEtapaRepository _tipoDocumentoEtapaRepository;
    private readonly IMapper _mapper;

    public TipoDocumentoEtapaService(ITipoDocumentoEtapaRepository tipoDocumentoEtapaRepository, IMapper mapper)
    {
        _tipoDocumentoEtapaRepository = tipoDocumentoEtapaRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<TipoDocumentoEtapaDTO>> GetAll()
    {
        var tipoDocumentoEtapas = await _tipoDocumentoEtapaRepository.GetAll();
        return _mapper.Map<IEnumerable<TipoDocumentoEtapaDTO>>(tipoDocumentoEtapas);
    }

    public async Task<TipoDocumentoEtapaDTO> GetById(int id)
    {
        var tipoDocumentoEtapa = await _tipoDocumentoEtapaRepository.GetById(id);
        return _mapper.Map<TipoDocumentoEtapaDTO>(tipoDocumentoEtapa);
    }

    public async Task Create(TipoDocumentoEtapaDTO tipoDocumentoEtapaDTO)
    {
        var tipoDocumentoEtapa = _mapper.Map<TipoDocumentoEtapa>(tipoDocumentoEtapaDTO);
        await _tipoDocumentoEtapaRepository.Create(tipoDocumentoEtapa);
        tipoDocumentoEtapaDTO.Id = tipoDocumentoEtapa.Id;
    }

    public async Task Update(TipoDocumentoEtapaDTO tipoDocumentoEtapaDTO)
    {
        var tipoDocumentoEtapa = _mapper.Map<TipoDocumentoEtapa>(tipoDocumentoEtapaDTO);
        await _tipoDocumentoEtapaRepository.Update(tipoDocumentoEtapa);
    }

    public async Task Remove(int id)
    {
        await _tipoDocumentoEtapaRepository.Delete(id);
    }

    public async Task<IEnumerable<TipoDocumentoEtapaDTO>> GetTypeDocumentStagesRelatedToStage(int IdEtapa)
    {
        var tipoDocumentoEtapas = await _tipoDocumentoEtapaRepository.GetTypeDocumentStagesRelatedToStage(IdEtapa);
        return _mapper.Map<IEnumerable<TipoDocumentoEtapaDTO>>(tipoDocumentoEtapas);
    }

    public async Task<IEnumerable<TipoDocumentoDTO>> GetTypeDocumentsRelatedToStage(int IdEtapa)
    {
        var tipoDocumentos = await _tipoDocumentoEtapaRepository.GetTypeDocumentsRelatedToStage(IdEtapa);
        return _mapper.Map<IEnumerable<TipoDocumentoDTO>>(tipoDocumentos);
    }

    public async Task<IEnumerable<TipoDocumentoDTO>> GetTypeDocumentsNoRelatedToStage(int IdEtapa)
    {
        var tipoDocumentos = await _tipoDocumentoEtapaRepository.GetTypeDocumentsNoRelatedToStage(IdEtapa);
        return _mapper.Map<IEnumerable<TipoDocumentoDTO>>(tipoDocumentos);
    }

}
