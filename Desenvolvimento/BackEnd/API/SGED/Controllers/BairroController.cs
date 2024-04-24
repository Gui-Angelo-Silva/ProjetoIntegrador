using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    //[Authorize("ApiScope")]
    public class BairroController : Controller
    {

        private readonly IBairroService _BairroService;

        public BairroController(IBairroService BairroService)
        {
            _BairroService = BairroService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BairroDTO>>> Get()
        {
            var bairrosDTO = await _BairroService.GetAll();
            return Ok(bairrosDTO);
        }

        [HttpGet("{id}", Name = "GetBairro")]
        public async Task<ActionResult<BairroDTO>> Get(int id)
        {
            var BairroDTO = await _BairroService.GetById(id);
            if (BairroDTO == null) return NotFound("Bairro não encontrada");
            return Ok(BairroDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BairroDTO BairroDTO)
        {
            if (BairroDTO is null) return BadRequest("Dado inválido!");
            await _BairroService.Create(BairroDTO);
            return new CreatedAtRouteResult("GetBairro", new { id = BairroDTO.Id }, BairroDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] BairroDTO BairroDTO)
        {
            if (BairroDTO is null) return BadRequest("Dado invalido!");
            await _BairroService.Update(BairroDTO);
            return Ok(BairroDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BairroDTO>> Delete(int id)
        {
            var BairroDTO = await _BairroService.GetById(id);
            if (BairroDTO == null) return NotFound("Bairro não econtrado!");
            await _BairroService.Remove(id);
            return Ok(BairroDTO);
        }
    }
}