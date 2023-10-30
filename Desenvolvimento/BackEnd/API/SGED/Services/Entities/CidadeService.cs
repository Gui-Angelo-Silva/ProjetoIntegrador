using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;
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

    public async Task<IEnumerable<CidadeEstadoDTO>> GetAll()
    {
        var cidades = await _cidadeRepository.GetAll();

        List<CidadeEstadoDTO> cidadesDTO = new List<CidadeEstadoDTO>();
        CidadeEstadoDTO cidadeDTO;

        foreach (var cidade in cidades)
        {
            cidadeDTO = new CidadeEstadoDTO();
            cidadeDTO = _mapper.Map<CidadeEstadoDTO>(cidade);
            cidadeDTO.EstadoDTO = _mapper.Map<EstadoDTO>(cidade.Estado);
            cidadesDTO.Add(cidadeDTO);
        }

        return _mapper.Map<IEnumerable<CidadeEstadoDTO>>(cidadesDTO);
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
