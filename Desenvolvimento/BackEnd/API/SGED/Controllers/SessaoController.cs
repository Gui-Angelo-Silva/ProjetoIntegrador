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
using System.Diagnostics.Eventing.Reader;
using MySqlX.XDevAPI;
using SGED.Services.Entities;
using Microsoft.AspNetCore.Authorization;
using SGED.Services.Server.Attributes;
using SGED.Helpers;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class SessaoController : Controller
    {
        private readonly ISessaoService _sessaoService;
        private readonly IUsuarioService _usuarioService;
        private readonly ITipoUsuarioService _tipoUsuarioService;

        public SessaoController(ISessaoService sessaoService, IUsuarioService usuarioService, ITipoUsuarioService tipoUsuarioService)
        {
            _sessaoService = sessaoService;
            _usuarioService = usuarioService;
            _tipoUsuarioService = tipoUsuarioService;
        }

        [HttpGet("GetOnlineUsers")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetOnlineUsers()
        {
            var usuariosDTO = await _sessaoService.GetOnlineUsers();
            return Ok(usuariosDTO);
        }

        [HttpGet("GetOfflineUsers")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetOfflineUsers()
        {
            var usuariosDTO = await _sessaoService.GetOfflineUsers();
            return Ok(usuariosDTO);
        }

        [HttpGet("GetSession")]
        public async Task<ActionResult<SessaoDTO>> GetSession([FromQuery] TokenAcess token)
        {
            if (token is null) return BadRequest(new { status = false, response = "Dados inválidos!" });

            var sessaoDTO = await _sessaoService.GetByToken(token.Token);

            return Ok(new { status = true, response = sessaoDTO });
        }

        [HttpGet("GetUser")]
        public async Task<ActionResult<UsuarioDTO>> GetUser([FromQuery] TokenAcess token)
        {
            if (token is null) return BadRequest(new { status = false, response = "Dados inválidos!" });

            var sessaoDTO = await _sessaoService.GetByToken(token.Token);
            var usuarioDTO = await _sessaoService.GetUser(sessaoDTO.IdUsuario);

            return Ok(new { status = true, response = usuarioDTO });
        }

        [HttpPost("Autentication")]
        [Anonymous]
        public async Task<ActionResult> CreateSession([FromBody] LoginDTO loginDTO)
        {
            if (loginDTO is null) return BadRequest(new { status = false, response = "Dados inválidos!" });
            var usuarioDTO = await _usuarioService.Login(loginDTO);

            if (usuarioDTO is not null)
            {
                var tipoUsuarioDTO = await _tipoUsuarioService.GetById(usuarioDTO.Id);
                var ultimaSessao = await _sessaoService.GetLastSession(usuarioDTO.Id);
                SessaoDTO sessaoDTO = new()
                {
                    IdUsuario = usuarioDTO.Id,
                    DataHoraInicio = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
                    StatusSessao = true,
                    TokenSessao = SessaoDTO.GenerateToken(usuarioDTO.EmailPessoa),

                    EmailPessoa = usuarioDTO.EmailPessoa,
                    NivelAcesso = tipoUsuarioDTO.NivelAcesso
                };

                if (ultimaSessao is null || !ultimaSessao.StatusSessao)
                {
                    //await _sessaoService.Remove(ultimaSessao.Id);

                    await _sessaoService.Create(sessaoDTO);
                    return Ok(new { status = true, response = sessaoDTO.TokenSessao });
                }
                else if (ultimaSessao.StatusSessao)
                {
                    if (sessaoDTO.IdUsuario != 1) return Unauthorized(new { status = "waiting", response = "Já existe uma sessão aberta!" });
                    else
                    {
                        await _sessaoService.Create(sessaoDTO);
                        return Ok(new { status = true, response = sessaoDTO.TokenSessao });
                    }
                }
            }

            return Unauthorized(new { status = false, response = "E-mail ou senha incorretos!" });
        }

        [HttpPut("Validation")]
        public async Task<IActionResult> ValidateSession([FromBody] TokenAcess token)
        {
            var sessaoDTO = await _sessaoService.GetByToken(token.Token);
            if (sessaoDTO is null) return Unauthorized(new { status = false, response = "Sessão não encontrada!" });

            if (sessaoDTO.StatusSessao && SessaoDTO.ValidateToken(sessaoDTO.TokenSessao, sessaoDTO.EmailPessoa))
            {
                var authorizationHeader = Request.Headers["Authorization"].FirstOrDefault();
                if (!string.IsNullOrEmpty(authorizationHeader))
                {
                    var tokenParts = authorizationHeader.Split(' ');
                    if (tokenParts.Length == 2 && tokenParts[0] == "Front")
                    {
                        sessaoDTO.TokenSessao = SessaoDTO.GenerateToken(sessaoDTO.EmailPessoa);
                        await _sessaoService.Update(sessaoDTO);

                        Response.Headers["Authorization"] = $"Front {sessaoDTO.TokenSessao}";
                    }

                    return Ok(new { status = true, response = sessaoDTO.TokenSessao });
                }

                sessaoDTO.TokenSessao = "";
                sessaoDTO.StatusSessao = false;
                sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                await _sessaoService.Update(sessaoDTO);

                Response.Headers.Remove("Authorization");
                return Unauthorized(new { status = false, response = "Token não informado!" });
            }
            else
            {
                sessaoDTO.TokenSessao = "";
                sessaoDTO.StatusSessao = false;
                sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                await _sessaoService.Update(sessaoDTO);

                Response.Headers.Remove("Authorization");
                return Unauthorized(new { status = false, response = "Sessão expirada!" });
            }
        }

        [HttpPut("Close")]
        public async Task<IActionResult> CloseSession([FromBody] TokenAcess token)
        {
            Response.Headers.Remove("Authorization");
            var sessaoDTO = await _sessaoService.GetByToken(token.Token);
            if (sessaoDTO is null) { Response.Headers.Remove("Authorization"); return Unauthorized(new { status = false, response = "Sessão não encontrada!" }); }

            sessaoDTO.StatusSessao = false;
            sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            await _sessaoService.Update(sessaoDTO);


            return Ok(new { status = true, response = "Sessão encerrada com sucesso!" });
        }

        [HttpPut("CloseUserSession")]
        public async Task<IActionResult> CloseUserSession(int id)
        {
            if (id == 1) return Ok(new { status = true, response = "Nenhuma sessão aberta encontrada!" });

            var sessoes = await _sessaoService.GetOpenSessionByUser(id);
            if (sessoes == null) return Ok(new { status = true, response = "Nenhuma sessão aberta encontrada!" });

            foreach (var sessao in sessoes)
            {
                sessao.StatusSessao = false;
                sessao.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                await _sessaoService.Update(sessao);
            }

            return Ok(new { status = true, response = "Sessão do usuário encerrada!" });
        }









        [HttpGet("GetAllSessions")]
        public async Task<ActionResult<IEnumerable<SessaoDTO>>> GetAllSessions()
        {
            var sessoesDTO = await _sessaoService.GetAll();
            return Ok(sessoesDTO);
        }

        [HttpGet("GetAllOpenSessions")]
        public async Task<ActionResult<IEnumerable<SessaoDTO>>> GetAllOpenSessions()
        {
            var sessoesDTO = await _sessaoService.GetOpenSessions();
            return Ok(sessoesDTO);
        }

        [HttpGet("GetAllCloseSessions")]
        public async Task<ActionResult<IEnumerable<SessaoDTO>>> GetAllCloseSessions()
        {
            var sessoesDTO = await _sessaoService.GetCloseSessions();
            return Ok(sessoesDTO);
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var sessaoDTO = await _sessaoService.GetById(id);
            if (sessaoDTO is null || sessaoDTO.IdUsuario == 1) return Unauthorized(new { status = false, response = "Sessão não encontrada!" });
            await _sessaoService.Remove(id);
            return Ok(new { status = true, response = "Sessão removida com sucesso!" });
        }
    }
}
