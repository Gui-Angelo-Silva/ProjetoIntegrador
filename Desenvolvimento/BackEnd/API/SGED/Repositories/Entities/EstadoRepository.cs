using SGED.Context;
using SGED.Models.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace SGED.Repositories.Entities;
public class EstadoRepository : IEstadoRepository
{

    private readonly AppDBContext _dbContext;
    private readonly IConfiguration _configuration;

    public EstadoRepository(AppDBContext dbContext, IConfiguration configuration)
    {
        _dbContext = dbContext;
        _configuration = configuration;
    }

    public async Task<IEnumerable<Estado>> GetAll()
    {
        return await _dbContext.Estado.ToListAsync();
    }

    public async Task<Estado> GetById(int id)
    {
        return await _dbContext.Estado.Where(p => p.Id == id).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Estado>> GetByName(string nomeestado)
    {
        return await _dbContext.Estado.Where(p => p.NomeEstado.ToUpper() == nomeestado.ToUpper()).ToListAsync();
    }

    public async Task<Estado> Create(Estado estado)
    {
        _dbContext.Estado.Add(estado);
        await _dbContext.SaveChangesAsync();
        return estado;
    }

    public async Task<Estado> Update(Estado estado)
    {
        _dbContext.Entry(estado).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return estado;
    }

    public async Task<Estado> Delete(int id)
    {
        var estado = await GetById(id);
        _dbContext.Estado.Remove(estado);
        await _dbContext.SaveChangesAsync();
        return estado;
    }
}
