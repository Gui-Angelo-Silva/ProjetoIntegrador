using SGED.Objects.Enums.Status;
using SGED.Objects.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
    public class ProcessoDTO
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O código de identificação é requerido!")]
        [MaxLength(50)]
        public string IdentificacaoProcesso { get; set; }

        [MaxLength(300)]
        public string DescricaoProcesso { get; set; }

        [MaxLength(300)]
        public string SituacaoProcesso { get; set; }

        [MaxLength(10)]
        public string DataAprovacao { get; set; }

        [Required(ErrorMessage = "O stauts é requerido!")]
        public StatusProcess Status { get; set; }

        [Required(ErrorMessage = "O imóvel é requerido!")]
        public int IdImovel { get; set; }

        [Required(ErrorMessage = "O tipo processo é requerido!")]
        public int IdTipoProcesso { get; set; }

        public int? IdEngenheiro { get; set; }

        public int? IdFiscal { get; set; }

        public int? IdResponsavel { get; set; }

        public int? IdAprovador { get; set; }


        [JsonIgnore]
        public ImovelDTO? ImovelDTO { get; set; }
        [JsonIgnore]
        public TipoProcessoDTO? TipoProcessoDTO { get; set; }
        [JsonIgnore]
        public EngenheiroDTO? EngenheiroDTO { get; set; }
        [JsonIgnore]
        public FiscalDTO? FiscalDTO { get; set; }
        [JsonIgnore]
        public UsuarioDTO? ResponsavelDTO { get; set; }
        [JsonIgnore]
        public UsuarioDTO? AprovadorDTO { get; set; }
        public ICollection<DocumentoProcessoDTO>? DocumentosProcessoDTOs { get; set; }


        public void AssignDefaultState() => Status = StatusProcessExtensions.AssignDefaultState();
        public void PutOnPending() => Status = StatusProcessExtensions.PutInProgress();
        public void MoveToAnalysis() => Status = StatusProcessExtensions.MoveToAnalysis();
        public void Approve() => Status = StatusProcessExtensions.Approve();
        public void Disapprove() => Status = StatusProcessExtensions.Disapprove();
    }
}
