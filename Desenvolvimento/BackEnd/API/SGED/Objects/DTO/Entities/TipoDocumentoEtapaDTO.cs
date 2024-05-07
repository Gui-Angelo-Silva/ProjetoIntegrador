using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.DTO.Entities
{
	public class TipoDocumentoEtapaDTO : IStatus, IPosicao
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "A posição é requerida!")]
		public int Posicao { get; set; }

		[Required(ErrorMessage = "O status é requerido!")]
		public bool Status { get; set; }

		[JsonIgnore]
		public TipoDocumentoDTO? TipoDocumentoDTO { get; set; }

		[Required(ErrorMessage = "O Tipo Documento é requerido!")]
		public int IdTipoDocumento { get; set; }

		[JsonIgnore]
		public EtapaDTO? EtapaDTO { get; set; }

		[Required(ErrorMessage = "A Etapa é requerida!")]
		public int IdEtapa { get; set; }
		public void DisableAllOperations() => IStatusExtensions.DisableAllOperations(this);
		public void EnableAllOperations() => IStatusExtensions.EnableAllOperations(this);
	}
}
