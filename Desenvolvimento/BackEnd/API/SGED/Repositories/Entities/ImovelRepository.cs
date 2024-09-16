using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SGED.Context;
using SGED.Objects.Models.Entities;
using SGED.Repositories.Interfaces;

namespace SGED.Repositories.Entities
{
    public class ImovelRepository : IImovelRepository
	{
		private readonly AppDBContext _dbContext;

		public ImovelRepository(AppDBContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<IEnumerable<Imovel>> GetAll()
		{
			return await _dbContext.Imovel.AsNoTracking().ToListAsync();
		}

        public async Task<Imovel> GetById(int id)
		{
			return await _dbContext.Imovel.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);
		}

        public async Task<Imovel> GetByProperty(string propertyName, string data)
        {
            // Use reflexão para acessar a propriedade dinamicamente
            var imovels = await _dbContext.Imovel.AsNoTracking().ToListAsync();

            // Encontrar o primeiro imovel que atende ao critério
            var imovel = imovels.FirstOrDefault(i =>
            {
                var propertyInfo = i.GetType().GetProperty(propertyName);
                if (propertyInfo != null)
                {
                    var propertyValue = propertyInfo.GetValue(i)?.ToString();
                    return propertyValue == data;
                }
                return false;
            });

            return imovel;
        }

        public async Task<Imovel> Create(Imovel imovel)
		{
			_dbContext.Imovel.Add(imovel);
			await _dbContext.SaveChangesAsync();
			return imovel;
		}

		public async Task<Imovel> Update(Imovel imovel)
		{
			_dbContext.Entry(imovel).State = EntityState.Modified;
			await _dbContext.SaveChangesAsync();
			return imovel;
		}

		public async Task<Imovel> Delete(int id)
		{
			var imovel = await GetById(id);
			_dbContext.Imovel.Remove(imovel);
			await _dbContext.SaveChangesAsync();
			return imovel;
		}
	}
}
