using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;

namespace SGED.Models.Entities
{
    [Table("TipoProcesso")]
    public class TipoProcesso
    {
        [Column("idTipoProcesso")]
        public int Id { get; set; }

        [Column("tipoProcesso")]
        public string NomeTipoProcesso { get; set; }

        [Column("descricaoTipoProcesso")]
        public string DescricaoTipoProcesso { get; set; }
    }
}