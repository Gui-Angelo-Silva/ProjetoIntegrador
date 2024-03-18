using Microsoft.EntityFrameworkCore;
using SGED.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoDocumentoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            // Builder: TipoDocumento
            modelBuilder.Entity<TipoDocumento>().HasKey(b => b.Id);
            modelBuilder.Entity<TipoDocumento>().Property(b => b.NomeTipoDocumento).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<TipoDocumento>().Property(b => b.DescricaoTipoDocumento).HasMaxLength(450).IsRequired();


            // Inserções
        }
    }

}
