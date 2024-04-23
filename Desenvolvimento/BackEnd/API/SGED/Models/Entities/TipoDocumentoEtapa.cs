using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;
using SGED.Objects.Interfaces;

namespace SGED.Models.Entities
{
    [Table("tipodocumentoetapa")]
    public class TipoDocumentoEtapa : IStatus
    {
        [Column("tipodocumentoetapa")]
        public int Id { get; set; }

        [Column("statustipoprocesso")]
        public bool Status { get; set; }

        public TipoDocumento? TipoDocumento { get; set; }

        [ForeignKey("idtipodocumento")]
        public int IdTipoDocumento { get; set; }

		public Etapa? Etapa { get; set; }

		[ForeignKey("idetapa")]
		public int IdEtapa { get; set; }
	}
}