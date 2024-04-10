using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Models.Entities
{
    [Table("usuario")]
    public class Usuario : Pessoa
    {
        [Column("idusuario")]
        public int Id { get; set; }

        [Column("senhausuario")]
        public string SenhaUsuario { get; set; }

        [Column("cargousuario")]
        public string CargoUsuario { get; set; }

        [Column("statususuario")]
        public Boolean StatusUsuario { get; set; }

        public TipoUsuario? TipoUsuario { get; set; }

        [ForeignKey("idtipousuario")]
        public int IdTipoUsuario { get; set; }

        public ICollection<Sessao>? Sessoes { get; set; }

    }
}
