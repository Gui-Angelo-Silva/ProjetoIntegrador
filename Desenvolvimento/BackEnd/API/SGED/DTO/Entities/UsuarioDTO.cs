using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    [Table("usuario")]
    public class UsuarioDTO
    {
        [Column("idusuario")]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(10)]
        [MaxLength(70)]
        [Column("nomeusuario")]
        public string NomeUsuario { get; set; }
        
        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        [Column("emailusuario")]
        public string EmailUsuario { get; set; }

        [Required(ErrorMessage = "A nome é requerida!")]
        [MinLength(6)]
        [MaxLength(50)]
        [Column("senhausuario")]
        public string SenhaUsuario { get; set; }

        [Required(ErrorMessage = "O cargo é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        [Column("cargousuario")]
        public string CargoUsuario { get; set; }

        [Column("statususuario")]
        public Boolean StatusUsuario { get; set; }


        [Column("tipousuario")]
        [JsonIgnore]
        public TipoUsuarioDTO? TipoUsuarioDTO { get; set; }

        [ForeignKey("idtipousuario")]
        public int IdTipoUsuario { get; set; }

    }
}
