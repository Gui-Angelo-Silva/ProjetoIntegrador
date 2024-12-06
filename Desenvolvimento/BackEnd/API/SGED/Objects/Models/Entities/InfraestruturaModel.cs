using SGED.DTOs.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("infraestrutura")]
    public class InfraestruturaModel
    {
        [Column("idinfraestrutura")]
        public int Id { get; set; }

        [Column("nomeinfraestrutura")]
        public string NomeInfraestrutura { get; set; }

        public TipoInfraestruturaModel? TipoInfraestrutura { get; set; }

        [Column("idtipoinfraestrutura")]
        public int IdTipoInfraestrutura { get; set; }

        public ICollection<InstalacaoModel>? Instalacoes { get; set; }
    }
}