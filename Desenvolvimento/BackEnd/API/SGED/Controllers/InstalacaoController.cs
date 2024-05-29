using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class InstalacaoController : Controller
    {

        private readonly IInstalacaoService _instalacaoService;

        public InstalacaoController(IInstalacaoService instalacaoService)
        {
            _instalacaoService = instalacaoService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<InstalacaoDTO>>> GetAll()
        {
            var instalacoesDTO = await _instalacaoService.GetAll();
            return Ok(instalacoesDTO);
        }

        [HttpGet("Id/{id}", Name = "GetInstalacao")]
        public async Task<ActionResult<InstalacaoDTO>> GetId(int id)
        {
            var instalacaoDTO = await _instalacaoService.GetById(id);
            if (instalacaoDTO == null) return NotFound("Instalação não encontrada!");
            return Ok(instalacaoDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] InstalacaoDTO instalacaoDTO)
        {
            if (instalacaoDTO is null) return BadRequest("Dado inválido!");
            await _instalacaoService.Create(instalacaoDTO);
            return new CreatedAtRouteResult("GetById", new { id = instalacaoDTO.Id }, instalacaoDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] InstalacaoDTO instalacaoDTO)
        {
            if (instalacaoDTO is null) return BadRequest("Dado inválido!");
            await _instalacaoService.Update(instalacaoDTO);
            return Ok(instalacaoDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<InstalacaoDTO>> Delete(int id)
        {
            var instalacaoDTO = await _instalacaoService.GetById(id);
            if (instalacaoDTO == null) return NotFound("Instalaçao não encontrada!");
            await _instalacaoService.Remove(id);
            return Ok(instalacaoDTO);
        }
    }
}