using Microsoft.AspNetCore.Mvc;
using SGED.Services.Interfaces;
using SGED.Services.Server.Attributes;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Server;
using SGED.Objects.Utilities;
using SGED.Services.Entities;

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

        [HttpGet("GetSession")]
        [Anonymous]
        public async Task<ActionResult<SessaoDTO>> GetSession([FromQuery] TokenAcess token)
        {
            if (token is null) return BadRequest(new { status = false, response = "Dados inválidos!" });

            var sessaoDTO = await _sessaoService.GetByToken(token.Token);
            if (sessaoDTO is null) return Unauthorized(new { status = false, response = "Sessão não encontrada!" });
            else if (sessaoDTO.StatusSessao && sessaoDTO.ValidateToken())
            {
                return Ok(new { status = true, response = sessaoDTO });
            }
            else
            {
                sessaoDTO.StatusSessao = false;
                sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                await _sessaoService.Update(sessaoDTO);

                Response.Headers.Remove("Authorization");
                return Unauthorized(new { status = false, response = "Sessão expirada!" });
            }
        }

        [HttpGet("{token}/GetUser")]
        [Anonymous]
        public async Task<ActionResult<UsuarioDTO>> GetUser(string token)
        {
            if (token is null) return BadRequest(new { status = false, response = "Dados inválidos!" });

            var sessaoDTO = await _sessaoService.GetByToken(token);
            if (sessaoDTO is null) return Unauthorized(new { status = false, response = "Sessão não encontrada!" });
            else if (sessaoDTO.StatusSessao && sessaoDTO.ValidateToken())
            {
                var usuarioDTO = await _sessaoService.GetUser(token);

                return Ok(new { status = true, response = usuarioDTO });
            }
            else
            {
                sessaoDTO.StatusSessao = false;
                sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                await _sessaoService.Update(sessaoDTO);

                Response.Headers.Remove("Authorization");
                return Unauthorized(new { status = false, response = "Sessão expirada!" });
            }
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

                    EmailPessoa = usuarioDTO.EmailPessoa,
                    NivelAcesso = tipoUsuarioDTO.NivelAcesso
                }; sessaoDTO.GenerateToken();

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
        [Anonymous]
        public async Task<IActionResult> ValidateSession([FromBody] TokenAcess token)
        {
            var sessaoDTO = await _sessaoService.GetByToken(token.Token);
            if (sessaoDTO is null) return Unauthorized(new { status = false, response = "Sessão não encontrada!" });

            if (sessaoDTO.StatusSessao && sessaoDTO.ValidateToken())
            {
                sessaoDTO.GenerateToken();
                await _sessaoService.Update(sessaoDTO);

                return Ok(new { status = true, response = sessaoDTO.TokenSessao });
            }
            else
            {
                sessaoDTO.StatusSessao = false;
                sessaoDTO.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                await _sessaoService.Update(sessaoDTO);

                Response.Headers.Remove("Authorization");
                return Unauthorized(new { status = false, response = "Sessão expirada!" });
            }
        }

        [HttpPut("Close")]
        [Anonymous]
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

        [HttpPut("CloseUserSessions")]
        public async Task<IActionResult> CloseUserSession(int id)
        {
            var sessoes = await _sessaoService.GetOpenSessionByUser(id);
            if (sessoes is null || id == 1) return Ok(new { status = true, response = "Nenhuma sessão aberta encontrada!" });

            foreach (var sessao in sessoes)
            {
                sessao.StatusSessao = false;
                sessao.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                await _sessaoService.Update(sessao);
            }

            return Ok(new { status = true, response = "Sessão do usuário encerrada!" });
        }
        
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var sessaoDTO = await _sessaoService.GetById(id);
            if (sessaoDTO is null || sessaoDTO.IdUsuario == 1) return Unauthorized(new { status = false, response = "Sessão não encontrada!" });
            await _sessaoService.Remove(id);
            return Ok(new { status = true, response = "Sessão removida com sucesso!" });
        }
    }
}