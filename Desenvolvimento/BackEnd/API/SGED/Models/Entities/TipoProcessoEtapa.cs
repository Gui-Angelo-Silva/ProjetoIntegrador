using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;

namespace SGED.Models.Entities
{
    [Table("tipoprocessoetapa")]
    public class TipoProcessoEtapa
    {
        [Column("idtipoprocessoetapa")]
        public int Id { get; set; }

        public TipoProcesso? TipoProcesso { get; set; }

        [ForeignKey("idtipoprocesso")]
        public int IdTipoProcesso { get; set; }

		public Etapa? Etapa { get; set; }

		[ForeignKey("idetapa")]
		public int IdEtapa { get; set; }
	}
}