using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class AuditoriaDTO
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "O endpoint é requerido!")]
        public string EndpointAuditoria { get; set; }

        [Required(ErrorMessage = "A tabela é requerida!")]
        public string TabelaAuditoria { get; set; }

        public int RegistroAuditoria { get; set; }

        [Required(ErrorMessage = "A ação realizada é requerida!")]
        public string AcaoAuditoria { get; set; }

        public string StatusRequisicao { get; set; }

        [Required(ErrorMessage = "A dade é requerida!")]
        public string DataAuditoria { get; set; }

        [Required(ErrorMessage = "A hora é requerida!")]
        public string HoraAuditoria { get; set; }

        public string DescricaoAuditoria { get; set; }

        public Guid IdSessao { get; set; }


        [JsonIgnore]
        public SessaoDTO? SessaoDTO { get; set; }
    }
}
