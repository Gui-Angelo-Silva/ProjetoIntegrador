using SGED.DTO.Entities;
using SGED.Objects.Interfaces.Pessoa;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTO.Entities
{
    public class EngenheiroDTO : IPessoa, IEngenheiro
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "A imagem é requerida!")]
        public string ImagemPessoa { get; set; }

        [Required(ErrorMessage = "O nome é requerido!")]
        [MinLength(5)]
        [MaxLength(70)]
        public string NomePessoa { get; set; }

        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        public string EmailPessoa { get; set; }

        [Required(ErrorMessage = "O telefone é requerido!")]
        [MinLength(15)]
        [MaxLength(15)]
        public string TelefonePessoa { get; set; }

        [Required(ErrorMessage = "O CPF ou CNPJ é requerido!")]
        [MinLength(14)]
        [MaxLength(18)]
        public string CpfCnpjPessoa { get; set; }

        [Required(ErrorMessage = "O RG ou IE é requerido!")]
        [MinLength(12)]
        [MaxLength(15)]
        public string RgIePessoa { get; set; }

        [Required(ErrorMessage = "O CREA é requerido!")]
        [MinLength(8)]
        [MaxLength(8)]
        public string CreaEngenheiro { get; set; }

        [JsonIgnore]
        public ICollection<InstalacaoDTO>? InstalacoesDTOs { get; set; }


        public int CpfCnpj() => IPessoaExtensions.CpfCnpj(this);
        public int RgIe() => IPessoaExtensions.RgIe(this);
        public int Crea() => IEngenheiroExtensions.Crea(this);
    }

}