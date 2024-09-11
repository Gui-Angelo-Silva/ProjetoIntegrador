using SGED.DTO.Entities;
using SGED.Objects.Enums.Status;
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

		public byte[] ArquivoDocumento { get; set; }

        [Required(ErrorMessage = "O status é requerido!")]
        public StatusDocumentProcess Status { get; set; }

        [Required(ErrorMessage = "O processo é requerido!")]
        public Guid IdProcesso { get; set; }

        [Required(ErrorMessage = "O documento etapa é requerido!")]
        public int IdTipoDocumentoEtapa { get; set; }

        public int? IdResponsavel { get; set; }

        public int? IdAprovador { get; set; }


        [JsonIgnore]
        public ProcessoDTO? ProcessoDTO { get; set; }
        [JsonIgnore]
        public TipoDocumentoEtapaDTO? TipoDocumentoEtapaDTO { get; set; }
        [JsonIgnore]
        public UsuarioDTO? ResponsavelDTO { get; set; }
        [JsonIgnore]
        public UsuarioDTO? AprovadorDTO { get; set; }


        public void AssignDefaultState() => Status = StatusDocumentProcessExtensions.AssignDefaultState();
        public void PutOnPending() => Status = StatusDocumentProcessExtensions.PutOnPending();
        public void MarkAsAttached() => Status = StatusDocumentProcessExtensions.MarkAsAttached();
        public void MoveToAnalysis() => Status = StatusDocumentProcessExtensions.MoveToAnalysis();
        public void Approve() => Status = StatusDocumentProcessExtensions.Approve();
        public void Disapprove() => Status = StatusDocumentProcessExtensions.Disapprove();

    }

}