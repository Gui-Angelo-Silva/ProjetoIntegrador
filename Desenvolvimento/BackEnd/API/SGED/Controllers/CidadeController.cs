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
    public class CidadeController : Controller
    {

        private readonly ICidadeService _cidadeService;

        public CidadeController(ICidadeService cidadeService)
        {
            _cidadeService = cidadeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CidadeDTO>>> Get()
        {
            var cidadesDTO = await _cidadeService.GetAll();
            return Ok(cidadesDTO);
        }

        [HttpGet("{id}", Name = "GetCidade")]
        public async Task<ActionResult<CidadeDTO>> Get(int id)
        {
            var cidadeDTO = await _cidadeService.GetById(id);
            if (cidadeDTO == null) return NotFound("Cidade não encontrada");
            return Ok(cidadeDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CidadeDTO cidadeDTO)
        {
            if (cidadeDTO is null) return BadRequest("Dado inválido!");
            await _cidadeService.Create(cidadeDTO);
            return new CreatedAtRouteResult("GetCidade", new { id = cidadeDTO.Id }, cidadeDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] CidadeDTO cidadeDTO)
        {
            if (cidadeDTO is null) return BadRequest("Dado invalido!");
            await _cidadeService.Update(cidadeDTO);
            return Ok(cidadeDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CidadeDTO>> Delete(int id)
        {
            var cidadeDTO = await _cidadeService.GetById(id);
            if (cidadeDTO == null) return NotFound("Cidade não econtrada!");
            await _cidadeService.Remove(id);
            return Ok(cidadeDTO);
        }
    }
}