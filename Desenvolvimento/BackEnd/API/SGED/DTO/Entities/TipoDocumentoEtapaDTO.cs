using SGED.Models.Entities;
using SGED.Objects.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    public class TipoDocumentoEtapaDTO : IStatus
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O status é requerido!")]
        public bool Status { get; set; }

        [JsonIgnore]
        public TipoDocumentoDTO? TipoDocumentoDTO { get; set; }

        [Required(ErrorMessage = "O Tipo Documento é requerido!")]
        public int IdTipoDocumento { get; set; }

		[JsonIgnore]
		public Etapa? EtapaDTO { get; set; }

		[Required(ErrorMessage = "A Etapa é requerida!")]
		public int IdEtapa { get; set; }

    }
}
