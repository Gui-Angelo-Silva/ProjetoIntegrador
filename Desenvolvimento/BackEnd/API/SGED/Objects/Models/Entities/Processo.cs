using SGED.Objects.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("processo")]
    public class Processo
    {
        [Column("idprocesso")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column("identificacaoprocesso")]
        public string IdentificacaoProcesso { get; set; }

        [Column("descricaoprocesso")]
        public string DescricaoProcesso { get; set; }

        [Column("situacaoproceso")]
        public string SituacaoProcesso { get; set; }

        [Column("dataaprovacao")]
        public string DataAprovacao { get; set; }

        [Column("statusprocesso")]
        public StatusProcessModel Status { get; set; }

        [ForeignKey("idimovel")]
        public int IdImovel { get; set; }

        [ForeignKey("idtipoprocesso")]
        public int IdTipoProcesso { get; set; }

        [ForeignKey("idengenheiro")]
        public int IdEngenheiro { get; set; }

        [ForeignKey("idfiscal")]
        public int IdFiscal { get; set; }

        [ForeignKey("idresponsavel")]
        public int IdResponsavel { get; set; }

        [ForeignKey("idaprovador")]
        public int IdAprovador { get; set; }


        public Imovel? Imovel { get; set; }
        public TipoProcesso? TipoProcesso { get; set; }
        public Engenheiro? Engenheiro { get; set; }
        public Fiscal? Fiscal { get; set; }
        public Usuario? Responsavel { get; set; }
        public Usuario? Aprovador { get; set; }

        public ICollection<DocumentoProcesso>? DocumentosProcesso { get; set; }

    }
}