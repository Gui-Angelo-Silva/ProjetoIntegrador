using SGED.DTOs.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("tipouso")]
    public class UsoModel
    {
        [Column("iduso")]
        public int Id { get; set; }

        [Column("nomeuso")]
        public string NomeUso { get; set; }

        [Column("descricaouso")]
        public string? DescricaoUso { get; set; }

        public ICollection<ImovelModel>? Imoveis { get; set; }
    }
}