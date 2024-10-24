using SGED.Objects.DTO.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
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
        [MaxLength(60)]
        public string Descricao { get; set; }

        [JsonIgnore]
        public ICollection<ImovelDTO>? ImoveisDTO { get; set; }
    }
}
