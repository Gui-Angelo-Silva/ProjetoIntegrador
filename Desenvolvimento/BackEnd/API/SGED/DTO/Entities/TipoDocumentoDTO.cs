using System.ComponentModel.DataAnnotations;
using SGED.Objects.Interfaces;
using SGED.Objects.Helpers;

namespace SGED.DTO.Entities
{
    public class TipoDocumentoDTO : IStatus
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

        [Required(ErrorMessage = "O status é requerido!")]
        public Status Status { get; set; }

    }
}
