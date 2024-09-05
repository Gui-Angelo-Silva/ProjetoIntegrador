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

		[Column("situacaodocumentoprocesso")]
		public string Situacao { get; set; }

		[Column("documentodocumentoprocesso")]
		public byte[] Documento { get; set; }

		[Column("idtipodocumento")]
		public int IdTipoDocumento { get; set; }

		[ForeignKey("idprocesso")]
		public int IdProcesso { get; set; }

		public Processo? Processo { get; set; }

		public TipoDocumento? TipoDocumento { get; set; }
	}
}
