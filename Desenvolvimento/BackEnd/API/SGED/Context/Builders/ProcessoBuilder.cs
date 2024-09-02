using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class ProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Processo>().HasKey(c => c.Id);
            modelBuilder.Entity<Processo>().Property(c => c.StatusProcesso).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<Processo>().Property(c => c.DataAprovacao).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<Processo>().Property(c => c.SituacaoProcesso).HasMaxLength(100).IsRequired();

            // Relacionamento: Imovel -> Processo
            modelBuilder.Entity<Processo>()
                .HasOne(c => c.Imovel)
                .WithMany(e => e.Processos)
                .HasForeignKey(c => c.IdImovel)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoProcesso -> Processo
            modelBuilder.Entity<Processo>()
                .HasOne(c => c.TipoProcesso)
                .WithMany(e => e.Processos)
                .HasForeignKey(c => c.IdTipoProcesso)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Engenheiro -> Processo
            modelBuilder.Entity<Processo>()
                .HasOne(c => c.Engenheiro)
                .WithMany(e => e.Processos)
                .HasForeignKey(c => c.IdEngenheiro)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Fiscal -> Processo
            modelBuilder.Entity<Processo>()
                .HasOne(c => c.Fiscal)
                .WithMany(e => e.Processos)
                .HasForeignKey(c => c.IdFiscal)
                .OnDelete(DeleteBehavior.Cascade);

        }
    }

}
