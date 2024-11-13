using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
    public class TopografiaDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome da topografia é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        public string NomeTopografia { get; set; }

        [JsonIgnore]
        public ICollection<ImovelDTO>? ImoveisDTOs { get; set; }
    }
}