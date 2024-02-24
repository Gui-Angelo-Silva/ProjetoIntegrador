using SGED.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
	public class LogradouroDTO
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "CEP do bairro requerido!")]
		[MinLength(9)]
		[MaxLength(9)]
		public string Cep { get; set; }

		[MinLength(1)]
		[MaxLength(10)]
		public string NumeroInicial { get; set; }

		[MinLength(1)]
		[MaxLength(10)]
		public string NumeroFinal { get; set; }

		[JsonIgnore]
		public Bairro? Bairro { get; set; }

		[Required(ErrorMessage = "O Bairro é requerido!")]
		public int IdBairro { get; set; }

		[JsonIgnore]
		public TipoLogradouro? TipoLogradouro { get; set; }

		[Required(ErrorMessage = "O Tipo de logradouro é requerido!")]
		public int IdTipoLogradouro { get; set; }

		[JsonIgnore]
		public ICollection<ImovelDTO> ImovelDTOs { get; set; }
	}
}
