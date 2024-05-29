using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OcupacaoAtualController : Controller
    {

        private readonly IOcupacaoAtualService _ocupacaoatualService;

        public OcupacaoAtualController(IOcupacaoAtualService ocupacaoatualService)
        {
            _ocupacaoatualService = ocupacaoatualService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<OcupacaoAtualDTO>>> GetAll()
        {
            var ocupacaoatuaisDTO = await _ocupacaoatualService.GetAll();
            return Ok(ocupacaoatuaisDTO);
        }

        [HttpGet("Id/{id}", Name = "GetOcupacaoAtual")]
        public async Task<ActionResult<OcupacaoAtualDTO>> GetId(int id)
        {
            var ocupacaoatualDTO = await _ocupacaoatualService.GetById(id);
            if (ocupacaoatualDTO == null) return NotFound("OcupacaoAtual não encontrado!");
            return Ok(ocupacaoatualDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] OcupacaoAtualDTO ocupacaoatualDTO)
        {
            if (ocupacaoatualDTO is null) return BadRequest("Dado inválido!");
            await _ocupacaoatualService.Create(ocupacaoatualDTO);
            return new CreatedAtRouteResult("GetById", new { id = ocupacaoatualDTO.Id }, ocupacaoatualDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] OcupacaoAtualDTO ocupacaoatualDTO)
        {
            if (ocupacaoatualDTO is null) return BadRequest("Dado inválido!");
            await _ocupacaoatualService.Update(ocupacaoatualDTO);
            return Ok(ocupacaoatualDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<OcupacaoAtualDTO>> Delete(int id)
        {
            var ocupacaoatualDTO = await _ocupacaoatualService.GetById(id);
            if (ocupacaoatualDTO == null) return NotFound("OcupacaoAtual não encontrado!");
            await _ocupacaoatualService.Remove(id);
            return Ok(ocupacaoatualDTO);
        }
    }
}