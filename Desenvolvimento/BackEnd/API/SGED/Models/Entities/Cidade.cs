using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Models.Entities
{
    [Table("cidade")]
    public class Cidade
    {
        [Column("idcidade")]
        public int Id { get; set; }

        [Column("nomecidade")]
        public string NomeCidade { get; set; }


        [Column("estado")]
        public Estado? Estado { get; set; }

        [ForeignKey("idestado")]
        public int IdEstado { get; set; }

    }
}