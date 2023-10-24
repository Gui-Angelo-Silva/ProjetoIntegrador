using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    [Table("Usuario")]
    public class UsuarioDTO
    {
        [Column("idUsuario")]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(10)]
        [MaxLength(70)]
        [Column("nomeUsuario")]
        public string NomeUsuario { get; set; }
        
        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        [Column("emailUsuario")]
        public string EmailUsuario { get; set; }

        [Required(ErrorMessage = "A nome é requerida!")]
        [MinLength(6)]
        [MaxLength(50)]
        [Column("senhaUsuario")]
        public string SenhaUsuario { get; set; }

        [Required(ErrorMessage = "O cargo é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        [Column("cargoUsuario")]
        public string CargoUsuario { get; set; }

        [Column("statusUsuario")]
        public Boolean StatusUsuario { get; set; }


        [JsonIgnore]
        public TipoUsuarioDTO? TipoUsuarioDTO { get; set; }

        [ForeignKey("idTipoUsuario")]
        public int IdTipoUsuario { get; set; }

    }
}
