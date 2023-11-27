using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SGED.Context;
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
    //[Authorize("ApiScope")]
    public class UsuarioController : Controller
    {

        private readonly IUsuarioService _usuarioService;
        private readonly AppDBContext _context;

        public UsuarioController(IUsuarioService usuarioService, AppDBContext context)
        {
            _usuarioService = usuarioService;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> Get()
        {
            var usuarios = await _usuarioService.GetAll();
            if (usuarios == null) return NotFound("Usuarios não encontradas!");
            return Ok(usuarios);
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
            var usuarios = await _usuarioService.GetByEmail(usuarioDTO.EmailUsuario);
            foreach (var usuario in usuarios)
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

            var emailExists = await EmailExistsForOtherUser(usuarioDTO.Id, usuarioDTO.EmailUsuario);
            if (emailExists)
            {
                return NotFound("O e-mail informado já existe!");
            }

            if (usuarioDTO.EmailUsuario == "devops@development.com")
            {
                NotFound("O e-mail informado já existe!");
            }

            await _usuarioService.Update(usuarioDTO);
            return new CreatedAtRouteResult("GetUsuario", new { id = usuarioDTO.Id }, usuarioDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UsuarioDTO>> Delete(int id)
        {
            var usuarioDTO = await _usuarioService.GetById(id);
            if (usuarioDTO == null) return NotFound("Usuario não encontrada!");
            await _usuarioService.Remove(id);
            return Ok(usuarioDTO);
        }

        private async Task<bool> EmailExistsForOtherUser(int id, string email)
        {
            var usuarios = await _usuarioService.GetByEmail(email);
            return usuarios.Any(usuario => usuario.Id != id && usuario.EmailUsuario.ToUpper() != email.ToUpper());
        }

    }
}
