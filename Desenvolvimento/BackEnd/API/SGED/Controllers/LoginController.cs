using Jose;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SGED.DTO.Entities;
using SGED.Models.Entities;
using SGED.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private readonly IUsuarioService _usuarioService;

        public LoginController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpPost("Autentication")]
        public async Task<ActionResult> Autentication([FromBody] LoginDTO loginDTO)
        {
            if (loginDTO is null) return BadRequest("Dado inválido!");
            var usuarioDTO = await _usuarioService.Login(loginDTO);

            if (!(usuarioDTO is null))
            {
                if (loginDTO.Email == usuarioDTO.EmailUsuario && loginDTO.Senha == usuarioDTO.SenhaUsuario)
                {
                    EntitySecurityDTO entitySecurity = new EntitySecurityDTO();
                    var token = GenerateToken(entitySecurity.Key, entitySecurity.Issuer, entitySecurity.Audience, usuarioDTO.EmailUsuario, 1);
                    return Ok(new { token, usuario = usuarioDTO });
                }
            }

            return Unauthorized(new { message = "E-mail ou senha incorretos!" });
        }

        private string GenerateToken(string secretKey, string issuer, string audience, string subject, int expiryInMinutes)
        {
            var payload = new Dictionary<string, object>
            {
                { "iss", issuer },
                { "aud", audience },
                { "sub", subject },
                { "exp", DateTimeOffset.UtcNow.AddMinutes(expiryInMinutes).ToUnixTimeSeconds() }
            };

            string token = JWT.Encode(payload, Encoding.UTF8.GetBytes(secretKey), JwsAlgorithm.HS256);
            return token;
        }

        [HttpPost("Validation")]
        public async Task<ActionResult> Validation([FromBody] string email, string token)
        {
            if (email is null || token is null) return BadRequest(new { status = "false", message = "Dado inválido!" });

            if (ValidateToken(token, email))
            {
                return Ok(new { status = "true" });
            }
            else {
                return Unauthorized(new { status = "false", message = "Acesso malicioso!" });
            }
        }

        private bool ValidateToken(string token, string email)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            EntitySecurityDTO entitySecurity = new EntitySecurityDTO();

            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = entitySecurity.Issuer,
                ValidAudience = entitySecurity.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(entitySecurity.Key)),
                ClockSkew = TimeSpan.Zero // Para evitar tempo de tolerância, considerando expiração exata
            };

            try
            {
                SecurityToken jwtSecurityToken;

                // Valida e descriptografa o token
                var principal = tokenHandler.ValidateToken(token, validationParameters, out jwtSecurityToken);

                if (principal is not ClaimsPrincipal claimsPrincipal)
                    return false;

                // Verifica se o token tem três partes
                var identity = claimsPrincipal.Identity as ClaimsIdentity;

                if (identity?.Claims.Count() != 3)
                    return false;

                // Verifica se o email no token é igual ao email passado por parâmetro
                var emailClaim = identity.FindFirst(ClaimTypes.Email)?.Value;

                if (!string.Equals(emailClaim, email, StringComparison.InvariantCultureIgnoreCase))
                    return false;

                // Verifica se o token expirou
                if (jwtSecurityToken.ValidTo < DateTime.UtcNow)
                    return false;

                return true; // Se todas as verificações passaram, o token é válido
            }
            catch (Exception ex)
            {
                // Em caso de erro na validação ou descriptografia do token
                Console.WriteLine(ex.Message);
                return false;
            }
        }


    }
}
