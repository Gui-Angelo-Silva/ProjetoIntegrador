using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;
using SGED.Helpers;

namespace SGED.Models.Entities
{
    [Table("tipoprocesso")]
    public class TipoProcesso
    {
        [Column("idtipoprocesso")]
        public int Id { get; set; }

        [Column("tipoprocesso")]
        public string NomeTipoProcesso { get; set; }

        [Column("descricaotipoprocesso")]
        public string DescricaoTipoProcesso { get; set; }

        public ICollection<Etapa>? Etapas { get; set; }
		public Status Status { get; set; }
	}
}