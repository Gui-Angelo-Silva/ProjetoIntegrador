using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
    public class TipoUsoDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do tipo uso é requerido!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string NomeTipoUso { get; set; }

        public string? DescricaoTipoUso { get; set; }
    }
}
