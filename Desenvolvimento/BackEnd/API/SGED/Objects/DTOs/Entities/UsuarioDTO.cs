using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using SGED.Objects.Interfaces.Pessoa;
using SGED.Objects.Utilities;

namespace SGED.Objects.DTOs.Entities
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
        public string SenhaUsuario
        {
            get => senhaUsuario;
            set
            {
                senhaUsuario = value.GenerateHash();
            }
        }

        // Propriedade que armazena a senha em texto claro
        private string senhaUsuario;

        [Required(ErrorMessage = "O cargo é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        public string CargoUsuario { get; set; }

        public bool StatusUsuario { get; set; }

        public int IdTipoUsuario { get; set; }


        [JsonIgnore]
        public TipoUsuarioDTO? TipoUsuarioDTO { get; set; }

        [JsonIgnore]
        public ICollection<SessaoDTO>? SessoesDTO { get; set; }

        [JsonIgnore]
        public ICollection<AuditoriaDTO>? AuditoriasDTO { get; set; }

        [JsonIgnore]
        public ICollection<ProcessoDTO>? ProcessosAdicionadosDTO { get; set; }

        [JsonIgnore]
        public ICollection<ProcessoDTO>? ProcessosAprovadosDTO { get; set; }

        [JsonIgnore]
        public ICollection<DocumentoProcessoDTO>? DocumentosAdicionadosDTO { get; set; }

        [JsonIgnore]
        public ICollection<DocumentoProcessoDTO>? DocumentosAprovadosDTO { get; set; }


        public bool Email() => IPessoaExtensions.VerificarEmail(this.EmailPessoa);
        public int CpfCnpj() => IPessoaExtensions.CpfCnpj(this);
        public int RgIe() => IPessoaExtensions.RgIe(this);
    }
}
