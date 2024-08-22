using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
	public class DocumentoProcessoDTO
	{
		public int Id { get; set; }

		[Required(ErrorMessage = "A descrição é requerida!")]
		public string Descricao { get; set; }

		[Required(ErrorMessage = "A observação é requerida!")]
		[MinLength(5)]
		[MaxLength(70)]
		public string Observacao { get; set; }

		[Required(ErrorMessage = "A situação é requerida!")]
		[EmailAddress]
		public string Situacao { get; set; }

		[Required(ErrorMessage = "O documento é requerido!")]
		[MinLength(15)]
		[MaxLength(15)]
		public byte[] Documento { get; set; }

		[Required(ErrorMessage = "O Tipo Documento é requerido!")]
		public int IdTipoDocumento { get; set; }


		[JsonIgnore]
		public EstadoDTO? EstadoDTO { get; set; }

	}

}