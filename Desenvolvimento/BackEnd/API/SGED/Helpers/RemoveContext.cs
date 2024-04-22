using Microsoft.EntityFrameworkCore;
using SGED.Context;

namespace SGED.Helpers
{
    public class RemoveContext
    {
        private readonly AppDBContext _dbContext;

        public RemoveContext(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void DetachEntity<T>(T entity) where T : class
        {
            if (entity != null)
            {
                _dbContext.Entry(entity).State = EntityState.Detached;
            }
        }

        public void DetachEntities<T>(IEnumerable<T> entities) where T : class
        {
            foreach (var entity in entities.ToList())
            {
                DetachEntity(entity);
            }
        }
    }
}
