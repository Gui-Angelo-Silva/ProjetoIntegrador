using SGED.Objects.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
	[Table("configuracao")]
	public class Configuracao
	{
		[Column("idconfiguracao")]
		public int Id { get; set; }

		[Column("valorconfiguracao")]
		public bool Valor { get; set; }

		[Column("descricaoconfiguracao")]
		public string Descricao { get; set; }

		[Column("tipoconfiguracao")]
		public TipoConfiguracao TipoConfiguracao { get; set; }
	}
}