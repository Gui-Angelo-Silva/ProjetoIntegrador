using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class InfraestruturaDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome da infraestrutura é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        public string NomeInfraestrutura { get; set; }

        [JsonIgnore]
        public TipoInfraestruturaDTO? TipoInfraestruturaDTO { get; set; }

        [Required(ErrorMessage = "O tipo de infraestrutura é requerido!")]
        public int IdTipoInfraestrutura { get; set; }

        [JsonIgnore]
        public ICollection<InstalacaoDTO>? InstalacoesDTOs { get; set; }
    }
}