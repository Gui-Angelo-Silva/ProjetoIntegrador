using SGED.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    [Table("Cidade")]
    public class CidadeDTO
    {
        [Column("idCidade")]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "O nome da cidade é requerida!")]
        [MinLength(3)]
        [MaxLength(100)]
        [Column("nomeCidade")]
        public string NomeCidade { get; set; }


        [JsonIgnore]
        public EstadoDTO? EstadoDTO { get; set; }
        
        [Required(ErrorMessage = "O Estado é requerido!")]
        [ForeignKey("idEstado")]
        public int IdEstado { get; set; }

    }
}
