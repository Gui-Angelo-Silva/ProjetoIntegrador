using SGED.Helpers;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.DTO.Entities
{
	[Table("tipoprocesso")]
	public class TipoProcessoDTO
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "O nome do TipoProcesso é requerido!")]
		[MinLength(3)]
		[MaxLength(100)]
		public string NomeTipoProcesso { get; set; }

		[Required(ErrorMessage = "A descrição do TipoProcesso é requerida!")]
		[MinLength(3)]
		[MaxLength(100)]
		public string DescricaoTipoProcesso { get; set; }

		public Status Status { get; set; }
	}
}
