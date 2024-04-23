using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;
using SGED.Objects.Interfaces;

namespace SGED.Models.Entities
{
    [Table("tipoprocesso")]
    public class TipoProcesso : IStatus
    {
        [Column("idtipoprocesso")]
        public int Id { get; set; }

        [Column("tipoprocesso")]
        public string NomeTipoProcesso { get; set; }

        [Column("descricaotipoprocesso")]
        public string DescricaoTipoProcesso { get; set; }

        [Column("statustipoprocesso")]
        public bool Status { get; set; }

        public ICollection<Etapa>? Etapas { get; set; }
	}
}