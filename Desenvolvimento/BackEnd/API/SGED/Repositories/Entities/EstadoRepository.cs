using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;
using System.Globalization;
using System.Text;
using SGED.Objects.Utilities;

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
        string normalizedSearch = Operator.RemoveAccents(search.ToLower());

        // Filtrar os estados no lado do cliente
        return estados.Where(e => e.NomeEstado != null &&
            Operator.RemoveAccents(e.NomeEstado.ToLower()).Contains(normalizedSearch))
            .ToList();
    }

    public async Task<IEnumerable<EstadoModel>> GetByName(string nome)
    {
        return await _dbContext.Estado.Where(e => e.NomeEstado.ToUpper().Contains(nome.ToUpper())).AsNoTracking().ToListAsync();
    }

    public async Task<EstadoModel> GetById(int id)
    {
        return await _dbContext.Estado.AsNoTracking().FirstOrDefaultAsync(e => e.Id == id);
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
