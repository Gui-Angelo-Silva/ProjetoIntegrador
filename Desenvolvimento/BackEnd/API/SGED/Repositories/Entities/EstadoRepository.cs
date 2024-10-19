using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;
using System.Globalization;
using System.Text;

namespace SGED.Repositories.Entities;
public class EstadoRepository : IEstadoRepository
{

    private readonly AppDBContext _dbContext;

    public EstadoRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<EstadoModel>> GetAll()
    {
        return await _dbContext.Estado.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<EstadoModel>> Search(string search)
    {
        if (string.IsNullOrWhiteSpace(search))
        {
            return new List<EstadoModel>();
        }

        // Carregar todos os estados do banco de dados
        var estados = await _dbContext.Estado.AsNoTracking().ToListAsync();

        // Normaliza e converte o termo de pesquisa para lowercase, removendo acentuação
        string normalizedSearch = RemoveAccents(search.ToLower());

        // Filtrar os estados no lado do cliente
        return estados.Where(e => e.NomeEstado != null &&
            RemoveAccents(e.NomeEstado.ToLower()).Contains(normalizedSearch))
            .ToList();
    }

    // Método para remover acentos
    private string RemoveAccents(string input)
    {
        if (string.IsNullOrEmpty(input))
            return string.Empty;

        // Normaliza a string e remove os caracteres acentuados
        var normalizedString = input.Normalize(NormalizationForm.FormD);
        var stringBuilder = new StringBuilder();

        foreach (var c in normalizedString)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            // Adiciona apenas os caracteres que não são acentuados
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        return stringBuilder.ToString().Replace(" ", "").Replace("ç", "c"); // Remove espaços e substitui "ç"
    }

    public async Task<EstadoModel> GetById(int id)
    {
        return await _dbContext.Estado.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
    }

    public async Task<IEnumerable<EstadoModel>> GetByName(string nome)
    {
        return await _dbContext.Estado.Where(e => e.NomeEstado.ToUpper().Contains(nome.ToUpper())).AsNoTracking().ToListAsync();
    }

    public async Task<EstadoModel> Create(EstadoModel estado)
    {
        _dbContext.Estado.Add(estado);
        await _dbContext.SaveChangesAsync();
        return estado;
    }

    public async Task<EstadoModel> Update(EstadoModel estado)
    {
        _dbContext.Entry(estado).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return estado;
    }

    public async Task<EstadoModel> Delete(int id)
    {
        var estado = await GetById(id);
        _dbContext.Estado.Remove(estado);
        await _dbContext.SaveChangesAsync();
        return estado;
    }
}
