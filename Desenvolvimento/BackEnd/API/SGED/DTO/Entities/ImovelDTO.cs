using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
	public class ImovelDTO
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "Número do imóvel é requerido!")]
		[MinLength(1)]
		[MaxLength(6)]
		public string NumeroImovel { get; set; }

		[JsonIgnore]
		public LogradouroDTO? LogradouroDTO { get; set; }

		[Required(ErrorMessage = "Logradouro é requerido!")]
		public int IdLogradouro { get; set; }

		[JsonIgnore]
		public MunicipeDTO MunicipeDTO { get; set; }

		[Required(ErrorMessage = "Munícipe é requerido!")]
		public int IdMunicipe { get;set; }
	}
}
