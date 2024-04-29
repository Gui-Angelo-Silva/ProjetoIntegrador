using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoProcesso>().HasKey(b => b.Id);
            modelBuilder.Entity<TipoProcesso>().Property(b => b.NomeTipoProcesso).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<TipoProcesso>().Property(b => b.DescricaoTipoProcesso).HasMaxLength(100).IsRequired();
			modelBuilder.Entity<TipoProcesso>().Property(b => b.Status).IsRequired();


			// Inserções
		}
    }

}
