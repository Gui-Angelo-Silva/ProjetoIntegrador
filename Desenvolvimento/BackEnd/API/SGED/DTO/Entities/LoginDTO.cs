using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "O e-mail é requerido!")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "A senha é requerida!")]
        [MinLength(6)]
        [MaxLength(50)]
        public string Senha { get; set; }
    }
}
