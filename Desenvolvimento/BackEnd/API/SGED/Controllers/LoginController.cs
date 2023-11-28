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

        [HttpPost]
        public async Task<ActionResult> Login([FromBody] LoginDTO loginDTO)
        {
            if (loginDTO is null) return BadRequest("Dado inválido!");
            var usuarioDTO = await _usuarioService.Login(loginDTO);

            if (!(usuarioDTO is null))
            {
                if (loginDTO.Email == usuarioDTO.EmailPessoa && loginDTO.Senha == usuarioDTO.SenhaUsuario)
                {
                    string GenerateToken(string username)
                    {
                        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("SGED_BarramentUser_API_Autentication"));
                        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                        var token = new JwtSecurityToken(
                            issuer: "Server API",
                            audience: "WebSite",
                            claims: new[] { new Claim(ClaimTypes.Name, username) },
                            expires: DateTime.Now.AddHours(1),
                            signingCredentials: credentials
                        );

                        return new JwtSecurityTokenHandler().WriteToken(token);
                    }

                    var token = GenerateToken(usuarioDTO.NomePessoa);
                    return Ok(new { token, usuario = usuarioDTO });
                }
            }

            return Unauthorized(new { message = "E-mail ou senha incorretos!" });
        }

    }
}
