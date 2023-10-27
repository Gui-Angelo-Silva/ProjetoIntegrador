using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Models.Entities
{
    [Table("tipousuario")]
    public class TipoUsuario
    {
        [Column("idtipousuario")]
        public int Id { get; set; }

        [Column("nivelacesso")]
        public string NivelAcesso { get; set; }

        [Column("nometipousuario")]
        public string NomeTipoUsuario { get; set; }

        [Column("descricaotipousuario")]
        public string DescricaoTipoUsuario { get; set; }

        public ICollection<Usuario>? Usuarios { get; set; }
    }
}