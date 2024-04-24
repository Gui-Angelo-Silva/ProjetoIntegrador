using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Interfaces;
using SGED.Objects.Helpers;

namespace SGED.Models.Entities
{
    [Table("etapa")]
	public class Etapa : IStatus
	{
		[Column("idetapa")]
		public int Id { get; set; }

		[Column("nomeetapa")]
		public string NomeEtapa { get; set; }

		[Column("descricaoetapa")]
		public string DescricaoEtapa { get; set; }

        [Column("statustipoprocesso")]
        public Status Status { get; set; }

        public TipoProcesso? TipoProcesso { get; set; }

		[ForeignKey("idtipoprocesso")]
		public int IdTipoProcesso { get; set; }

		public ICollection<TipoDocumentoEtapa>? TipoDocumentoEtapas { get; set; }
	}
}
