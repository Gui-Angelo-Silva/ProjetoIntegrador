using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SGED.Objects.Interfaces.Pessoa;

namespace SGED.Objects.Models.Entities
{
    [Table("usuario")]
    public class Usuario : IPessoa
    {
        [Column("idusuario")]
        public int Id { get; set; }

        [Column("imagempessoa")]
        public string ImagemPessoa { get; set; }

        [Column("nomepessoa")]
        public string NomePessoa { get; set; }

        [Column("emailpessoa")]
        public string EmailPessoa { get; set; }

        [Column("telefonepessoa")]
        public string TelefonePessoa { get; set; }

        [Column("cpfcnpjpessoa")]
        public string CpfCnpjPessoa { get; set; }

        [Column("rgiepessoa")]
        public string RgIePessoa { get; set; }

        [Column("senhausuario")]
        public string SenhaUsuario { get; set; }

        [Column("cargousuario")]
        public string CargoUsuario { get; set; }

        [Column("statususuario")]
        public bool StatusUsuario { get; set; }

        public TipoUsuario? TipoUsuario { get; set; }

        [Column("idtipousuario")]
        public int IdTipoUsuario { get; set; }

        public ICollection<Sessao>? Sessoes { get; set; }
        public ICollection<Processo>? ProcessosAdicionados { get; set; }
        public ICollection<Processo>? ProcessosAprovados { get; set; }
        public ICollection<DocumentoProcesso>? DocumentosAdicionados { get; set; }
        public ICollection<DocumentoProcesso>? DocumentosAprovados { get; set; }

    }
}
