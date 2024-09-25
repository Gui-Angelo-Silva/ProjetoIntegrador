using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class DocumentoProcessoService : IDocumentoProcessoService
{

    private readonly IDocumentoProcessoRepository _documentoProcessoRepository;
    private readonly IMapper _mapper;

    public DocumentoProcessoService(IDocumentoProcessoRepository documentoProcessoRepository, IMapper mapper)
    {
        _documentoProcessoRepository = documentoProcessoRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<DocumentoProcessoDTO>> GetAll()
    {
        var documentoProcessos = await _documentoProcessoRepository.GetAll();
        return _mapper.Map<IEnumerable<DocumentoProcessoDTO>>(documentoProcessos);
    }

    public async Task<IEnumerable<DocumentoProcessoDTO>> GetByProcess(Guid idProcesso)
    {
        var documentoProcessos = await _documentoProcessoRepository.GetByProcess(idProcesso);
        return _mapper.Map<IEnumerable<DocumentoProcessoDTO>>(documentoProcessos);
    }

    public async Task<DocumentoProcessoDTO> GetById(Guid id)
    {
        var documentoProcesso = await _documentoProcessoRepository.GetById(id);
        return _mapper.Map<DocumentoProcessoDTO>(documentoProcesso);
    }

    public async Task Create(DocumentoProcessoDTO documentoProcessoDTO)
    {
        var documentoProcesso = _mapper.Map<DocumentoProcesso>(documentoProcessoDTO);
        await _documentoProcessoRepository.Create(documentoProcesso);
        documentoProcessoDTO.Id = documentoProcesso.Id;
    }

    public async Task Update(DocumentoProcessoDTO documentoProcessoDTO)
    {
        var documentoProcesso = _mapper.Map<DocumentoProcesso>(documentoProcessoDTO);
        await _documentoProcessoRepository.Update(documentoProcesso);
    }

    public async Task Remove(Guid id)
    {
        await _documentoProcessoRepository.Delete(id);
    }

    public async Task<IEnumerable<DocumentoProcessoDTO>> GetDocumentProcessRelatedToTypeDocument(int IdTipoDocumento)
    {
        var documentoProcessos = await _documentoProcessoRepository.GetDocumentProcessRelatedToTypeDocument(IdTipoDocumento);
        return _mapper.Map<IEnumerable<DocumentoProcessoDTO>>(documentoProcessos);
    }

}
