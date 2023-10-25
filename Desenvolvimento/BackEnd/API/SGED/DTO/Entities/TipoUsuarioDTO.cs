using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
	[Table("tipousuario")]
	public class TipoUsuarioDTO
	{
        [Column("idtipousuario")]
        public int Id { get; set; }

		[Required(ErrorMessage = "O nível de acesso é requerido!")]
		[MinLength(1)]
		[MaxLength(1)]
        [Column("nivelacesso")]
        public string NivelAcesso { get; set; }

		[Required(ErrorMessage = "O nome do tipo de usuário é requerido!")]
		[MinLength(3)]
		[MaxLength(20)]
        [Column("nometipousuario")]
        public string NomeTipoUsuario { get; set; }

		[Required(ErrorMessage = "A descrição é requerida!")]
		[MinLength (5)]
		[MaxLength(300)]
        [Column("descricaotipousuario")]
        public string DescricaoTipoUsuario { get; set; }

        [JsonIgnore]
        [Column("usuario")]
        public ICollection<UsuarioDTO>? UsuarioDTO { get; set; }
    }
}
