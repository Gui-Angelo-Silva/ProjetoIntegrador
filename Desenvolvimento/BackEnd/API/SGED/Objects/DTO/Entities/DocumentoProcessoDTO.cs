using SGED.DTO.Entities;
using SGED.Objects.Enums;
using SGED.Objects.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
	public class DocumentoProcessoDTO
	{
		public Guid Id { get; set; }

        [Required(ErrorMessage = "A descrição é requerida!")]
        [MaxLength(50)]
        public string IdentificacaoDocumento { get; set; }

        [MaxLength(300)]
        public string DescricaoDocumento { get; set; }

		[MaxLength(300)]
		public string ObservacaoDocumento { get; set; }

		public byte[] DocumentoDocumento { get; set; }

        [Required(ErrorMessage = "O status é requerido!")]
        public StatusProcessModel Status { get; set; }

        [Required(ErrorMessage = "O processo é requerido!")]
        public Guid IdProcesso { get; set; }

        [Required(ErrorMessage = "O documento etapa é requerido!")]
        public int IdTipoDocumentoEtapa { get; set; }

        [Required(ErrorMessage = "O responsavel é requerido!")]
        public int IdResponsavel { get; set; }

        public int IdAprovador { get; set; }


        [JsonIgnore]
        public ProcessoDTO? ProcessoDTO { get; set; }
        [JsonIgnore]
        public TipoDocumentoEtapaDTO? TipoDocumentoEtapaDTO { get; set; }
        [JsonIgnore]
        public UsuarioDTO? ResponsavelDTO { get; set; }
        [JsonIgnore]
        public UsuarioDTO? AprovadorDTO { get; set; }


        public void AssignDefaultState() => Status = StatusProcessModelExtensions.AssignDefaultState();
        public void PutOnPending() => Status = StatusProcessModelExtensions.PutOnPending();
        public void MarkAsAttached() => Status = StatusProcessModelExtensions.MarkAsAttached();
        public void Approve() => Status = StatusProcessModelExtensions.Approve();
        public void Disapprove() => Status = StatusProcessModelExtensions.Disapprove();

    }

}