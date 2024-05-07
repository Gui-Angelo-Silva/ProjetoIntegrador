using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class EngenheiroService : IEngenheiroService
{

    private readonly IEngenheiroRepository _engenheiroRepository;
    private readonly IMapper _mapper;

    public EngenheiroService(IEngenheiroRepository engenheiroRepository, IMapper mapper)
    {
        _engenheiroRepository = engenheiroRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<EngenheiroDTO>> GetAll()
    {
        var engenheiros = await _engenheiroRepository.GetAll();
        return _mapper.Map<IEnumerable<EngenheiroDTO>>(engenheiros);
    }

    public async Task<EngenheiroDTO> GetById(int id)
    {
        var engenheiro = await _engenheiroRepository.GetById(id);
        return _mapper.Map<EngenheiroDTO>(engenheiro);
    }

    public async Task Create(EngenheiroDTO engenheiroDTO)
    {
        var engenheiro = _mapper.Map<Engenheiro>(engenheiroDTO);
        await _engenheiroRepository.Create(engenheiro);
        engenheiroDTO.Id = engenheiro.Id;
    }

    public async Task Update(EngenheiroDTO engenheiroDTO)
    {
        var engenheiro = _mapper.Map<Engenheiro>(engenheiroDTO);
        await _engenheiroRepository.Update(engenheiro);
    }

    public async Task Remove(int id)
    {
        await _engenheiroRepository.Delete(id);
    }
}
