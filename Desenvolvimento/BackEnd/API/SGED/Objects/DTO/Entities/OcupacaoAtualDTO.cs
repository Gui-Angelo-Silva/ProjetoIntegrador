using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
    public class OcupacaoAtualDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome da ocupação é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        public string NomeOcupacaoAtual { get; set; }

        public string? DescricaoOcupacaoAtual { get; set; }

        [JsonIgnore]
        public ICollection<ImovelDTO>? ImoveisDTOs { get; set; }
    }
}
