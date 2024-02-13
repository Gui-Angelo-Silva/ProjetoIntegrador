using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
	public class EtapaDTO
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "O nome da etapa é requerido!")]
		[MinLength(3)]
		[MaxLength(50)]
		public string NomeEtapa { get; set; }

		[Required(ErrorMessage = "A descrição da etapa é requerida!")]
		[MinLength(5)]
		[MaxLength(250)]
		public string DescricaoEtapa { get; set; }

		[JsonIgnore]
		public TipoProcessoDTO? TipoProcessoDTO { get; set; }

		[Required(ErrorMessage = "O TipoProcesso é requerido!")]
		public int IdTipoProcesso { get; set; }
	}
}
