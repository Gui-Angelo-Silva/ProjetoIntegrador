using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("infraestrutura")]
    public class Infraestrutura
    {
        [Column("idinfraestrutura")]
        public int Id { get; set; }

        [Column("nomeinfraestrutura")]
        public string NomeInfraestrutura { get; set; }

        public TipoInfraestrutura? TipoInfraestrutura { get; set; }

        [Column("idtipoinfraestrutura")]
        public int IdTipoInfraestrutura { get; set; }

        public ICollection<Instalacao>? Instalacoes { get; set; }
    }
}