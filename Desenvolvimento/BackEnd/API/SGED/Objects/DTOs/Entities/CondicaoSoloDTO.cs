using SGED.Objects.DTOs.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class CondicaoSoloDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "A condição do solo é requerida!")]
        [MinLength(3)]
        [MaxLength(30)]
        public string Condicao { get; set; }

        [Required(ErrorMessage = "A descrição da condição do solo é requerida!")]
        [MinLength(5)]
        [MaxLength(200)]
        public string Descricao { get; set; }

        [JsonIgnore]
        public ICollection<ImovelDTO>? ImoveisDTO { get; set; }
    }
}
