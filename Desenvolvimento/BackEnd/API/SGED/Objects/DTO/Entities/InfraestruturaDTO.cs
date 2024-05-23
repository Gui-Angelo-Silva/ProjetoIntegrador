using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
    public class InfraestruturaDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome da infraestrutura é requerido!")]
        [MinLength(3)]
        [MaxLength(30)]
        public string NomeInfraestruturaa { get; set; }
    }
}