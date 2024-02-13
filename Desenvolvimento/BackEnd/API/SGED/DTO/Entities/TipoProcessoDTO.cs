using SGED.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    [Table("tipoprocesso")]
    public class TipoProcessoDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do TipoProcesso é requerida!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string NomeTipoProcesso { get; set; }

		[Required(ErrorMessage = "A descrição do TipoProcesso é requerida!")]
		[MinLength(3)]
		[MaxLength(100)]
		public string DescricaoTipoProcesso { get; set; }

        [JsonIgnore]
        public ICollection<EtapaDTO>? EtapaDTOs { get; set; }
    }
}
