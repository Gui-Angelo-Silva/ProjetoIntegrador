using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class EstadoDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do Estado é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        public string NomeEstado { get; set; }

        [Required(ErrorMessage = "A sigla do Estado é requerida!")]
        [MinLength(2)]
        [MaxLength(2)]
        public string UfEstado { get; set; }

        [JsonIgnore]
        public ICollection<CidadeDTO>? CidadesDTO { get; set; }
    }
}
