﻿using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities;

namespace SGED.Repositories.Entities;
public class EngenheiroRepository : IEngenheiroRepository
{

    private readonly AppDBContext _dbContext;

    public EngenheiroRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<EngenheiroModel>> GetAll()
    {
		return await _dbContext.Engenheiro.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<EngenheiroModel>> Search(string search)
    {
        if (string.IsNullOrWhiteSpace(search))
        {
            return new List<EngenheiroModel>();
        }

        // Carregar todos os engenheiros do banco de dados
        var engenheiros = await _dbContext.Engenheiro.AsNoTracking().ToListAsync();

        // Normaliza e converte o termo de pesquisa para lowercase, removendo acentuação
        string normalizedSearch = Operator.RemoveAccents(search.ToLower());

        // Filtrar os engenheiros no lado do cliente
        return engenheiros.Where(e => e.NomePessoa != null &&
            Operator.RemoveAccents(e.NomePessoa.ToLower()).Contains(normalizedSearch))
            .ToList();
    }

    public async Task<EngenheiroModel> GetById(int id)
    {
        return await _dbContext.Engenheiro.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<EngenheiroModel> Create(EngenheiroModel engenheiro)
    {
        _dbContext.Engenheiro.Add(engenheiro);
        await _dbContext.SaveChangesAsync();
        return engenheiro;
    }

    public async Task<EngenheiroModel> Update(EngenheiroModel engenheiro)
    {
        _dbContext.ChangeTracker.Clear();
        _dbContext.Entry(engenheiro).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return engenheiro;
    }

    public async Task<EngenheiroModel> Delete(int id)
    {
        var engenheiro = await GetById(id);
        _dbContext.Engenheiro.Remove(engenheiro);
        await _dbContext.SaveChangesAsync();
        return engenheiro;
    }

}
