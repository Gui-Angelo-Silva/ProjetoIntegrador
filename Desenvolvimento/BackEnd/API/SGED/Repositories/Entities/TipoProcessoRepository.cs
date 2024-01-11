//using SGED.Context;
//using SGED.Models.Entities;
//using SGED.DTO.Entities;
//using SGED.Repositories.Interfaces;
//using Microsoft.EntityFrameworkCore;
//using System.Linq;
//using System.Collections.Generic;

//namespace SGED.Repositories.Entities;
//public class TipoProcessoRepository : ITipoProcessoRepository
//{

//	private readonly AppDBContext _dbContext;

//	public TipoProcessoRepository(AppDBContext dbContext)
//	{
//		_dbContext = dbContext;
//	}

//	public async Task<IEnumerable<TipoProcesso>> GetAll()
//	{
//		return await _dbContext.TipoProcesso.Include(objeto => objeto.Cidade).ToListAsync();
//	}

//	public async Task<TipoProcesso> GetById(int id)
//	{
//		return await _dbContext.TipoProcesso.Include(objeto => objeto.Cidade).Where(b => b.Id == id).FirstOrDefaultAsync();
//	}


//	public async Task<TipoProcesso> Create(TipoProcesso TipoProcesso)
//	{
//		_dbContext.TipoProcesso.Add(TipoProcesso);
//		await _dbContext.SaveChangesAsync();
//		return TipoProcesso;
//	}

//	public async Task<TipoProcesso> Update(TipoProcesso TipoProcesso)
//	{
//		_dbContext.Entry(TipoProcesso).State = EntityState.Modified;
//		await _dbContext.SaveChangesAsync();
//		return TipoProcesso;
//	}

//	public async Task<TipoProcesso> Delete(int id)
//	{
//		var TipoProcesso = await GetById(id);
//		_dbContext.TipoProcesso.Remove(TipoProcesso);
//		await _dbContext.SaveChangesAsync();
//		return TipoProcesso;
//	}

//}
