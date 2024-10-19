using SGED.Context;
using SGED.DTOs.Entities;
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

    public async Task<IEnumerable<BairroModel>> GetAll()
    {
        return await _dbContext.Bairro.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<BairroModel>> GetByCity(int idCidade)
    {
        return await _dbContext.Bairro.Where(b => b.IdCidade == idCidade).AsNoTracking().ToListAsync();
    }

    public async Task<BairroModel> GetById(int id)
    {
        return await _dbContext.Bairro.AsNoTracking().FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<BairroModel> Create(BairroModel bairro)
    {
        _dbContext.Bairro.Add(bairro);
        await _dbContext.SaveChangesAsync();
        return bairro;
    }

    public async Task<BairroModel> Update(BairroModel bairro)
    {
        _dbContext.Entry(bairro).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return bairro;
    }

    public async Task<BairroModel> Delete(int id)
    {
        var bairro = await GetById(id);
        _dbContext.Bairro.Remove(bairro);
        await _dbContext.SaveChangesAsync();
        return bairro;
    }

}
