using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class ProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Processo>().Property(td => td.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Processo>().Property(c => c.IdentificacaoProcesso).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Processo>().Property(c => c.DescricaoProcesso).HasMaxLength(300);
            modelBuilder.Entity<Processo>().Property(c => c.SituacaoProcesso).HasMaxLength(300);
            modelBuilder.Entity<Processo>().Property(c => c.DataAprovacao).HasMaxLength(10);
            modelBuilder.Entity<Processo>().Property(c => c.Status).IsRequired();
            modelBuilder.Entity<Processo>().Property(c => c.IdImovel).IsRequired();
            modelBuilder.Entity<Processo>().Property(c => c.IdTipoProcesso).IsRequired();
            modelBuilder.Entity<Processo>().Property(c => c.IdEngenheiro);
            modelBuilder.Entity<Processo>().Property(c => c.IdFiscal);
            modelBuilder.Entity<Processo>().Property(c => c.IdResponsavel);
            modelBuilder.Entity<Processo>().Property(c => c.IdAprovador);

            // Declaração: Defini o GUID como Chave Primária
            modelBuilder.Entity<Processo>().HasKey(c => c.Id);

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
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            // Relacionamento: Fiscal -> Processo
            modelBuilder.Entity<Processo>()
                .HasOne(c => c.Fiscal)
                .WithMany(e => e.Processos)
                .HasForeignKey(c => c.IdFiscal)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            // Relacionamento: Usuario (Responsável) -> Processo
            modelBuilder.Entity<Processo>()
                .HasOne(c => c.Engenheiro)
                .WithMany(e => e.Processos)
                .HasForeignKey(c => c.IdEngenheiro)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            // Relacionamento: Usuario (Aprovador) -> Processo
            modelBuilder.Entity<Processo>()
                .HasOne(c => c.Fiscal)
                .WithMany(e => e.Processos)
                .HasForeignKey(c => c.IdFiscal)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

        }
    }

}
