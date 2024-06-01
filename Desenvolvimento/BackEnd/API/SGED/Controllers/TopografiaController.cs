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
    public class TopografiaController : Controller
    {

        private readonly ITopografiaService _topografiaService;
        private readonly Response _response;

        public TopografiaController(ITopografiaService topografiaService)
        {
            _topografiaService = topografiaService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TopografiaDTO>>> Get()
        {
            var topografiasDTO = await _topografiaService.GetAll();
            _response.Status = true; _response.Data = topografiasDTO;
            _response.Message = topografiasDTO.Any() ?
                "Lista da(s) Topografia(s) obtida com sucesso." :
                "Nenhuma Topografia encontrada.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetTopografia")]
        public async Task<ActionResult<TopografiaDTO>> Get(int id)
        {
            var topografiaDTO = await _topografiaService.GetById(id);
            if (topografiaDTO == null)
            {
                _response.Status = false; _response.Message = "Topografia não encontrada!"; _response.Data = topografiaDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Topografia " + topografiaDTO.NomeTopografia + " obtida com sucesso."; _response.Data = topografiaDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TopografiaDTO topografiaDTO)
        {
            if (topografiaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = topografiaDTO;
                return BadRequest(_response);
            }

            await _topografiaService.Create(topografiaDTO);

            _response.Status = true; _response.Message = "Topografia " + topografiaDTO.NomeTopografia + " cadastrada com sucesso."; _response.Data = topografiaDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TopografiaDTO topografiaDTO)
        {
            if (topografiaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = topografiaDTO;
                return BadRequest(_response);
            }

            var existingTopografia = await _topografiaService.GetById(topografiaDTO.Id);
            if (existingTopografia == null)
            {
                _response.Status = false; _response.Message = "A Topografia informada não existe!"; _response.Data = topografiaDTO;
                return NotFound(_response);
            }

            await _topografiaService.Update(topografiaDTO);

            _response.Status = true; _response.Message = "Topografia " + topografiaDTO.NomeTopografia + " alterada com sucesso."; _response.Data = topografiaDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TopografiaDTO>> Delete(int id)
        {
            var topografiaDTO = await _topografiaService.GetById(id);
            if (topografiaDTO == null)
            {
                _response.Status = false; _response.Message = "Topografia não encontrada!"; _response.Data = topografiaDTO;
                return NotFound(_response);
            }

            await _topografiaService.Remove(id);

            _response.Status = true; _response.Message = "Topografia " + topografiaDTO.NomeTopografia + " excluída com sucesso."; _response.Data = topografiaDTO;
            return Ok(_response);
        }
    }
}