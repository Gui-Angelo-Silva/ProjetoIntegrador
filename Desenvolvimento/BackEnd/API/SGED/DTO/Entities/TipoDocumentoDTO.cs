using System.ComponentModel.DataAnnotations;

namespace SGED.DTO.Entities
{
	public class TipoDocumentoDTO
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "O nome do TipoDocumento é requerido!")]
		[MinLength(3)]
		[MaxLength(40)]
		public string NomeTipoDocumento { get; set; }

		[Required(ErrorMessage = "A descrição do TipoDocumento é requerida!")]
		[MinLength(5)]
		[MaxLength(450)]
		public string DescricaoTipoDocumento { get; set; }
	}
}
