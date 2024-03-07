using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;

namespace SGED.Models.Entities
{
    [Table("tipodocumentoetapa")]
    public class TipoDocumentoEtapa
    {
        [Column("tipodocumentoetapa")]
        public int Id { get; set; }

        public TipoDocumento? TipoDocumento { get; set; }

        [ForeignKey("idtipodocumento")]
        public int IdTipoDocumento { get; set; }

		public Etapa? Etapa { get; set; }

		[ForeignKey("idetapa")]
		public int IdEtapa { get; set; }

		public ICollection<Etapa>? Etapas { get; set; }
		public ICollection<TipoDocumento>? TipoDocumentos { get; set; }
	}
}