using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities;

namespace SGED.Repositories.Entities;
public class FiscalRepository : IFiscalRepository
{

    private readonly AppDBContext _dbContext;

    public FiscalRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<FiscalModel>> GetAll()
    {
        return await _dbContext.Fiscal.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<FiscalModel>> Search(string search)
    {
        if (string.IsNullOrWhiteSpace(search))
        {
            return new List<FiscalModel>();
        }

        // Carregar todos os fiscais do banco de dados
        var fiscais = await _dbContext.Fiscal.AsNoTracking().ToListAsync();

        // Normaliza e converte o termo de pesquisa para lowercase, removendo acentuação
        string normalizedSearch = Operator.RemoveAccents(search.ToLower());

        // Filtrar os fiscais no lado do cliente
        return fiscais.Where(f => f.NomePessoa != null &&
            Operator.RemoveAccents(f.NomePessoa.ToLower()).Contains(normalizedSearch))
            .ToList();
    }

    public async Task<FiscalModel> GetById(int id)
    {
        return await _dbContext.Fiscal.AsNoTracking().FirstOrDefaultAsync(f => f.Id == id);
    }

    public async Task<FiscalModel> Create(FiscalModel fiscal)
    {
        _dbContext.Fiscal.Add(fiscal);
        await _dbContext.SaveChangesAsync();
        return fiscal;
    }

    public async Task<FiscalModel> Update(FiscalModel fiscal)
    {
        _dbContext.Entry(fiscal).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return fiscal;
    }

    public async Task<FiscalModel> Delete(int id)
    {
        var fiscal = await GetById(id);
        _dbContext.Fiscal.Remove(fiscal);
        await _dbContext.SaveChangesAsync();
        return fiscal;
    }
}
