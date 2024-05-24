using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("tipoinfraestrutura")]
    public class TipoInfraestrutura
    {
        [Column("idtipoinfraestrutura")]
        public int Id { get; set; }

        [Column("nometipoinfraestrutura")]
        public string NomeTipoInfraestrutura { get; set; }

        [Column("descricaotipoinfraestrutura")]
        public string? DescricaoTipoInfraestrutura { get; set; }

        public ICollection<Infraestrutura>? Infraestruturas { get; set; }
    }
}