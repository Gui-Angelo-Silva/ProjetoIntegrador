using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;
using SGED.Objects.Interfaces.Pessoa;

namespace SGED.Objects.Models.Entities
{
    [Table("municipe")]
    public class MunicipeModel : IPessoa
    {
        [Column("idmunicipe")]
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

        public ICollection<ImovelModel>? ImoveisProprietario { get; set; }
        public ICollection<ImovelModel>? ImoveisContribuinte { get; set; }
    }
}