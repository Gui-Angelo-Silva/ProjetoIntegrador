using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("processo")]
    public class Processo
    {
        [Column("idprocesso")]
        public int Id { get; set; }

        [Column("statusprocesso")]
        public string StatusProcesso { get; set; }

        [Column("dataaprovacao")]
        public string DataAprovacao { get; set; }

        [Column("situacaoproceso")]
        public string SituacaoProcesso { get; set; }

        [ForeignKey("idimovel")]
        public int IdImovel { get; set; }

        [ForeignKey("idtipoprocesso")]
        public int IdTipoProcesso { get; set; }

        [ForeignKey("idengenheiro")]
        public int IdEngenheiro { get; set; }

        [ForeignKey("idfiscal")]
        public int IdFiscal { get; set; }

        public Imovel? Imovel { get; set; }
        public TipoProcesso? TipoProcesso { get; set; }
        public Engenheiro? Engenheiro { get; set; }
        public Fiscal? Fiscal { get; set; }

        public ICollection<DocumentoProcesso>? DocumentosProcesso { get; set; }
    }
}