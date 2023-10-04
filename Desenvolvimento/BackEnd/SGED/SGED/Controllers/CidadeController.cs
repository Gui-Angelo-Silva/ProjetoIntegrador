using SGED.DTO.Entities;
using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace SGED.Controllers;

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
    public async Task<ActionResult<IEnumerable<EstadoDTO>>> Get()
    {
        var cidadesDTO = await _cidadeService.GetAll();
        if (cidadesDTO == null) return NotFound("Cidades not found!");
        return Ok(cidadesDTO);
    }

    [HttpGet("{id}", Name = "GetCidade")]
    public async Task<ActionResult<CidadeDTO>> Get(int id)
    {
        var cidadeDTO = await _cidadeService.GetById(id);
        if (cidadeDTO == null) return NotFound("Cidade not found");
        return Ok(cidadeDTO);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] CidadeDTO cidadeDTO)
    {
        if (cidadeDTO is null) return BadRequest("Data Invalid");
        await _cidadeService.Create(cidadeDTO);
        return new CreatedAtRouteResult("GetCidade", new { id = cidadeDTO.Id }, cidadeDTO);
    }

    [HttpPut()]
    public async Task<ActionResult> Put([FromBody] CidadeDTO cidadeDTO)
    {
        if (cidadeDTO is null) return BadRequest("Data invalid");
        await _cidadeService.Update(cidadeDTO);
        return Ok(cidadeDTO);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<CidadeDTO>> Delete(int id)
    {
        var cidadeDTO = await _cidadeService.GetById(id);
        if (cidadeDTO == null) return NotFound("Product not found");
        await _cidadeService.Remove(id);
        return Ok(cidadeDTO);
    }
}
