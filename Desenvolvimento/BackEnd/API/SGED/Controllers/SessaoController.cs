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
using SGED.Services.Server.Functions;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class SessaoController : Controller
    {
        private readonly ISessaoService _sessaoService;
        private readonly IUsuarioService _usuarioService;

        public SessaoController(ISessaoService sessaoService, IUsuarioService usuarioService)
        {
            _sessaoService = sessaoService;
            _usuarioService = usuarioService;
        }

        [HttpGet("GetOnline")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetOnline()
        {
            var usuariosDTO = await _sessaoService.GetOnlineUser();
            return Ok(usuariosDTO);
        }

        [HttpGet("GetOffline")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetOffline()
        {
            var usuariosDTO = await _sessaoService.GetOfflineUser();
            return Ok(usuariosDTO);
        }

        [HttpGet("GetUser")]
        public async Task<ActionResult<UsuarioDTO>> GetUser(int id)
        {
            var usuarioDTO = await _sessaoService.GetUser(id);
            if (usuarioDTO is null) return Unauthorized(new { status = false, response = "Usuário não encontrado!" });
            else return Ok(new { status = true, response = usuarioDTO });
        }

        [HttpPost("Autentication")]
        public async Task<ActionResult> CreateSession([FromBody] LoginDTO loginDTO)
        {
            if (loginDTO is null) return BadRequest(new { status = false, response = "Dados inválidos!" });
            var usuarioDTO = await _usuarioService.Login(loginDTO);

            if (usuarioDTO is not null)
            {
                var ultimaSessao = await _sessaoService.GetLastSession(usuarioDTO.Id);
                SessaoDTO sessaoDTO = new()
                {
                    IdUsuario = usuarioDTO.Id,
                    DataHoraInicio = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
                    StatusSessao = true,
                    TokenSessao = SessaoDTO.GenerateToken(usuarioDTO.EmailPessoa)
                };

                if (ultimaSessao is null || !ultimaSessao.StatusSessao)
                {
                    //await _sessaoService.Remove(ultimaSessao.Id);

                    await _sessaoService.Create(sessaoDTO);
                    return Ok(new { status = true, response = new { id = sessaoDTO.Id, email = usuarioDTO.EmailPessoa }});
                }
                else if (ultimaSessao.StatusSessao)
                { 
                    if (sessaoDTO.IdUsuario != 1) return Unauthorized(new { status = "waiting", response = "Já existe uma sessão aberta!" });
                    else
                    {
                        await _sessaoService.Create(sessaoDTO);
                        return Ok(new { status = true, response = new { id = sessaoDTO.Id, email = usuarioDTO.EmailPessoa } });
                    }
                }
            }

            return Unauthorized(new { status = false, response = "E-mail ou senha incorretos!" });
        }

        [HttpPut("Validation")]
        public async Task<IActionResult> ValidateSession(int id, string email)
        {
            var sessaoDTO = await _sessaoService.GetById(id);
            if (sessaoDTO is null) return Unauthorized(new { status = false, response = "Sessão não encontrada!" });

            var status = SessaoDTO.ValidateToken(sessaoDTO.TokenSessao, email);

            if (status)
            {
                sessaoDTO.TokenSessao = SessaoDTO.GenerateToken(email); 
                await _sessaoService.Update(sessaoDTO);

                return Ok(new { status = true, response = "Sessão atualizada!" });
            }
            else
            {
                sessaoDTO.TokenSessao = "";
                sessaoDTO.StatusSessao = false;
                sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                await _sessaoService.Update(sessaoDTO);

                return Unauthorized(new { status = false, response = "Sessão não encontrada!" });
            }
        }

        [HttpPut("Close")]
        public async Task<IActionResult> CloseSession(int id)
        {
            var sessaoDTO = await _sessaoService.GetById(id);
            if (sessaoDTO is null) return Unauthorized(new { status = false, response = "Sessão não encontrada!" });

            sessaoDTO.TokenSessao = "";
            sessaoDTO.StatusSessao = false;
            sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            await _sessaoService.Update(sessaoDTO);

            return Ok(new { status = true, response = "Sessão encerrada com sucesso!" });
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

        [HttpGet("GetSession")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetSession(int id, string email)
        {
            var sessaoDTO = await _sessaoService.GetById(id);
            if (sessaoDTO is null) return Unauthorized(new { status = false, response = "Sessão não encontrada!" });

            var status = SessaoDTO.ValidateTokenByEmail(sessaoDTO.TokenSessao, email);

            if (status) return Ok(new { status = true, response = sessaoDTO });
            else return Unauthorized(new { status = false, response = "Sessão não encontrada!" });
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
