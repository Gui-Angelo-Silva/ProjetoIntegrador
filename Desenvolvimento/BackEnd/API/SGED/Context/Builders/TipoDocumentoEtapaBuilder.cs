using Microsoft.EntityFrameworkCore;
using SGED.DTO.Entities;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoDocumentoEtapaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoDocumentoEtapa>().HasKey(tde => tde.Id);
            modelBuilder.Entity<TipoDocumentoEtapa>().Property(tde => tde.Posicao).IsRequired();
            modelBuilder.Entity<TipoDocumentoEtapa>().Property(tde => tde.Status).IsRequired();
            modelBuilder.Entity<TipoDocumentoEtapa>().Property(tde => tde.IdTipoDocumento).IsRequired();
            modelBuilder.Entity<TipoDocumentoEtapa>().Property(tde => tde.IdEtapa).IsRequired();

            // Relacionamento: TipoDocumento -> TipoDocumentoEtapa
            modelBuilder.Entity<TipoDocumentoEtapa>()
                .HasOne(tde => tde.TipoDocumento)
                .WithMany(td => td.TipoDocumentoEtapas)
                .HasForeignKey(tde => tde.IdTipoDocumento)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Etapa -> TipoDocumentoEtapa
            modelBuilder.Entity<TipoDocumentoEtapa>()
                .HasOne(tde => tde.Etapa)
                .WithMany(e => e.TipoDocumentoEtapas)
                .HasForeignKey(tde => tde.IdEtapa)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
