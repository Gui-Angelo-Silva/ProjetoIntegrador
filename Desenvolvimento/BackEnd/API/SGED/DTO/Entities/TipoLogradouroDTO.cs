using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.DTO.Entities
{
	public class TipoLogradouroDTO
	{
		public int Id { get; set; }
		
		[Required(ErrorMessage = "O nome da rua é requerido!")]
		[MinLength(4)]
		[MaxLength(58)] //Coloquei este valor pois o maior nome de rua existente no mundo, possui essa quantidade de letras
		public string Rua { get; set; }
	}
}
