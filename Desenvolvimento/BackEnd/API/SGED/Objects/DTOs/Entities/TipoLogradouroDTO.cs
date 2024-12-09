using System.ComponentModel.DataAnnotations;

namespace SGED.Objects.DTOs.Entities
{
    public class TipoLogradouroDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O código do tipo de logradouro é requerido!")]
        [MinLength(1)]
        [MaxLength(3)]
        public string CodigoInformativo { get; set; }

        [Required(ErrorMessage = "A descrição do tipo de logradouro é requerida!")]
        [MinLength(3)]
        [MaxLength(35)]
        public string Descricao { get; set; }

        public ICollection<LogradouroDTO>? LogradouroDTOs { get; set; }
    }
}
