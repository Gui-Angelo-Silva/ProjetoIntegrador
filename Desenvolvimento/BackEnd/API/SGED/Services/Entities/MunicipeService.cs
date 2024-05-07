using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class MunicipeService : IMunicipeService
{

    private readonly IMunicipeRepository _municipeRepository;
    private readonly IMapper _mapper;

    public MunicipeService(IMunicipeRepository municipeRepository, IMapper mapper)
    {
        _municipeRepository = municipeRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<MunicipeDTO>> GetAll()
    {
        var municipes = await _municipeRepository.GetAll();
        return _mapper.Map<IEnumerable<MunicipeDTO>>(municipes);
    }

    public async Task<MunicipeDTO> GetById(int id)
    {
        var municipe = await _municipeRepository.GetById(id);
        return _mapper.Map<MunicipeDTO>(municipe);
    }

    public async Task Create(MunicipeDTO municipeDTO)
    {
        var municipe = _mapper.Map<Municipe>(municipeDTO);
        await _municipeRepository.Create(municipe);
        municipeDTO.Id = municipe.Id;
    }

    public async Task Update(MunicipeDTO municipeDTO)
    {
        var municipe = _mapper.Map<Municipe>(municipeDTO);
        await _municipeRepository.Update(municipe);
    }

    public async Task Remove(int id)
    {
        await _municipeRepository.Delete(id);
    }
}
