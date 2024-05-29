using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TopografiaController : Controller
    {

        private readonly ITopografiaService _topografiaService;

        public TopografiaController(ITopografiaService topografiaService)
        {
            _topografiaService = topografiaService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<TopografiaDTO>>> GetAll()
        {
            var topografiasDTO = await _topografiaService.GetAll();
            return Ok(topografiasDTO);
        }

        [HttpGet("Id/{id}", Name = "GetTopografia")]
        public async Task<ActionResult<TopografiaDTO>> GetId(int id)
        {
            var topografiaDTO = await _topografiaService.GetById(id);
            if (topografiaDTO == null) return NotFound("Topografia não encontrado!");
            return Ok(topografiaDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TopografiaDTO topografiaDTO)
        {
            if (topografiaDTO is null) return BadRequest("Dado inválido!");
            await _topografiaService.Create(topografiaDTO);
            return new CreatedAtRouteResult("GetById", new { id = topografiaDTO.Id }, topografiaDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TopografiaDTO topografiaDTO)
        {
            if (topografiaDTO is null) return BadRequest("Dado inválido!");
            await _topografiaService.Update(topografiaDTO);
            return Ok(topografiaDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TopografiaDTO>> Delete(int id)
        {
            var topografiaDTO = await _topografiaService.GetById(id);
            if (topografiaDTO == null) return NotFound("Topografia não encontrado!");
            await _topografiaService.Remove(id);
            return Ok(topografiaDTO);
        }
    }
}