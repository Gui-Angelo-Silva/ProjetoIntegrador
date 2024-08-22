using SGED.Objects.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
	[Table("documentoprocesso")]
	public class DocumentoProcesso
	{
		[Column("iddocumentoprocesso")]
		public int Id { get; set; }

		[Column("descricaodocumentoprocesso")]
		public string Descricao { get; set; }

		[Column("observacaodocumentoprocesso")]
		public string Observacao { get; set; }

		[Column("documentodocumentoprocesso")]
		public string Documento { get; set; }

		[Column("situacaodocumentoprocesso")]
		public string Situacao { get; set; }
	}
}
