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
            var usuariosDTO = await _usuarioService.GetAll();
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

            usuarioDTO.EmailPessoa = usuarioDTO.EmailPessoa.ToLower();

            var result = await GetEmail(0, usuarioDTO.EmailPessoa);
            if (result) { return NotFound("O e-mail informado já existe!"); };

            if (usuarioDTO.EmailPessoa == "devops@development.com") { NotFound("O e-mail informado já existe!"); }

            int response = usuarioDTO.CpfCnpj(usuarioDTO.CpfCnpjPessoa);
            if (response == 0) return BadRequest("Documento incorreto!");
            else if (response == -1) return BadRequest("CPF inválido!");
            else if (response == -2) return BadRequest("CNPJ inválido!");
            else if (response == -3) return BadRequest("Documento incompleto!");

            response = usuarioDTO.RgIe(usuarioDTO.RgIePessoa);
            if (response == 0) return BadRequest("Documento incorreto!");
            else if (response == -1) return BadRequest("RG inválido!");
            else if (response == -2) return BadRequest("IE inválido!");
            else if (response == -3) return BadRequest("Documento incompleto!");

            await _usuarioService.Create(usuarioDTO);
            return new CreatedAtRouteResult("GetUsuario", new { id = usuarioDTO.Id }, usuarioDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] UsuarioDTO usuarioDTO)
        {
            if (usuarioDTO is null) return BadRequest("Dado inválido!");

            usuarioDTO.EmailPessoa = usuarioDTO.EmailPessoa.ToLower();

            var result = await GetEmail(usuarioDTO.Id, usuarioDTO.EmailPessoa);
            if (result) { return NotFound("O e-mail informado já existe!"); };

            if (usuarioDTO.EmailPessoa == "devops@development.com") { NotFound("O e-mail informado já existe!"); }

            int response = usuarioDTO.CpfCnpj(usuarioDTO.CpfCnpjPessoa);
            if (response == 0) return BadRequest("Documento incorreto!");
            else if (response == -1) return BadRequest("CPF inválido!");
            else if (response == -2) return BadRequest("CNPJ inválido!");
            else if (response == -3) return BadRequest("Documento incompleto!");

            response = usuarioDTO.RgIe(usuarioDTO.RgIePessoa);
            if (response == 0) return BadRequest("Documento incorreto!");
            else if (response == -1) return BadRequest("RG inválido!");
            else if (response == -2) return BadRequest("IE inválido!");
            else if (response == -3) return BadRequest("Documento incompleto!");

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

        private async Task<bool> GetEmail(int idUsuario, string emailUsuario)
        {
            var emails = await _usuarioService.GetByEmail(idUsuario, emailUsuario);
            foreach (var email in emails)
            {
                if (email.ToUpper() == emailUsuario.ToUpper())
                {
                    return true;
                };
            }
            return false;
        }

    }
}
