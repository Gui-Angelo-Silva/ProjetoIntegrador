using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TipoInfraestruturaController : Controller
    {

        private readonly ITipoInfraestruturaService _tipoinfraestruturaService;

        public TipoInfraestruturaController(ITipoInfraestruturaService tipoinfraestruturaService)
        {
            _tipoinfraestruturaService = tipoinfraestruturaService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<TipoInfraestruturaDTO>>> GetAll()
        {
            var tipoinfraestruturasDTO = await _tipoinfraestruturaService.GetAll();
            return Ok(tipoinfraestruturasDTO);
        }

        [HttpGet("Id/{id}", Name = "GetTipoInfraestrutura")]
        public async Task<ActionResult<TipoInfraestruturaDTO>> GetId(int id)
        {
            var tipoinfraestruturaDTO = await _tipoinfraestruturaService.GetById(id);
            if (tipoinfraestruturaDTO == null) return NotFound("TipoInfraestrutura não encontrado!");
            return Ok(tipoinfraestruturaDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoInfraestruturaDTO tipoinfraestruturaDTO)
        {
            if (tipoinfraestruturaDTO is null) return BadRequest("Dado inválido!");
            await _tipoinfraestruturaService.Create(tipoinfraestruturaDTO);
            return new CreatedAtRouteResult("GetById", new { id = tipoinfraestruturaDTO.Id }, tipoinfraestruturaDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoInfraestruturaDTO tipoinfraestruturaDTO)
        {
            if (tipoinfraestruturaDTO is null) return BadRequest("Dado inválido!");
            await _tipoinfraestruturaService.Update(tipoinfraestruturaDTO);
            return Ok(tipoinfraestruturaDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoInfraestruturaDTO>> Delete(int id)
        {
            var tipoinfraestruturaDTO = await _tipoinfraestruturaService.GetById(id);
            if (tipoinfraestruturaDTO == null) return NotFound("TipoInfraestrutura não encontrado!");
            await _tipoinfraestruturaService.Remove(id);
            return Ok(tipoinfraestruturaDTO);
        }
    }
}