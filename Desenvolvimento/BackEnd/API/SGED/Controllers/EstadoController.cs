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
    public class EstadoController : Controller
    {

        private readonly IEstadoService _estadoService;
        private readonly Response _response; 

        public EstadoController(IEstadoService estadoService)
        {
            _estadoService = estadoService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EstadoDTO>>> Get()
        {
            var estadosDTO = await _estadoService.GetAll();
            _response.Status = true; _response.Data = estadosDTO;
            _response.Message = estadosDTO.Any() ?
                "Lista do(s) Estado(s) obtida com sucesso." :
                "Nenhum Estado encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetEstado")]
        public async Task<ActionResult<EstadoDTO>> Get(int id)
        {
            var estadoDTO = await _estadoService.GetById(id);
            if (estadoDTO == null)
            {
                _response.Status = false; _response.Message = "Estado não encontrado!"; _response.Data = estadoDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Estado " + estadoDTO.NomeEstado + " obtido com sucesso."; _response.Data = estadoDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EstadoDTO estadoDTO)
        {
            if (estadoDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = estadoDTO;
                return BadRequest(_response);
            }

            await _estadoService.Create(estadoDTO);

            _response.Status = true; _response.Message = "Estado " + estadoDTO.NomeEstado + " cadastrado com sucesso."; _response.Data = estadoDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] EstadoDTO estadoDTO)
        {
            if (estadoDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = estadoDTO;
                return BadRequest(_response);
            }

            var existingEstado = await _estadoService.GetById(estadoDTO.Id);
            if (existingEstado == null)
            {
                _response.Status = false; _response.Message = "O Estado informado não existe!"; _response.Data = estadoDTO;
                return NotFound(_response);
            }

            await _estadoService.Update(estadoDTO);

            _response.Status = true; _response.Message = "Estado " + estadoDTO.NomeEstado + " alterado com sucesso."; _response.Data = estadoDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<EstadoDTO>> Delete(int id)
        {
            var estadoDTO = await _estadoService.GetById(id);
            if (estadoDTO == null)
            {
                _response.Status = false; _response.Message = "Estado não encontrado!"; _response.Data = estadoDTO;
                return NotFound(_response);
            }

            await _estadoService.Remove(id);

            _response.Status = true; _response.Message = "Estado " + estadoDTO.NomeEstado + " excluído com sucesso."; _response.Data = estadoDTO;
            return Ok(_response);
        }
    }
}