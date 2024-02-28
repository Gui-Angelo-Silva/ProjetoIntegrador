using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Models.Entities
{
	[Table("etapa")]
	public class Etapa
	{
		[Column("idetapa")]
		public int Id { get; set; }

		[Column("nomeetapa")]
		public string NomeEtapa { get; set; }

		[Column("descricaoetapa")]
		public string DescricaoEtapa { get; set; }

		public TipoProcesso? TipoProcesso { get; set; }

		[ForeignKey("idtipoprocesso")]
		public int IdTipoProcesso { get; set; }

		public ICollection<TipoDocumento>? TipoDocumento { get; set; }
	}
}
