using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;
using SGED.Objects.Interfaces.Pessoa;

namespace SGED.Objects.Models.Entities
{
    [Table("fiscal")]
    public class Fiscal : IPessoa
    {
        [Column("idfiscal")]
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

        public ICollection<Processo>? Processos { get; set; }
    }
}