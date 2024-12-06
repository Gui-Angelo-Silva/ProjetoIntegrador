using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class BairroDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome da Bairro é requerida!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string NomeBairro { get; set; }

        [JsonIgnore]
        public CidadeDTO? CidadeDTO { get; set; }

        [Required(ErrorMessage = "A Cidade é requerida!")]
        public int IdCidade { get; set; }

        [JsonIgnore]
        public ICollection<LogradouroDTO>? LogradourosDTOs { get; set; }
    }
}
