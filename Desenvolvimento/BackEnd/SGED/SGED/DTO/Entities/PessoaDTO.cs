using System.ComponentModel.DataAnnotations;

namespace SGED.DTO.Entities
{
    public class PessoaDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Preencha o campo nome!")]
        [MinLength(10)]
        [MaxLength(70)]
        public string? Nome { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Preencha o campo email!")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Preencha o campo senha!")]
        [MinLength(6)]
        [MaxLength(50)]
        public string? Senha { get; set; }

        [Required(ErrorMessage = "Preencha o campo número!")]
        [MinLength(20)]
        [MaxLength(20)]
        public string? Telefone { get; set; }

        [Required(ErrorMessage = "Preencha o campo CPF!")]
        [MinLength(15)]
        [MaxLength(15)]
        public string? CpfCNPJ { get; set; }

        [Required(ErrorMessage = "Preencha o campo RG!")]
        [MinLength(15)]
        [MaxLength(15)]
        public string? RgIE { get; set; }
    }
}
