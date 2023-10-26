using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Models.Entities
{
    [Table("estado")]
    public class Estado
    {
        [Column("idestado")]
        public int Id { get; set; }

        [Column("nomeestado")]
        public string NomeEstado { get; set; }

        [Column("ufestado")]
        public string UfEstado { get; set; }

        [Column("cidades")]
        public ICollection<Cidade>? Cidades { get; set; }

    }
}