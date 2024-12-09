using Microsoft.AspNetCore.Mvc;
using SGED.Services.Interfaces;
using SGED.Services.Server.Attributes;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Server;
using SGED.Objects.Utilities;
using SGED.Services.Entities;
using System.Collections;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    //[Authorize("ApiScope")]
    public class SessaoController : Controller
    {
        private readonly ISessaoService _sessaoService;
        private readonly IUsuarioService _usuarioService;
        private readonly ITipoUsuarioService _tipoUsuarioService;
        private readonly Response _response;

        public SessaoController(ISessaoService sessaoService, IUsuarioService usuarioService, ITipoUsuarioService tipoUsuarioService)
        {
            _sessaoService = sessaoService;
            _usuarioService = usuarioService;
            _tipoUsuarioService = tipoUsuarioService;

            _response = new Response();
        }

        [HttpGet("GetAllSessions")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<SessaoDTO>>> GetAllSessions()
        {
            try
            {
                var usuariosDTO = await _sessaoService.GetAll();
                _response.SetSuccess();
                _response.Message = usuariosDTO.Any() ?
                    "Lista da(s) Sessão(ões) obtida com sucesso." :
                    "Nenhuma Sessão encontrada.";
                _response.Data = usuariosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista da(s) Sessão(ões)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetAllOpenSessions")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<SessaoDTO>>> GetAllOpenSessions()
        {
            try
            {
                var usuariosDTO = await _sessaoService.GetOpenSessions();
                _response.SetSuccess();
                _response.Message = usuariosDTO.Any() ?
                    "Lista da(s) Sessão(ões) aberta(s) obtida com sucesso." :
                    "Nenhuma Sessão aberta encontrada.";
                _response.Data = usuariosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista da(s) Sessão(ões) aberta(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetAllCloseSessions")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<SessaoDTO>>> GetAllCloseSessions()
        {
            try
            {
                var usuariosDTO = await _sessaoService.GetCloseSessions();
                _response.SetSuccess();
                _response.Message = usuariosDTO.Any() ?
                    "Lista da(s) Sessão(ões) fechada(s) obtida com sucesso." :
                    "Nenhuma Sessão fechada encontrada.";
                _response.Data = usuariosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista da(s) Sessão(ões) fechada(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetOnlineUsers")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetOnlineUsers()
        {
            try
            {
                var usuariosDTO = await _sessaoService.GetOnlineUsers();
                _response.SetSuccess();
                _response.Message = usuariosDTO.Any() ?
                    "Lista do(s) Usuários(s) online obtida com sucesso." :
                    "Nenhum Usuário online encontrado.";
                _response.Data = usuariosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Usuário(s) online!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetOfflineUsers")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetOfflineUsers()
        {
            try
            {
                var usuariosDTO = await _sessaoService.GetOfflineUsers();
                _response.SetSuccess();
                _response.Message = usuariosDTO.Any() ?
                    "Lista do(s) Usuários(s) offline obtida com sucesso." :
                    "Nenhum Usuário offline encontrado.";
                _response.Data = usuariosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Usuário(s) offline!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:Guid}/GetSession")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<SessaoDTO>> GetSession(Guid id)
        {
            try
            {
                var sessaoDTO = await _sessaoService.GetById(id);
                if (sessaoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Sessão não encontrada!";
                    _response.Data = null;
                    return NotFound(_response);
                }

                _response.SetSuccess();
                _response.Message = "Sessão obtida com sucesso.";
                _response.Data = sessaoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a Sessão informada!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{token}/GetUser")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<UsuarioDTO>> GetUser(string token)
        {
            if (token is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado inválido!";
                _response.Data = null;
                return BadRequest(_response);
            }

            try
            {
                var sessaoDTO = await _sessaoService.GetByToken(token);
                if (sessaoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Sessão não encontrada";
                    _response.Data = null;
                    return Unauthorized(_response);
                }

                var usuarioDTO = await _sessaoService.GetUser(token);

                _response.SetSuccess();
                _response.Message = "Usuário " + usuarioDTO.NomePessoa + " obtido com sucesso!";
                _response.Data = usuarioDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Usuário!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost("Authentication")]
        [Anonymous]
        public async Task<ActionResult> CreateSession([FromBody] Login login)
        {
            if (login is null)
            {
                _response.SetNotFound();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = new { errorLogin = "Dado(s) inválido(s)!" };
                return BadRequest(_response);
            }

            // Captura os IPs da requisição
            string ipv4 = HttpContext.Connection.RemoteIpAddress?.MapToIPv4().ToString() ?? string.Empty;
            string ipv6 = HttpContext.Connection.RemoteIpAddress?.MapToIPv6().ToString() ?? string.Empty;

            // Verifica se ambos IPv4 e IPv6 foram identificados
            if (string.IsNullOrEmpty(ipv4) || string.IsNullOrEmpty(ipv6))
            {
                _response.SetNotFound();
                _response.Message = "IPv4 ou IPv6 não identificados!";
                _response.Data = new { errorLogin = "Erro na identificação dos endereços IP." };
                return BadRequest(_response);
            }

            try
            {
                var usuarioDTO = await _usuarioService.Login(login);
                if (usuarioDTO is not null)
                {
                    var tipoUsuarioDTO = await _tipoUsuarioService.GetById(usuarioDTO.IdTipoUsuario);
                    var ultimaSessao = await _sessaoService.GetLastSession(usuarioDTO.Id);

                    SessaoDTO sessaoDTO = new()
                    {
                        IdUsuario = usuarioDTO.Id,
                        DataHoraInicio = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss"),
                        StatusSessao = true,
                        IPv4 = ipv4,
                        IPv6 = ipv6,
                        EmailPessoa = usuarioDTO.EmailPessoa,
                        NivelAcesso = tipoUsuarioDTO.NivelAcesso
                    };
                    sessaoDTO.GenerateToken();

                    await _sessaoService.Create(sessaoDTO);

                    _response.SetSuccess();
                    _response.Message = "Sessão aberta com sucesso!";
                    _response.Data = new { tokenSessao = sessaoDTO.TokenSessao, nivelAcesso = tipoUsuarioDTO.NivelAcesso };
                    return Ok(_response);
                }

                _response.SetUnauthorized();
                _response.Message = "E-mail ou senha incorretos!";
                _response.Data = new { errorLogin = "E-mail ou senha incorretos!" };
                return Unauthorized(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível realizar o Login!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("Validation")]
        [AccessPermission("A", "B", "C")]
        public async Task<IActionResult> ValidateSession([FromBody] TokenAcess token)
        {
            try
            {
                var sessaoDTO = await _sessaoService.GetByToken(token.Token);
                if (sessaoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Sessão não encontrada!";
                    _response.Data = new { errorToken = "Sessão não encontrada!" };
                    return NotFound(_response);
                }

                if (sessaoDTO.StatusSessao && sessaoDTO.ValidateToken())
                {
                    _response.SetSuccess();
                    _response.Message = "Sessão validada com sucesso.";
                    _response.Data = sessaoDTO.TokenSessao;
                    return Ok(_response);
                }
                else
                {
                    sessaoDTO.StatusSessao = false;
                    sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                    await _sessaoService.Update(sessaoDTO);

                    _response.SetUnauthorized();
                    _response.Message = "A Sessão expirou.";
                    _response.Data = new { errorToken = "A Sessão expirou." };
                    return Unauthorized(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível validar a Sessão!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("Close")]
        [AccessPermission("A", "B", "C")]
        public async Task<IActionResult> CloseSession([FromBody] TokenAcess token)
        {
            try
            {
                var sessaoDTO = await _sessaoService.GetByToken(token.Token);
                if (sessaoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Sessão não encontrada!";
                    _response.Data = sessaoDTO;
                    return NotFound(_response);
                }

                sessaoDTO.StatusSessao = false;
                sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                await _sessaoService.Update(sessaoDTO);

                _response.SetSuccess();
                _response.Message = "Sessão fechada com sucesso.";
                _response.Data = sessaoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível fechar a Sessão!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{idUsuario:int}/CloseUserSessions")]
        [AccessPermission("A", "B", "C")]
        public async Task<IActionResult> CloseUserSession(int idUsuario)
        {
            try
            {
                var sessoes = await _sessaoService.GetOpenSessionByUser(idUsuario);
                if (sessoes is null)
                {
                    _response.SetSuccess();
                    _response.Message = "Nenhuma sessão aberta encontrada.";
                    _response.Data = idUsuario == 1 ? new ArrayList() : sessoes;
                    return Ok(_response);
                };

                foreach (var sessao in sessoes)
                {
                    sessao.TokenSessao = "";
                    sessao.StatusSessao = false;
                    sessao.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                    await _sessaoService.Update(sessao);
                }

                _response.SetSuccess();
                _response.Message = "Sessão(ões) do Usuário fechada(s)!";
                _response.Data = idUsuario == 1 ? new ArrayList() : sessoes;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível fechar a(s) Sessão(ões) relacionada(s) ao Usuário!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:Guid}")]
        [AccessPermission("A", "B", "C")]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var sessaoDTO = await _sessaoService.GetById(id);
                if (sessaoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Sessão não encontrada!";
                    _response.Data = new { errorId = "Sessão não encontrada!" };
                    return NotFound(_response);
                }

                await _sessaoService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Sessao excluída com sucesso.";
                _response.Data = sessaoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir a Sessão!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }
    }
}