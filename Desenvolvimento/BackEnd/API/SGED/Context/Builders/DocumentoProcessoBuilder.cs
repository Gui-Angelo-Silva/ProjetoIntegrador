using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class DocumentoProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Configuração do Builder para DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.IdentificacaoDocumento).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.DescricaoDocumento).HasMaxLength(500);
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.ObservacaoDocumento).HasMaxLength(300);
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.ArquivoDocumento);
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.Status).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.IdProcesso).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.IdTipoDocumentoEtapa).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.IdResponsavel);
            modelBuilder.Entity<DocumentoProcesso>().Property(dp => dp.IdAprovador);

            // Declaração: Defini o GUID como Chave Primária
            modelBuilder.Entity<DocumentoProcesso>().HasKey(dp => dp.Id);

            // Relacionamento: Processo -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>()
                .HasOne(dp => dp.Processo)
                .WithMany(p => p.DocumentosProcesso)
                .HasForeignKey(dp => dp.IdProcesso)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoDocumentoEtapa -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>()
                .HasOne(dp => dp.TipoDocumentoEtapa)
                .WithMany(tde => tde.DocumentosProcesso)
                .HasForeignKey(dp => dp.IdTipoDocumentoEtapa)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Usuario (Responsável) -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>()
                .HasOne(dp => dp.Responsavel)
                .WithMany(u => u.DocumentosAdicionados)
                .HasForeignKey(dp => dp.IdResponsavel)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);

            // Relacionamento: Usuario (Aprovador) -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>()
                .HasOne(dp => dp.Aprovador)
                .WithMany(u => u.DocumentosAprovados)
                .HasForeignKey(dp => dp.IdAprovador)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);
        }
    }
}
