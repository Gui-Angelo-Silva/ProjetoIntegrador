using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoDocumentoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            // Builder: TipoDocumento
            modelBuilder.Entity<TipoDocumento>().HasKey(td => td.Id);
            modelBuilder.Entity<TipoDocumento>().Property(td => td.NomeTipoDocumento).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<TipoDocumento>().Property(td => td.DescricaoTipoDocumento).HasMaxLength(450).IsRequired();
            modelBuilder.Entity<TipoDocumento>().Property(td => td.Status).IsRequired();


            // Inserções
        }
    }

}
