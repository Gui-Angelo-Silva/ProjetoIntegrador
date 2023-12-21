using SGED.Context;
using SGED.Models.Entities;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

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
        return await _dbContext.Bairro.Include(objeto => objeto.Cidade).ToListAsync();
    }

    public async Task<Bairro> GetById(int id)
    {
        return await _dbContext.Bairro.Include(objeto => objeto.Cidade).Where(b => b.Id == id).FirstOrDefaultAsync();
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
