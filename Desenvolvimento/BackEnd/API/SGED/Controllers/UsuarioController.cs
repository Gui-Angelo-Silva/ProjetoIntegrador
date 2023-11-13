using Microsoft.AspNetCore.Mvc;
using SGED.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : Controller
    {

        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> Get()
        {
            var usuariosDTO = await _usuarioService.GetAll();
            if (usuariosDTO == null) return NotFound("Usuarios não encontradas!");
            return Ok(usuariosDTO);
        }

        [HttpGet("{id}", Name = "GetUsuario")]
        public async Task<ActionResult<UsuarioDTO>> Get(int id)
        {
            var usuarioDTO = await _usuarioService.GetById(id);
            if (usuarioDTO == null) return NotFound("Usuario não encontradas!");
            return Ok(usuarioDTO);
        }

        [HttpPost("Login", Name = "Login")]
        public async Task<ActionResult<UsuarioDTO>> Login([FromBody] LoginDTO loginDTO)
        {
            if (loginDTO is null) return BadRequest("Dado inválido!");
            var usuarioDTO = await _usuarioService.Login(loginDTO);
            if (usuarioDTO == null) return NotFound("E-mail ou senha incorretos!");
            return Ok(usuarioDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UsuarioDTO usuarioDTO)
        {
            if (usuarioDTO is null) return BadRequest("Dado inválido!");

            var usuariosDTO = await _usuarioService.GetByEmail(usuarioDTO.EmailUsuario);
            foreach (var usuario in usuariosDTO)
            {
                if (usuario.EmailUsuario.ToUpper() == usuarioDTO.EmailUsuario.ToUpper())
                {
                    return NotFound("O e-mail informado já existe!");
                }
            }
            if(usuarioDTO.EmailUsuario == "devops@development.com") NotFound("O e-mail informado já existe!");

            await _usuarioService.Create(usuarioDTO);
            return new CreatedAtRouteResult("GetUsuario", new { id = usuarioDTO.Id }, usuarioDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] UsuarioDTO usuarioDTO)
        {
            if (usuarioDTO is null) return BadRequest("Dado inválido!");

            var dadoAnterior = await _usuarioService.GetById(usuarioDTO.Id);
            if (dadoAnterior == null) return NotFound("Usuário não encontrado!");
            if (dadoAnterior.EmailUsuario.ToUpper() != usuarioDTO.EmailUsuario.ToUpper())
            {
                var usuariosDTO = await _usuarioService.GetByEmail(usuarioDTO.EmailUsuario);
                foreach (var usuario in usuariosDTO)
                {
                    if (usuario.EmailUsuario.ToUpper() == usuarioDTO.EmailUsuario.ToUpper())
                    {
                        return NotFound("O e-mail informado já existe!");
                    }
                }
                if (usuarioDTO.EmailUsuario == "devops@development.com") NotFound("O e-mail informado já existe!");
            }

            await _usuarioService.Update(usuarioDTO);
            return Ok(usuarioDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UsuarioDTO>> Delete(int id)
        {
            var usuarioDTO = await _usuarioService.GetById(id);
            if (usuarioDTO == null) return NotFound("Usuario não encontrada!");
            await _usuarioService.Remove(id);
            return Ok(usuarioDTO);
        }

    }
}
