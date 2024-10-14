using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using SGED.Objects.Interfaces.Pessoa;

namespace SGED.Objects.DTO.Entities
{
    public class UsuarioDTO : IPessoa
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

        [Required(ErrorMessage = "A senha é requerida!")]
        [MinLength(6)]
        [MaxLength(50)]
        public string SenhaUsuario { get; set; }

        [Required(ErrorMessage = "O cargo é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        public string CargoUsuario { get; set; }

        public bool StatusUsuario { get; set; }


        //[JsonIgnore]
        public TipoUsuarioDTO? TipoUsuarioDTO { get; set; }

        public int IdTipoUsuario { get; set; }

        [JsonIgnore]
        public ICollection<SessaoDTO>? SessoesDTO { get; set; }


        public bool Email() => IPessoaExtensions.VerificarEmail(this.EmailPessoa);
        public int CpfCnpj() => IPessoaExtensions.CpfCnpj(this);
        public int RgIe() => IPessoaExtensions.RgIe(this);

    }
}
