using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class EtapaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Etapa>().HasKey(e => e.Id);
            modelBuilder.Entity<Etapa>().Property(e => e.NomeEtapa).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Etapa>().Property(e => e.DescricaoEtapa).HasMaxLength(250).IsRequired();
            modelBuilder.Entity<Etapa>().Property(e => e.Posicao).IsRequired();
            modelBuilder.Entity<Etapa>().Property(e => e.Status).IsRequired();
            modelBuilder.Entity<Etapa>().Property(e => e.IdTipoProcesso).IsRequired();

            // Relacionamento: TipoProcesso -> Etapa
            modelBuilder.Entity<Etapa>()
                .HasOne(e => e.TipoProcesso)
                .WithMany(tp => tp.Etapas)
                .HasForeignKey(e => e.IdTipoProcesso)
                .OnDelete(DeleteBehavior.Cascade);



            // Inserções
        }
    }

}
