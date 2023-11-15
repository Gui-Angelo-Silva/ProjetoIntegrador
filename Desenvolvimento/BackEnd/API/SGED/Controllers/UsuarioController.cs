using Microsoft.AspNetCore.Authorization;
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
    [Authorize("ApiScope")]
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
