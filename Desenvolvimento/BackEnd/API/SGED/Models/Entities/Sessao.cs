using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Models.Entities
{
    [Table("sessao")]
    public class Sessao
    {
        [Column("idsessao")]
        public int Id { get; set; }

        [Column("datahoraabertura")]
        public string DataHoraAbertura { get; set; }

        [Column("datahorafechamento")]
        public string? DataHoraFechamento { get; set; }

        [Column("tokensessao")]
        public string TokenSessao { get; set; }

        [Column("statussessao")]
        public Boolean StatusSessao { get; set; }

        public Usuario? Usuario { get; set; }

        [ForeignKey("idusuario")]
        public int IdUsuario { get; set; }

    }
}
