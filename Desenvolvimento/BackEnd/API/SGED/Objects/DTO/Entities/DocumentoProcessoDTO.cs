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
		public int Id { get; set; }

        [Required(ErrorMessage = "A descrição é requerida!")]
        public string Identificacao { get; set; }

        [Required(ErrorMessage = "A descrição é requerida!")]
		public string Descricao { get; set; }

		[Required(ErrorMessage = "A observação é requerida!")]
		[MaxLength(70)]
		public string Observacao { get; set; }

		[Required(ErrorMessage = "O documento é requerido!")]
		public byte[] Documento { get; set; }

        [Required(ErrorMessage = "O status é requerido!")]
        public StatusProcessModel Status { get; set; }

        [Required(ErrorMessage = "O documento é requerido!")]
        public int IdProcesso { get; set; }

        [Required(ErrorMessage = "O documento etapa é requerido!")]
        public int IdTipoDocumentoEtapa { get; set; }

        [Required(ErrorMessage = "O responsavel é requerido!")]
        public int IdResponsavel { get; set; }

        public int IdAprovador { get; set; }


        public ProcessoDTO? ProcessoDTO { get; set; }
        public TipoDocumentoEtapaDTO? TipoDocumentoEtapaDTO { get; set; }
        public UsuarioDTO? ResponsavelDTO { get; set; }
        public UsuarioDTO? AprovadorDTO { get; set; }


        public void AssignDefaultState() => Status = StatusProcessModelExtensions.AssignDefaultState();
        public void PutOnPending() => Status = StatusProcessModelExtensions.PutOnPending();
        public void MarkAsAttached() => Status = StatusProcessModelExtensions.MarkAsAttached();
        public void MoveToAnalysis() => Status = StatusProcessModelExtensions.MoveToAnalysis();
        public void Approve() => Status = StatusProcessModelExtensions.Approve();

    }

}