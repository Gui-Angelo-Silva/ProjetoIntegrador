using SGED.DTOs.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("estado")]
    public class EstadoModel
    {
        [Column("idestado")]
        public int Id { get; set; }

        [Column("nomeestado")]
        public string NomeEstado { get; set; }

        [Column("ufestado")]
        public string UfEstado { get; set; }

        public ICollection<CidadeModel>? Cidades { get; set; }
    }
}