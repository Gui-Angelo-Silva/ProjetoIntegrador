using Microsoft.EntityFrameworkCore;
using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoDocumentoEtapaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoDocumentoEtapa>().HasKey(b => b.Id);
            modelBuilder.Entity<TipoDocumentoEtapa>().HasKey(b => b.IdTipoDocumento);
            modelBuilder.Entity<TipoDocumentoEtapa>().HasKey(b => b.IdEtapa);

            // Relacionamento: Logradouro -> Imóvel
            modelBuilder.Entity<Etapa>().HasMany(p => p.TipoDocumentoEtapas).WithOne(b => b.Etapa).IsRequired().OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Munícipe -> Imóvel
            modelBuilder.Entity<TipoDocumento>().HasMany(p => p.TipoDocumentoEtapas).WithOne(b => b.TipoDocumento).IsRequired().OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
