using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.DTO.Entities
{
	[Table("TipoUsuario")]
	public class TipoUsuarioDTO
	{
        [Column("idTipoUsuario")]
        public int Id { get; set; }

		[Required(ErrorMessage = "O nível de acesso é requerido!")]
		[MinLength(1)]
		[MaxLength(1)]
        [Column("nivelAcesso")]
        public string NivelAcesso { get; set; }

		[Required(ErrorMessage = "O nome do tipo de usuário é requerido!")]
		[MinLength(3)]
		[MaxLength(20)]
        [Column("nomeTipoUsuario")]
        public string NomeTipoUsuario { get; set; }

		[Required(ErrorMessage = "A descrição é requerida!")]
		[MinLength (5)]
		[MaxLength(300)]
        [Column("descricaoTipoUsuario")]
        public string DescricaoTipoUsuario { get; set; }
	}
}
