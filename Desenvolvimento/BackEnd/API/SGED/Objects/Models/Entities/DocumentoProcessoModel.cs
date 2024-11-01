using SGED.Objects.Enums.Status;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("documentoprocesso")]
    public class DocumentoProcessoModel
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

        [Column("arquivo")]
        public string Arquivo { get; set; }

        [Column("statusdocumentoprocesso")]
        public StatusDocumentProcess Status { get; set; }

        [Column("idprocesso")]
        public Guid IdProcesso { get; set; }

        [Column("idtipodocumentoetapa")]
        public int IdTipoDocumentoEtapa { get; set; }

        [Column("idresponsavel")]
        public int? IdResponsavel { get; set; }

        [Column("idaprovador")]
        public int? IdAprovador { get; set; }


        public ProcessoModel? Processo { get; set; }
        public TipoDocumentoEtapaModel? TipoDocumentoEtapa { get; set; }
        public UsuarioModel? Responsavel { get; set; }
        public UsuarioModel? Aprovador { get; set; }
    }
}
