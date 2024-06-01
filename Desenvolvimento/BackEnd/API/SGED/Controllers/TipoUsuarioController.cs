using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TipoUsuarioController : Controller
    {

        private readonly ITipoUsuarioService _tipoUsuarioService;
        private readonly Response _response;

        public TipoUsuarioController(ITipoUsuarioService tipoUsuarioService)
        {
            _tipoUsuarioService = tipoUsuarioService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoUsuarioDTO>>> Get()
        {
            var tipoUsuariosDTO = await _tipoUsuarioService.GetAll();
            _response.Status = true; _response.Data = tipoUsuariosDTO;
            _response.Message = tipoUsuariosDTO.Any() ?
                "Lista do(s) Tipo(s) de Usuário obtida com sucesso." :
                "Nenhum Tipo de Usuário encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetTipoUsuario")]
        public async Task<ActionResult<TipoUsuarioDTO>> Get(int id)
        {
            var tipoUsuarioDTO = await _tipoUsuarioService.GetById(id);
            if (tipoUsuarioDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo de Usuário não encontrado!"; _response.Data = tipoUsuarioDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Tipo de Usuário " + tipoUsuarioDTO.NomeTipoUsuario + " obtido com sucesso."; _response.Data = tipoUsuarioDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoUsuarioDTO tipoUsuarioDTO)
        {
            if (tipoUsuarioDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoUsuarioDTO;
                return BadRequest(_response);
            }

            await _tipoUsuarioService.Create(tipoUsuarioDTO);

            _response.Status = true; _response.Message = "Tipo de Usuário " + tipoUsuarioDTO.NomeTipoUsuario + " cadastrado com sucesso."; _response.Data = tipoUsuarioDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoUsuarioDTO tipoUsuarioDTO)
        {
            if (tipoUsuarioDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoUsuarioDTO;
                return BadRequest(_response);
            }

            var existingTipoUsuario = await _tipoUsuarioService.GetById(tipoUsuarioDTO.Id);
            if (existingTipoUsuario == null)
            {
                _response.Status = false; _response.Message = "O Tipo de Usuário informado não existe!"; _response.Data = tipoUsuarioDTO;
                return NotFound(_response);
            }

            await _tipoUsuarioService.Update(tipoUsuarioDTO);

            _response.Status = true; _response.Message = "Tipo de Usuário " + tipoUsuarioDTO.NomeTipoUsuario + " alterado com sucesso."; _response.Data = tipoUsuarioDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoUsuarioDTO>> Delete(int id)
        {
            var tipoUsuarioDTO = await _tipoUsuarioService.GetById(id);
            if (tipoUsuarioDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo de Usuário não encontrado!"; _response.Data = tipoUsuarioDTO;
                return NotFound(_response);
            }

            await _tipoUsuarioService.Remove(id);

            _response.Status = true; _response.Message = "Tipo de Usuário " + tipoUsuarioDTO.NomeTipoUsuario + " excluído com sucesso."; _response.Data = tipoUsuarioDTO;
            return Ok(_response);
        }
    }
}