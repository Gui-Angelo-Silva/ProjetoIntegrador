using SGED.Objects.Interfaces.Pessoa;
using SGED.Objects.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class MunicipeDTO : IPessoa
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
        [MaxLength(20)]
        public string TelefonePessoa { get; set; }

        [Required(ErrorMessage = "O CPF ou CNPJ é requerido!")]
        [MinLength(14)]
        [MaxLength(18)]
        public string CpfCnpjPessoa { get; set; }

        [Required(ErrorMessage = "O RG ou IE é requerido!")]
        [MinLength(12)]
        [MaxLength(15)]
        public string RgIePessoa { get; set; }


        [JsonIgnore]
        public ICollection<ImovelDTO>? ImoveisProprietarioDTO { get; set; }
        [JsonIgnore]
        public ICollection<ImovelDTO>? ImoveisContribuinteDTO { get; set; }


        public bool Email() => IPessoaExtensions.VerificarEmail(this.EmailPessoa);
        public int CpfCnpj() => IPessoaExtensions.CpfCnpj(this);
        public int RgIe() => IPessoaExtensions.RgIe(this);
    }
}
