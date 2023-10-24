using Microsoft.AspNetCore.Mvc;
using SGED.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
    public class PessoaController : Controller
    {

        private readonly IPessoaService _pessoaService;

        public PessoaController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PessoaDTO>>> Get()
        {
            var pessoasDTO = await _pessoaService.GetAll();
            if (pessoasDTO == null) return NotFound("Pessoas not found!");
            return Ok(pessoasDTO);
        }

        [HttpGet("{id}", Name = "GetPessoa")]
        public async Task<ActionResult<PessoaDTO>> Get(int id)
        {
            var pessoaDTO = await _pessoaService.GetById(id);
            if (pessoaDTO == null) return NotFound("Pessoa not found!");
            return Ok(pessoaDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PessoaDTO pessoaDTO)
        {
            if (pessoaDTO is null) return BadRequest("Data Invalid!");
            await _pessoaService.Create(pessoaDTO);
            return new CreatedAtRouteResult("GetPessoa", new { id = pessoaDTO.Id }, pessoaDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] PessoaDTO pessoaDTO)
        {
            if (pessoaDTO is null) return BadRequest("Data invalid!");
            await _pessoaService.Update(pessoaDTO);
            return Ok(pessoaDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PessoaDTO>> Delete(int id)
        {
            var pessoaDTO = await _pessoaService.GetById(id);
            if (pessoaDTO == null) return NotFound("Product not found!");
            await _pessoaService.Remove(id);
            return Ok(pessoaDTO);
        }

    }
}
