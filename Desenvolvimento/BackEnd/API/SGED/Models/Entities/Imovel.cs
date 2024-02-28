using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Models.Entities
{
	[Table("imovel")]
	public class Imovel
	{
		[Column("idimovel")]
		public int Id { get; set; }

		[Column("numeroimovel")]
		public string NumeroImovel { get; set; }

		public Logradouro? Logradouro { get; set; }

		[ForeignKey("idlogradouro")]
		public int IdLogradouro { get; set; }	

		public Municipe? Municipe { get; set; }

		[ForeignKey("idmunicipe")]
		public int IdMunicipe { get; set; }
	}
}
