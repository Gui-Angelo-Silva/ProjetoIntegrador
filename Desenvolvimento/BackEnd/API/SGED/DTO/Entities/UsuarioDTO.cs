using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    public class UsuarioDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(10)]
        [MaxLength(70)]
        public string NomeUsuario { get; set; }
        
        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        public string EmailUsuario { get; set; }

        [Required(ErrorMessage = "A nome é requerida!")]
        [MinLength(6)]
        [MaxLength(50)]
        public string SenhaUsuario { get; set; }

        [Required(ErrorMessage = "O cargo é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        public string CargoUsuario { get; set; }

        public Boolean StatusUsuario { get; set; }


        [JsonIgnore]
        public TipoUsuarioDTO? TipoUsuarioDTO { get; set; }

        public int IdTipoUsuario { get; set; }

    }
}
