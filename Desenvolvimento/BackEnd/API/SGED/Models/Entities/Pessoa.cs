using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using SGED.DTO.Entities;

namespace SGED.Models.Entities
{
    [Table("pessoa")]
    public class Pessoa
    {
        [Column("idpessoa")]
        public int Id { get; set; }

        [Column("nomepessoa")]
        public string Nome { get; set; }

        [Column("emailpessoa")]
        public string Email { get; set; }

        [Column("senhapessoa")]
        public string Senha { get; set; }

        [Column("telefonepessoa")]
        public string Telefone { get; set; }

        [Column("cpfcnpjpessoa")]
        public string CpfCNPJ { get; set; }

        [Column("rgiepessoa")]
        public string RgIE { get; set; }
    }
}