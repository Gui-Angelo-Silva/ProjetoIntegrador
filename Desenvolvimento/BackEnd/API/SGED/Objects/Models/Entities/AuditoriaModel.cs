using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace SGED.Objects.Models.Entities
{
    [Table("auditoria")]
    public class AuditoriaModel
    {
        [Column("idauditoria")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column("endpointauditoria")]
        public string EndpointAuditoria { get; set; }

        [Column("tabelaauditoria")]
        public string TabelaAuditoria { get; set; }

        [Column("registroauditoria")]
        public int RegistroAuditoria { get; set; }

        [Column("acaoauditoria")]
        public string AcaoAuditoria { get; set; }

        [Column("statusrequisicao")]
        public string StatusRequisicao { get; set; }

        [Column("dataauditoria")]
        public string DataAuditoria { get; set; }

        [Column("horaauditoria")]
        public string HoraAuditoria { get; set; }

        [Column("descricaoauditoria")]
        public string DescricaoAuditoria { get; set; }

        [Column("idsessao")]
        public Guid IdSessao { get; set; }


        public SessaoModel? Sessao { get; set; }
    }
}
