using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class DocumentoProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            // Builder: DocumentoProcesso
            modelBuilder.Entity<DocumentoProcesso>().HasKey(td => td.Id);
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.Descricao).HasMaxLength(300).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.Observacao).HasMaxLength(300).IsRequired();
            modelBuilder.Entity<DocumentoProcesso>().Property(td => td.Situacao).HasMaxLength(300).IsRequired();
			modelBuilder.Entity<DocumentoProcesso>().Property(td => td.Documento).IsRequired();

			// Relacionamento: Imovel -> DocumentoProcesso
			modelBuilder.Entity<DocumentoProcesso>()
				.HasOne(c => c.Processo)
				.WithMany(e => e.DocumentosProcesso)
				.HasForeignKey(c => c.IdProcesso)
				.OnDelete(DeleteBehavior.Cascade);

			// Relacionamento: TipoProcesso -> DocumentoProcesso
			modelBuilder.Entity<DocumentoProcesso>()
				.HasOne(c => c.TipoDocumento)
				.WithMany(e => e.DocumentosProcesso)
				.HasForeignKey(c => c.IdTipoDocumento)
				.OnDelete(DeleteBehavior.Cascade);

			// Inserções
		}
	}

}
