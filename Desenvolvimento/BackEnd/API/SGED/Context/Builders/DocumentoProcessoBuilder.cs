using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class DocumentoProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Configuração do Builder para DocumentoProcesso
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.IdentificacaoDocumento).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.DescricaoDocumento).HasMaxLength(500);
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.ObservacaoDocumento).HasMaxLength(300);
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.DataExpedicao).HasMaxLength(10);
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.DataAprovacao).HasMaxLength(10);
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.Arquivo).IsRequired();
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.Status).IsRequired();
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.IdProcesso).IsRequired();
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.IdTipoDocumentoEtapa).IsRequired();
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.IdResponsavel);
            modelBuilder.Entity<DocumentoProcessoModel>().Property(dp => dp.IdAprovador);

            // Declaração: Defini o GUID como Chave Primária
            modelBuilder.Entity<DocumentoProcessoModel>().HasKey(dp => dp.Id);

            // Relacionamento: Processo -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcessoModel>()
                .HasOne(dp => dp.Processo)
                .WithMany(p => p.DocumentosProcesso)
                .HasForeignKey(dp => dp.IdProcesso)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoDocumentoEtapa -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcessoModel>()
                .HasOne(dp => dp.TipoDocumentoEtapa)
                .WithMany(tde => tde.DocumentosProcesso)
                .HasForeignKey(dp => dp.IdTipoDocumentoEtapa)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Usuario (Responsável) -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcessoModel>()
                .HasOne(dp => dp.Responsavel)
                .WithMany(u => u.DocumentosAdicionados)
                .HasForeignKey(dp => dp.IdResponsavel)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            // Relacionamento: Usuario (Aprovador) -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcessoModel>()
                .HasOne(dp => dp.Aprovador)
                .WithMany(u => u.DocumentosAprovados)
                .HasForeignKey(dp => dp.IdAprovador)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);
        }
    }
}
