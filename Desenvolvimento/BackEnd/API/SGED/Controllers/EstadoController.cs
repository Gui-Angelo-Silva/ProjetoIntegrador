using SGED.DTO.Entities;
using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace SGED.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EstadoController : Controller
{

    private readonly IEstadoService _estadoService;

    public EstadoController(IEstadoService estadoService)
    {
        _estadoService = estadoService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<EstadoDTO>>> Get()
    {
        var estadosDTO = await _estadoService.GetAll();
        if (estadosDTO == null) return NotFound("Estados não econtrados!");
        return Ok(estadosDTO);
    }

    [HttpGet("{id}", Name = "GetEstado")]
    public async Task<ActionResult<EstadoDTO>> Get(int id)
    {
        var estadoDTO = await _estadoService.GetById(id);
        if (estadoDTO == null) return NotFound("Estado não encontrado!");
        return Ok(estadoDTO);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] EstadoDTO estadoDTO)
    {
        if (estadoDTO is null) return BadRequest("Dado inválido!");
        await _estadoService.Create(estadoDTO);
        return new CreatedAtRouteResult("GetEstado", new { id = estadoDTO.Id }, estadoDTO);
    }

    [HttpPut()]
    public async Task<ActionResult> Put([FromBody] EstadoDTO estadoDTO)
    {
        if (estadoDTO is null) return BadRequest("Dado inválido!");
        await _estadoService.Update(estadoDTO);
        return Ok(estadoDTO);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<EstadoDTO>> Delete(int id)
    {
        var estadoDTO = await _estadoService.GetById(id);
        if (estadoDTO == null) return NotFound("Estado não encontrado!");
        await _estadoService.Remove(id);
        return Ok(estadoDTO);
    }
}
