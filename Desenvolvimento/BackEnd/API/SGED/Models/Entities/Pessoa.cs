using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SGED.DTO.Entities;

namespace SGED.Models.Entities
{
    public class Pessoa
    {
        [Column("nomepessoa")]
        public string NomePessoa { get; set; }

        [Column("emailpessoa")]
        public string EmailPessoa { get; set; }

        [Column("telefonepessoa")]
        public string TelefonePessoa { get; set; }

        [Column("cpfcnpjpessoa")]
        public string CpfCNPJPessoa { get; set; }

        [Column("rgiepessoa")]
        public string RgIEPessoa { get; set; }
    }
}