using Microsoft.AspNetCore.Mvc;
using SGED.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MunicipeController : Controller
    {

        private readonly IMunicipeService _municipeService;

        public MunicipeController(IMunicipeService municipeService)
        {
            _municipeService = municipeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MunicipeDTO>>> Get()
        {
            var municipesDTO = await _municipeService.GetAll();
            if (municipesDTO == null) return NotFound("Municipes não encontradas!");
            return Ok(municipesDTO);
        }

        [HttpGet("{id}", Name = "GetMunicipe")]
        public async Task<ActionResult<MunicipeDTO>> Get(int id)
        {
            var municipeDTO = await _municipeService.GetById(id);
            if (municipeDTO == null) return NotFound("Municipe não encontradas!");
            return Ok(municipeDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] MunicipeDTO municipeDTO)
        {
            if (municipeDTO is null) return BadRequest("Dado inválido!");
            await _municipeService.Create(municipeDTO);
            return new CreatedAtRouteResult("GetMunicipe", new { id = municipeDTO.Id }, municipeDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] MunicipeDTO municipeDTO)
        {
            if (municipeDTO is null) return BadRequest("Dado inválido!");
            await _municipeService.Update(municipeDTO);
            return Ok(municipeDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MunicipeDTO>> Delete(int id)
        {
            var municipeDTO = await _municipeService.GetById(id);
            if (municipeDTO == null) return NotFound("Municipe não encontrada!");
            await _municipeService.Remove(id);
            return Ok(municipeDTO);
        }

    }
}
