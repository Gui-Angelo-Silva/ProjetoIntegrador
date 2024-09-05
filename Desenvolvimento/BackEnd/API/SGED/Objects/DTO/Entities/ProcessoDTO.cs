using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
    public class ProcessoDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O status do Processo é requerido!")]
        public string StatusProcesso { get; set; }

        [MaxLength(10)]
        public string DataAprovacao {  get; set; }

        [Required(ErrorMessage = "A situação do processo é requerida!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string SituacaoProcesso {  get; set; }

        [Required(ErrorMessage = "O imóvel é requerido!")]
        public int IdImovel { get; set; }

        [Required(ErrorMessage = "O engenheiro é requerido!")]
        public int IdEngenheiro { get; set; }

        [Required(ErrorMessage = "O Fiscal é requerido!")]
        public int IdFiscal { get; set; }

        [Required(ErrorMessage = "O Tipo Processo é requerido!")]
        public int IdTipoProcesso { get; set; }


        [JsonIgnore]
        public ImovelDTO? ImovelDTO { get; set; }

        [JsonIgnore]
        public EngenheiroDTO? EngenheiroDTO { get; set; }

        [JsonIgnore]
        public FiscalDTO? FiscalDTO { get; set; }

        [JsonIgnore]
        public TipoProcessoDTO? TipoProcessoDTO { get; set; }

        [JsonIgnore]
        public ICollection<DocumentoProcessoDTO>? DocumentoProcessoDTOs { get; set; }
    }
}
