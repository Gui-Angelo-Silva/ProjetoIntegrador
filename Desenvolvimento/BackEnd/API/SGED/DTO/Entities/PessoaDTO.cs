using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.DTO.Entities
{
    [Table("pessoa")]
    public class PessoaDTO
    {
        [Column("idpessoa")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(10)]
        [MaxLength(70)]
        [Column("nomepessoa")]
        public string Nome { get; set; }
        
        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        [Column("emailpessoa")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A nome é requerida!")]
        [MinLength(6)]
        [MaxLength(50)]
        [Column("senhapessoa")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "O telefone é requerido!")]
        [MinLength(15)]
        [MaxLength(19)]
        [Column("telefonepessoa")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O CPF ou CNPJ é requerido!")]
        [MinLength(14)]
        [MaxLength(18)]
        [Column("cpfcnpjpessoa")]
        public string CpfCNPJ { get; set; }

        [Required(ErrorMessage = "O RG ou IE é requerido!")]
        [MinLength(12)]
        [MaxLength(15)]
        [Column("rgiepessoa")]
        public string RgIE { get; set; }
    }
}
