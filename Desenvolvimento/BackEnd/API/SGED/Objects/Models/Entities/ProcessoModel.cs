using SGED.Objects.Enums.Status;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("processo")]
    public class ProcessoModel
    {
        [Column("idprocesso")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column("identificacaoprocesso")]
        public string IdentificacaoProcesso { get; set; }

        [Column("descricaoprocesso")]
        public string DescricaoProcesso { get; set; }

        [Column("situacaoprocesso")]
        public string SituacaoProcesso { get; set; }

        [Column("datainicio")]
        public string DataInicio { get; set; }

        [Column("datafinalizacao")]
        public string DataFinalizacao { get; set; }

        [Column("dataaprovacao")]
        public string DataAprovacao { get; set; }

        [Column("statusprocesso")]
        public StatusProcess Status { get; set; }

        [Column("idimovel")]
        public int IdImovel { get; set; }

        [Column("idtipoprocesso")]
        public int IdTipoProcesso { get; set; }

        [Column("idengenheiro")]
        public int? IdEngenheiro { get; set; }

        [Column("idfiscal")]
        public int? IdFiscal { get; set; }

        [Column("idresponsavel")]
        public int? IdResponsavel { get; set; }

        [Column("idaprovador")]
        public int? IdAprovador { get; set; }


        public ImovelModel? Imovel { get; set; }
        public TipoProcessoModel? TipoProcesso { get; set; }
        public EngenheiroModel? Engenheiro { get; set; }
        public FiscalModel? Fiscal { get; set; }
        public UsuarioModel? Responsavel { get; set; }
        public UsuarioModel? Aprovador { get; set; }
        public ICollection<DocumentoProcessoModel>? DocumentosProcesso { get; set; }

    }
}