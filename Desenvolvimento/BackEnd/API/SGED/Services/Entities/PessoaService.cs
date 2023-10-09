using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class PessoaService : IPessoaService
{

    private readonly IPessoaRepository _pessoaRepository;
    private readonly IMapper _mapper;

    public PessoaService(IPessoaRepository pessoaRepository, IMapper mapper)
    {
        _pessoaRepository = pessoaRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<PessoaDTO>> GetAll()
    {
        var pessoas = await _pessoaRepository.GetAll();
        return _mapper.Map<IEnumerable<PessoaDTO>>(pessoas);
    }

    public async Task<PessoaDTO> GetById(int id)
    {
        var pessoa = await _pessoaRepository.GetById(id);
        return _mapper.Map<PessoaDTO>(pessoa);
    }

    public async Task Create(PessoaDTO pessoaDTO)
    {
        var pessoa = _mapper.Map<Pessoa>(pessoaDTO);
        await _pessoaRepository.Create(pessoa);
        pessoaDTO.Id = pessoa.Id;
    }

    public async Task Update(PessoaDTO pessoaDTO)
    {
        var pessoa = _mapper.Map<Pessoa>(pessoaDTO);
        await _pessoaRepository.Update(pessoa);
    }

    public async Task Remove(int id)
    {
        await _pessoaRepository.Delete(id);
    }
}
