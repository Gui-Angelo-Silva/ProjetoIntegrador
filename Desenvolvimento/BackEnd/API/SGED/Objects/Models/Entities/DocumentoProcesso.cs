using SGED.Objects.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("documentoprocesso")]
    public class DocumentoProcesso
    {
        [Column("iddocumentoprocesso")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; } // Alterado para GUID

        [Column("identificacaodocumento")]
        public string IdentificacaoDocumento { get; set; }

        [Column("descricaodocumento")]
        public string DescricaoDocumento { get; set; }

        [Column("observacaodocumento")]
        public string ObservacaoDocumento { get; set; }

        [Column("arquivodocumento")]
        public byte[] ArquivoDocumento { get; set; }

        [Column("statusdocumentoprocesso")]
        public StatusProcessModel Status { get; set; }

        [ForeignKey("idprocesso")]
        public int IdProcesso { get; set; }

        [Column("idtipodocumentoetapa")]
        public int IdTipoDocumentoEtapa { get; set; }

        [ForeignKey("idresponsavel")]
        public int IdResponsavel { get; set; }

        [Column("idaprovador")]
        public int? IdAprovador { get; set; } // Tornado opcional


        public Processo? Processo { get; set; }
        public TipoDocumentoEtapa? TipoDocumentoEtapa { get; set; }
        public Usuario? Responsavel { get; set; }
        public Usuario? Aprovador { get; set; }
    }
}
