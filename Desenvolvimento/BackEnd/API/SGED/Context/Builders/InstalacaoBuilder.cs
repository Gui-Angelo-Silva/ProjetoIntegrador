using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class InstalacaoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<InstalacaoModel>().Property(i => i.Id);
            modelBuilder.Entity<InstalacaoModel>().Property(i => i.DataInstalacao).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<InstalacaoModel>().Property(i => i.SituacaoInstalacao).IsRequired();
            modelBuilder.Entity<InstalacaoModel>().Property(i => i.IdInfraestrutura).IsRequired();
            modelBuilder.Entity<InstalacaoModel>().Property(i => i.IdImovel).IsRequired();
            modelBuilder.Entity<InstalacaoModel>().Property(i => i.IdEngenheiro);

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<InstalacaoModel>().HasKey(i => i.Id);

            // Relacionamento: Infraestrutura -> Instalacao
            modelBuilder.Entity<InstalacaoModel>()
                .HasOne(i => i.Infraestrutura)
                .WithMany(i => i.Instalacoes)
                .HasForeignKey(i => i.IdInfraestrutura)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoInstalacao -> Instalacao
            modelBuilder.Entity<InstalacaoModel>()
                .HasOne(i => i.Imovel)
                .WithMany(ti => ti.Instalacoes)
                .HasForeignKey(i => i.IdImovel)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Engenheiro -> Instalacao
            modelBuilder.Entity<InstalacaoModel>()
                .HasOne(i => i.Engenheiro)
                .WithMany(e => e.Instalacoes)
                .HasForeignKey(i => i.IdEngenheiro)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);


            // Inserções
        }
    }

}
