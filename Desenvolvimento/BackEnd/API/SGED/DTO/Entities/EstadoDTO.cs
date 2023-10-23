using SGED.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    [Table("Estado")]
    public class EstadoDTO
    {
        [Column("idEstado")]
        public int Id { get; set; }
        
        [Required(ErrorMessage = "O nome do Estado é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        [Column("nomeEstado")]
        public string NomeEstado { get; set; }

        [Required(ErrorMessage = "A sigla do Estado é requerida!")]
        [MinLength(2)]
        [MaxLength(2)]
        [Column("ufEstado")]
        public string UfEstado { get; set; }

        [JsonIgnore]
        [Column("estadoCidades")]
        public ICollection<CidadeDTO>? CidadeDTO { get; set; }

    }
}
