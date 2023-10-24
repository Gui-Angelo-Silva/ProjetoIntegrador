using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.DTO.Entities
{
    [Table("Pessoa")]
    public class PessoaDTO
    {
        [Column("idPessoa")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(10)]
        [MaxLength(70)]
        [Column("nomePessoa")]
        public string Nome { get; set; }
        
        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        [Column("emailPessoa")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A nome é requerida!")]
        [MinLength(6)]
        [MaxLength(50)]
        [Column("senhaPessoa")]
        public string Senha { get; set; }

        [Required(ErrorMessage = "O telefone é requerido!")]
        [MinLength(15)]
        [MaxLength(19)]
        [Column("telefonePessoa")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O CPF ou CNPJ é requerido!")]
        [MinLength(14)]
        [MaxLength(18)]
        [Column("cpfCnpjPessoa")]
        public string CpfCNPJ { get; set; }

        [Required(ErrorMessage = "O RG ou IE é requerido!")]
        [MinLength(12)]
        [MaxLength(15)]
        [Column("rgIePessoa")]
        public string RgIE { get; set; }
    }
}
