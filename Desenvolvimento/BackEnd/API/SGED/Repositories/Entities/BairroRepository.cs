using SGED.Context;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using SGED.Objects.Models.Entities;

namespace SGED.Repositories.Entities;
public class BairroRepository : IBairroRepository
{

    private readonly AppDBContext _dbContext;

    public BairroRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Bairro>> GetAll()
    {
        return await _dbContext.Bairro.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<Bairro>> GetByCity(int idCidade)
    {
        return await _dbContext.Bairro.Where(b => b.IdCidade == idCidade).AsNoTracking().ToListAsync();
    }

    public async Task<Bairro> GetById(int id)
    {
        return await _dbContext.Bairro.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<Bairro> Create(Bairro Bairro)
    {
        _dbContext.Bairro.Add(Bairro);
        await _dbContext.SaveChangesAsync();
        return Bairro;
    }

    public async Task<Bairro> Update(Bairro Bairro)
    {
        _dbContext.Entry(Bairro).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return Bairro;
    }

    public async Task<Bairro> Delete(int id)
    {
        var Bairro = await GetById(id);
        _dbContext.Bairro.Remove(Bairro);
        await _dbContext.SaveChangesAsync();
        return Bairro;
    }

}
