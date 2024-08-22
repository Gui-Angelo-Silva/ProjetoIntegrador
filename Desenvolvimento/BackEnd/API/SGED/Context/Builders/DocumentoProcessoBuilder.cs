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


			// Inserções
		}
	}

}
