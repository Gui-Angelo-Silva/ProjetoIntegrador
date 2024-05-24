using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("tipouso")]
    public class TipoUso
    {
        [Column("idtipouso")]
        public int Id { get; set; }

        [Column("nometipouso")]
        public string NomeTipoUso { get; set; }

        [Column("descricaotipouso")]
        public string? DescricaoTipoUso { get; set; }

        public ICollection<Imovel>? Imoveis { get; set; }
    }
}