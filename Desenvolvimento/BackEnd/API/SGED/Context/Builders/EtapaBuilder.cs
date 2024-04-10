using Microsoft.EntityFrameworkCore;
using SGED.Models.Entities;

namespace SGED.Context.Builders
{
    public class EtapaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Etapa>().HasKey(b => b.Id);
            modelBuilder.Entity<Etapa>().Property(b => b.NomeEtapa).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Etapa>().Property(b => b.DescricaoEtapa).HasMaxLength(250).IsRequired();
            modelBuilder.Entity<Etapa>().HasOne(b => b.TipoProcesso).WithMany().HasForeignKey(b => b.IdTipoProcesso);

            // Relacionamento: TipoProcesso -> Etapa
            modelBuilder.Entity<TipoProcesso>().HasMany(p => p.Etapas).WithOne(b => b.TipoProcesso).IsRequired().OnDelete(DeleteBehavior.Cascade);



            // Inserções
        }
    }

}
