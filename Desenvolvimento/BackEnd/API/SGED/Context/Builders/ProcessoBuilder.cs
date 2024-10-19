using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class ProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<ProcessoModel>().Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<ProcessoModel>().Property(p => p.IdentificacaoProcesso).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<ProcessoModel>().Property(p => p.DescricaoProcesso).HasMaxLength(500);
            modelBuilder.Entity<ProcessoModel>().Property(p => p.SituacaoProcesso).HasMaxLength(300);
            modelBuilder.Entity<ProcessoModel>().Property(p => p.DataAprovacao).HasMaxLength(10);
            modelBuilder.Entity<ProcessoModel>().Property(p => p.Status).IsRequired();
            modelBuilder.Entity<ProcessoModel>().Property(p => p.IdImovel).IsRequired();
            modelBuilder.Entity<ProcessoModel>().Property(p => p.IdTipoProcesso).IsRequired();
            modelBuilder.Entity<ProcessoModel>().Property(p => p.IdEngenheiro);
            modelBuilder.Entity<ProcessoModel>().Property(p => p.IdFiscal);
            modelBuilder.Entity<ProcessoModel>().Property(p => p.IdResponsavel);
            modelBuilder.Entity<ProcessoModel>().Property(p => p.IdAprovador);

            // Declaração: Defini o GUID como Chave Primária
            modelBuilder.Entity<ProcessoModel>().HasKey(p => p.Id);

            // Relacionamento: Imovel -> Processo
            modelBuilder.Entity<ProcessoModel>()
                .HasOne(p => p.Imovel)
                .WithMany(i => i.Processos)
                .HasForeignKey(p => p.IdImovel)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoProcesso -> Processo
            modelBuilder.Entity<ProcessoModel>()
                .HasOne(p => p.TipoProcesso)
                .WithMany(tp => tp.Processos)
                .HasForeignKey(p => p.IdTipoProcesso)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Engenheiro -> Processo
            modelBuilder.Entity<ProcessoModel>()
                .HasOne(p => p.Engenheiro)
                .WithMany(e => e.Processos)
                .HasForeignKey(p => p.IdEngenheiro)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            // Relacionamento: Fiscal -> Processo
            modelBuilder.Entity<ProcessoModel>()
                .HasOne(p => p.Fiscal)
                .WithMany(f => f.Processos)
                .HasForeignKey(p => p.IdFiscal)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            // Relacionamento: Usuario (Responsável) -> Processo
            modelBuilder.Entity<ProcessoModel>()
                .HasOne(p => p.Responsavel)
                .WithMany(u => u.ProcessosAdicionados)
                .HasForeignKey(p => p.IdResponsavel)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            // Relacionamento: Usuario (Aprovador) -> Processo
            modelBuilder.Entity<ProcessoModel>()
                .HasOne(p => p.Aprovador)
                .WithMany(u => u.ProcessosAprovados)
                .HasForeignKey(p => p.IdAprovador)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

        }
    }

}
