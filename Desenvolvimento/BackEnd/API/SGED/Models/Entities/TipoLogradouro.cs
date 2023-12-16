using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Models.Entities
{
	[Table("tipologradouro")]
	public class TipoLogradouro
	{
		[Column("idtipologradouro")]
		public int Id { get; set; }

		[Column("rua")]
		public string Rua { get; set; }
	}
}
