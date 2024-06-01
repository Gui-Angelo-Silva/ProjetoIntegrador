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
    public class UsoController : Controller
    {

        private readonly IUsoService _usoService;
        private readonly Response _response;

        public UsoController(IUsoService usoService)
        {
            _usoService = usoService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsoDTO>>> Get()
        {
            var usosDTO = await _usoService.GetAll();
            _response.Status = true; _response.Data = usosDTO;
            _response.Message = usosDTO.Any() ?
                "Lista do(s) Uso(s) obtida com sucesso." :
                "Nenhum Uso encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetUso")]
        public async Task<ActionResult<UsoDTO>> Get(int id)
        {
            var usoDTO = await _usoService.GetById(id);
            if (usoDTO == null)
            {
                _response.Status = false; _response.Message = "Uso não encontrado!"; _response.Data = usoDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Uso " + usoDTO.NomeUso + " obtido com sucesso."; _response.Data = usoDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UsoDTO usoDTO)
        {
            if (usoDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = usoDTO;
                return BadRequest(_response);
            }

            await _usoService.Create(usoDTO);

            _response.Status = true; _response.Message = "Uso " + usoDTO.NomeUso + " cadastrado com sucesso."; _response.Data = usoDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] UsoDTO usoDTO)
        {
            if (usoDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = usoDTO;
                return BadRequest(_response);
            }

            var existingUso = await _usoService.GetById(usoDTO.Id);
            if (existingUso == null)
            {
                _response.Status = false; _response.Message = "O Uso informado não existe!"; _response.Data = usoDTO;
                return NotFound(_response);
            }

            await _usoService.Update(usoDTO);

            _response.Status = true; _response.Message = "Uso " + usoDTO.NomeUso + " alterado com sucesso."; _response.Data = usoDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UsoDTO>> Delete(int id)
        {
            var usoDTO = await _usoService.GetById(id);
            if (usoDTO == null)
            {
                _response.Status = false; _response.Message = "Uso não encontrado!"; _response.Data = usoDTO;
                return NotFound(_response);
            }

            await _usoService.Remove(id);

            _response.Status = true; _response.Message = "Uso " + usoDTO.NomeUso + " excluído com sucesso."; _response.Data = usoDTO;
            return Ok(_response);
        }
    }
}