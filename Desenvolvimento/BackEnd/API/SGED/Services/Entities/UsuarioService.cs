using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;

namespace SGED.Services.Entities;
public class UsuarioService : IUsuarioService
{

    private readonly IUsuarioRepository _pessoaRepository;
    private readonly IMapper _mapper;

    public UsuarioService(IUsuarioRepository pessoaRepository, IMapper mapper)
    {
        _pessoaRepository = pessoaRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<UsuarioDTO>> GetAll()
    {
        var pessoas = await _pessoaRepository.GetAll();
        return _mapper.Map<IEnumerable<UsuarioDTO>>(pessoas);
    }

    public async Task<UsuarioDTO> GetById(int id)
    {
        var pessoa = await _pessoaRepository.GetById(id);
        return _mapper.Map<UsuarioDTO>(pessoa);
    }

    public async Task Create(UsuarioDTO pessoaDTO)
    {
        var pessoa = _mapper.Map<Usuario>(pessoaDTO);
        await _pessoaRepository.Create(pessoa);
        pessoaDTO.Id = pessoa.Id;
    }

    public async Task Update(UsuarioDTO pessoaDTO)
    {
        var pessoa = _mapper.Map<Usuario>(pessoaDTO);
        await _pessoaRepository.Update(pessoa);
    }

    public async Task Remove(int id)
    {
        await _pessoaRepository.Delete(id);
    }
}
