using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class UsoDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do uso é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        public string NomeUso { get; set; }

        public string? DescricaoUso { get; set; }

        [JsonIgnore]
        public ICollection<ImovelDTO>? ImoveisDTOs { get; set; }
    }
}
