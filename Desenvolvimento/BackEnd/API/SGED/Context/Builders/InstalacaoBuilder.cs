using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class InstalacaoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Instalacao>().HasKey(i => i.Id);
            modelBuilder.Entity<Instalacao>().Property(i => i.DataInstalacao).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<Instalacao>().Property(i => i.SituacaoInstalacao).IsRequired();
            modelBuilder.Entity<Instalacao>().Property(i => i.IdInfraestrutura).IsRequired();
            modelBuilder.Entity<Instalacao>().Property(i => i.IdImovel).IsRequired();
            modelBuilder.Entity<Instalacao>().Property(i => i.IdEngenheiro);

            // Relacionamento: TipoInstalacao -> Instalacao
            modelBuilder.Entity<Instalacao>()
                .HasOne(i => i.Infraestrutura)
                .WithMany(i => i.Instalacoes)
                .HasForeignKey(i => i.IdInfraestrutura)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoInstalacao -> Instalacao
            modelBuilder.Entity<Instalacao>()
                .HasOne(i => i.Imovel)
                .WithMany(i => i.Instalacoes)
                .HasForeignKey(i => i.IdImovel)
                .OnDelete(DeleteBehavior.Cascade);

            /*
            // Relacionamento: TipoInstalacao -> Instalacao
            modelBuilder.Entity<Instalacao>()
                .HasOne(i => i.Engenheiro)
                .WithMany(e => e.Instalacoes)
                .HasForeignKey(i => i.IdEngenheiro)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);
            */


            // Inserções
        }
    }

}
