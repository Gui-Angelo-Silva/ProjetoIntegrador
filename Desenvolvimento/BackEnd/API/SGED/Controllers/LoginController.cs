using Jose;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SGED.DTO.Entities;
using SGED.Models.Entities;
using SGED.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Newtonsoft.Json;

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
        public async Task<ActionResult> Autentication([FromBody] AutenticationDTO autenticationDTO)
        {
            if (autenticationDTO is null) return BadRequest("Dado inválido!");
            var usuarioDTO = await _usuarioService.Autentication(autenticationDTO);

            if (!(usuarioDTO is null))
            {
                if (autenticationDTO.Email == usuarioDTO.EmailUsuario && autenticationDTO.Senha == usuarioDTO.SenhaUsuario)
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
        public ActionResult Validation([FromBody] ValidationDTO validationDTO)
        {
            if (validationDTO is null) return BadRequest(new { validation = "false", message = "Dado inválido!" });

            EntitySecurityDTO entitySecurityDTO = new EntitySecurityDTO();
            if (ValidateToken(validationDTO.Token, entitySecurityDTO.Issuer, entitySecurityDTO.Audience, validationDTO.Email))
            {
                return Ok(new { validation = "true" });
            }
            else
            {
                return Unauthorized(new { validation = "false", message = "Acesso negado!" });
            }
        }

        private bool ValidateToken(string token, string issuer, string audience, string expectedEmail)
        {
            // Passo 1: Verificar se o token tem três partes
            string[] tokenParts = token.Split('.');
            if (tokenParts.Length != 3)
            {
                return false;
            }

            try
            {
                // Passo 2: Decodificar o token
                string decodedToken = Encoding.UTF8.GetString(Base64Url.Decode(tokenParts[1]));

                // Passo 3: Verificar iss, aud e sub
                var payload = JsonConvert.DeserializeObject<Dictionary<string, object>>(decodedToken);
                if (!payload.TryGetValue("iss", out object issuerClaim) ||
                    !payload.TryGetValue("aud", out object audienceClaim) ||
                    !payload.TryGetValue("sub", out object subjectClaim))
                {
                    return false;
                }

                if (issuerClaim.ToString() != issuer || audienceClaim.ToString() != audience || subjectClaim.ToString() != expectedEmail)
                {
                    return false;
                }

                // Passo 4: Verificar se o tempo expirou
                if (payload.TryGetValue("exp", out object expirationClaim))
                {
                    long expirationTime = long.Parse(expirationClaim.ToString());
                    var expirationDateTime = DateTimeOffset.FromUnixTimeSeconds(expirationTime).UtcDateTime;
                    if (expirationDateTime < DateTime.UtcNow)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }

                // Passo 5: Se tudo estiver certo
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
