using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class DocumentoProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Configuração do Builder para DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.IdentificacaoDocumento).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.DescricaoDocumento).HasMaxLength(500);
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.ObservacaoDocumento).HasMaxLength(300);
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.ArquivoDocumento);
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.Status).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.IdProcesso).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.IdTipoDocumentoEtapa).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.IdResponsavel);
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.IdAprovador);

            // Declaração: Defini o GUID como Chave Primária
            modelBuilder.Entity<DocumentoProcesso>().HasKey(td => td.Id);

            // Relacionamento: Processo -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>()
                .HasOne(c => c.Processo)
                .WithMany(e => e.DocumentosProcesso)
                .HasForeignKey(c => c.IdProcesso)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoDocumentoProcesso -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>()
                .HasOne(c => c.TipoDocumentoEtapa)
                .WithMany(e => e.DocumentosProcesso)
                .HasForeignKey(c => c.IdTipoDocumentoEtapa)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Usuario (Responsável) -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>()
                .HasOne(c => c.Responsavel)
                .WithMany(e => e.DocumentosAdicionados)
                .HasForeignKey(c => c.IdResponsavel)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Usuario (Aprovador) -> DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>()
                .HasOne(c => c.Aprovador)
                .WithMany(e => e.DocumentosAprovados)
                .HasForeignKey(c => c.IdAprovador)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired(false);
        }
    }
}
