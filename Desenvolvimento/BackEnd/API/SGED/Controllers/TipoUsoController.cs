using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TipoUsoController : Controller
    {

        private readonly ITipoUsoService _tipousoService;

        public TipoUsoController(ITipoUsoService tipousoService)
        {
            _tipousoService = tipousoService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<TipoUsoDTO>>> GetAll()
        {
            var tipousosDTO = await _tipousoService.GetAll();
            return Ok(tipousosDTO);
        }

        [HttpGet("Id/{id}", Name = "GetTipoUso")]
        public async Task<ActionResult<TipoUsoDTO>> GetId(int id)
        {
            var tipousoDTO = await _tipousoService.GetById(id);
            if (tipousoDTO == null) return NotFound("TipoUso não encontrado!");
            return Ok(tipousoDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoUsoDTO tipousoDTO)
        {
            if (tipousoDTO is null) return BadRequest("Dado inválido!");
            await _tipousoService.Create(tipousoDTO);
            return new CreatedAtRouteResult("GetById", new { id = tipousoDTO.Id }, tipousoDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoUsoDTO tipousoDTO)
        {
            if (tipousoDTO is null) return BadRequest("Dado inválido!");
            await _tipousoService.Update(tipousoDTO);
            return Ok(tipousoDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoUsoDTO>> Delete(int id)
        {
            var tipousoDTO = await _tipousoService.GetById(id);
            if (tipousoDTO == null) return NotFound("TipoUso não encontrado!");
            await _tipousoService.Remove(id);
            return Ok(tipousoDTO);
        }
    }
}