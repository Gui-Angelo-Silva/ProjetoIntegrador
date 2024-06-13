using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Enums;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.Models.Entities
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

        [Column("statustipoprocesso")]
        public StatusEnum Status { get; set; }

        public ICollection<Etapa>? Etapas { get; set; }
    }
}