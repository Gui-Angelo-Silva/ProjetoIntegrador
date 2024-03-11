﻿using SGED.Context;
using SGED.Models.Entities;
using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;

namespace SGED.Repositories.Entities;
public class TipoDocumentoEtapaRepository : ITipoDocumentoEtapaRepository
{

    private readonly AppDBContext _dbContext;

    public TipoDocumentoEtapaRepository(AppDBContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<TipoDocumentoEtapa>> GetAll()
    {
        return await _dbContext.TipoDocumentoEtapa.Include(objeto => objeto.Etapa).Include(objeto => objeto.TipoDocumento).ToListAsync();
	}

    public async Task<TipoDocumentoEtapa> GetById(int id)
    {
        return await _dbContext.TipoDocumentoEtapa.Include(objeto => objeto.Etapa).Include(objeto => objeto.TipoDocumento).Where(b => b.Id == id).FirstOrDefaultAsync();
    }


    public async Task<TipoDocumentoEtapa> Create(TipoDocumentoEtapa TipoDocumentoEtapa)
    {
        _dbContext.TipoDocumentoEtapa.Add(TipoDocumentoEtapa);
        await _dbContext.SaveChangesAsync();
        return TipoDocumentoEtapa;
    }

    public async Task<TipoDocumentoEtapa> Update(TipoDocumentoEtapa TipoDocumentoEtapa)
    {
        _dbContext.Entry(TipoDocumentoEtapa).State = EntityState.Modified;
        await _dbContext.SaveChangesAsync();
        return TipoDocumentoEtapa;
    }

    public async Task<TipoDocumentoEtapa> Delete(int id)
    {
        var TipoDocumentoEtapa = await GetById(id);
        _dbContext.TipoDocumentoEtapa.Remove(TipoDocumentoEtapa);
        await _dbContext.SaveChangesAsync();
        return TipoDocumentoEtapa;
    }

}