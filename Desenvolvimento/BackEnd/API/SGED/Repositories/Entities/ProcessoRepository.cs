using SGED.Context;
using SGED.DTOs.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using SGED.Objects.Models.Entities;
using SGED.Objects.Enums.Status;
using static System.Reflection.Metadata.BlobBuilder;

namespace SGED.Repositories.Entities;
public class ProcessoRepository : IProcessoRepository
{
    private readonly ITipoProcessoRepository _tipoProcessoRepository;
    private readonly AppDBContext _dbContext;

    public ProcessoRepository(ITipoProcessoRepository tipoProcessoRepository, AppDBContext dbContext)
    {
        _tipoProcessoRepository = tipoProcessoRepository;
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<ProcessoModel>> GetAll()
    {
        return await _dbContext.Processo.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<ProcessoModel>> GetByStatus(int status)
    {
        // Convertendo o valor numérico para o enum
        StatusProcess statusEnum = (StatusProcess)status;

        return await _dbContext.Processo
            .AsNoTracking()
            .Where(p => p.Status == statusEnum) // Comparando com o enum
            .ToListAsync();
    }

    public async Task<ProcessoModel> GetById(Guid id)
    {
        return await _dbContext.Processo.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<ProcessoModel> Create(ProcessoModel processo)
    {
        // Gera o código e atribui ao processo
        processo.IdentificacaoProcesso = await GenerateCode(processo);

        // Adiciona e salva no banco de dados
        _dbContext.Processo.Add(processo);
        await _dbContext.SaveChangesAsync();
        return processo;
    }

    public async Task<ProcessoModel> Update(ProcessoModel processo)
    {
        _dbContext.Entry(processo).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return processo;
    }

    public async Task<ProcessoModel> Delete(Guid id)
    {
        var Processo = await GetById(id);
        _dbContext.Processo.Remove(Processo);
        await _dbContext.SaveChangesAsync();
        return Processo;
    }

    private async Task<ProcessoModel> GetLastByCode(string codigo)
    {
        // Busca o último processo que começa com o código especificado
        return await _dbContext.Processo
            .AsNoTracking()
            .Where(p => p.IdentificacaoProcesso.StartsWith(codigo)) // Filtra processos que começam com o código
            .OrderByDescending(p => p.IdentificacaoProcesso) // Ordena decrescentemente para pegar o maior
            .FirstOrDefaultAsync();
    }

    public async Task<string> GenerateCode(ProcessoModel processo)
    {
        // Obtém o tipo de processo e extrai as iniciais
        var tipoProcesso = await _tipoProcessoRepository.GetById(processo.IdTipoProcesso);
        var codigo = string.Concat(tipoProcesso.NomeTipoProcesso
            .Split(' ')
            .Where(word => char.IsUpper(word[0])) // Filtra apenas palavras que começam com letra maiúscula
            .Select(word => word[0])); // Pega a primeira letra sem alterá-la

        // Busca o último processo existente com o mesmo código
        var processoExistente = await GetLastByCode(codigo);

        if (processoExistente == null)
        {
            processo.IdentificacaoProcesso = $"{codigo}-0001";
        }
        else
        {
            // Extrai o "IdentificacaoProcesso" após o "${codigo}-" e divide por pontos
            var slots = processoExistente?.IdentificacaoProcesso
                .Split($"{codigo}-")?[1]
                .Split('.') ?? new string[] { "0000" };

            // Converte o último slot para inteiro, incrementa e formata
            int slot = int.Parse(slots[^1]);
            if (slot >= 9999)
            {
                slots = slots.Append("0001").ToArray(); // Adiciona um novo slot no final
            }
            else
            {
                slots[^1] = (slot + 1).ToString("D4"); // Incrementa e formata com zeros à esquerda
            }

            // Atribui o novo IdentificacaoProcesso ao objeto processo
            processo.IdentificacaoProcesso = $"{codigo}-{string.Join('.', slots)}";
        }

        return processo.IdentificacaoProcesso;
    }
}
