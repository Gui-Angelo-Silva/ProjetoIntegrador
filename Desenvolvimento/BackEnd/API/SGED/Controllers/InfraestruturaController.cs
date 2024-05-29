using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class InfraestruturaController : Controller
    {

        private readonly IInfraestruturaService _infraestruturaService;

        public InfraestruturaController(IInfraestruturaService infraestruturaService)
        {
            _infraestruturaService = infraestruturaService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<InfraestruturaDTO>>> GetAll()
        {
            var infraestruturasDTO = await _infraestruturaService.GetAll();
            return Ok(infraestruturasDTO);
        }

        [HttpGet("Id/{id}", Name = "GetInfraestrutura")]
        public async Task<ActionResult<InfraestruturaDTO>> GetId(int id)
        {
            var infraestruturaDTO = await _infraestruturaService.GetById(id);
            if (infraestruturaDTO == null) return NotFound("Infraestrutura não encontrado!");
            return Ok(infraestruturaDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] InfraestruturaDTO infraestruturaDTO)
        {
            if (infraestruturaDTO is null) return BadRequest("Dado inválido!");
            await _infraestruturaService.Create(infraestruturaDTO);
            return new CreatedAtRouteResult("GetById", new { id = infraestruturaDTO.Id }, infraestruturaDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] InfraestruturaDTO infraestruturaDTO)
        {
            if (infraestruturaDTO is null) return BadRequest("Dado inválido!");
            await _infraestruturaService.Update(infraestruturaDTO);
            return Ok(infraestruturaDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<InfraestruturaDTO>> Delete(int id)
        {
            var infraestruturaDTO = await _infraestruturaService.GetById(id);
            if (infraestruturaDTO == null) return NotFound("Infraestrutura não encontrado!");
            await _infraestruturaService.Remove(id);
            return Ok(infraestruturaDTO);
        }
    }
}