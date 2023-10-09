using System.ComponentModel.DataAnnotations;

namespace SGED.DTO.Entities
{
    public class PessoaDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(10)]
        [MaxLength(70)]
        public string? Nome { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "O e-mail é requerido!")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "A nome é requerida!")]
        [MinLength(6)]
        [MaxLength(50)]
        public string? Senha { get; set; }

        [Required(ErrorMessage = "O telefone é requerido!")]
        [MinLength(20)]
        [MaxLength(20)]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "O CPF ou CNPJ é requerido!")]
        [MinLength(15)]
        [MaxLength(15)]
        public string? CpfCNPJ { get; set; }

        [Required(ErrorMessage = "O RG ou IE é requerido!")]
        [MinLength(15)]
        [MaxLength(15)]
        public string? RgIE { get; set; }
    }
}
