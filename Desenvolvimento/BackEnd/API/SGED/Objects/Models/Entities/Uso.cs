using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("tipouso")]
    public class Uso
    {
        [Column("iduso")]
        public int Id { get; set; }

        [Column("nomeuso")]
        public string NomeUso { get; set; }

        [Column("descricaouso")]
        public string? DescricaoUso { get; set; }

        public ICollection<Imovel>? Imoveis { get; set; }
    }
}