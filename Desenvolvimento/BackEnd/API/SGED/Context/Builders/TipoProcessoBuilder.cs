using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoProcesso>().HasKey(tp => tp.Id);
            modelBuilder.Entity<TipoProcesso>().Property(tp => tp.NomeTipoProcesso).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<TipoProcesso>().Property(tp => tp.DescricaoTipoProcesso).HasMaxLength(100).IsRequired();
			modelBuilder.Entity<TipoProcesso>().Property(tp => tp.Status).IsRequired();


			// Inserções
		}
    }

}
