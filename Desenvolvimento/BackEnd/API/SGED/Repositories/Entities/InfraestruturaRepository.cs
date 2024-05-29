using SGED.Context;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class InfraestruturaRepository : IInfraestruturaRepository
{

    private readonly AppDBContext _dbContext;

    public InfraestruturaRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Infraestrutura>> GetAll()
    {
        return await _dbContext.Infraestrutura.ToListAsync();
    }

    public async Task<Infraestrutura> GetById(int id)
    {
        return await _dbContext.Infraestrutura.Where(objeto => objeto.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Infraestrutura> Create(Infraestrutura infraestrutura)
    {
        _dbContext.Infraestrutura.Add(infraestrutura);
        await _dbContext.SaveChangesAsync();
        return infraestrutura;
    }

    public async Task<Infraestrutura> Update(Infraestrutura infraestrutura)
    {
        _dbContext.Entry(infraestrutura).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return infraestrutura;
    }

    public async Task<Infraestrutura> Delete(int id)
    {
        var infraestrutura = await GetById(id);
        _dbContext.Infraestrutura.Remove(infraestrutura);
        await _dbContext.SaveChangesAsync();
        return infraestrutura;
    }
}
