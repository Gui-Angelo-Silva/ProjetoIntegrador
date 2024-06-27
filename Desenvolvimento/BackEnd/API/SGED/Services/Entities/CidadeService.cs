using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class CidadeService : ICidadeService
{

    private readonly ICidadeRepository _cidadeRepository;
    private readonly IMapper _mapper;

    public CidadeService(ICidadeRepository cidadeRepository, IMapper mapper)
    {
        _cidadeRepository = cidadeRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CidadeDTO>> GetAll()
    {
        var cidades = await _cidadeRepository.GetAll();
        return _mapper.Map<IEnumerable<CidadeDTO>>(cidades);
    }

    public async Task<IEnumerable<CidadeDTO>> GetByState(int idEstado)
    {
        var cidades = await _cidadeRepository.GetByState(idEstado);
        return _mapper.Map<IEnumerable<CidadeDTO>>(cidades);
    }

    public async Task<CidadeDTO> GetById(int id)
    {
        var cidade = await _cidadeRepository.GetById(id);
        return _mapper.Map<CidadeDTO>(cidade);
    }

    public async Task Create(CidadeDTO cidadeDTO)
    {
        var cidade = _mapper.Map<Cidade>(cidadeDTO);
        await _cidadeRepository.Create(cidade);
        cidadeDTO.Id = cidade.Id;
    }

    public async Task Update(CidadeDTO cidadeDTO)
    {
        var cidade = _mapper.Map<Cidade>(cidadeDTO);
        await _cidadeRepository.Update(cidade);
    }

    public async Task Remove(int id)
    {
        await _cidadeRepository.Delete(id);
    }
}
