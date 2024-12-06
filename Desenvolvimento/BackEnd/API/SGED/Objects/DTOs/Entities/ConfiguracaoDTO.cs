using SGED.Objects.Enums;
using System.ComponentModel.DataAnnotations;

namespace SGED.Objects.DTOs.Entities
{
	public class ConfiguracaoDTO
	{
		public int Id { get; set; }

		[Required]
		public bool Valor { get; set; }

		[Required]
		public string Descricao { get; set; }

		public TipoConfiguracao TipoConfiguracao { get; set; }
	}
}