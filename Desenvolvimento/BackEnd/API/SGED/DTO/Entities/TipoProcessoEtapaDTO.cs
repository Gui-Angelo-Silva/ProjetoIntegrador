using SGED.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    public class TipoProcessoEtapaDTO
    {
        public int Id { get; set; }

        [JsonIgnore]
        public TipoProcessoDTO? TipoProcessoDTO { get; set; }

        [Required(ErrorMessage = "O TipoProcesso é requerido!")]
        public int IdTipoProcesso { get; set; }
		public Etapa? Etapa { get; set; }

		[Required(ErrorMessage = "A Etapa é requerida!")]
		public int IdEtapa { get; set; }

	}
}
