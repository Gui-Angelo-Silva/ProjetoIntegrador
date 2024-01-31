using Microsoft.AspNetCore.Mvc;
using SGED.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class LogradouroController : Controller
	{
		private readonly ILogradouroService _logradouroService;

		public LogradouroController(ILogradouroService logradouroService)
		{
			_logradouroService = logradouroService;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<LogradouroDTO>>> Get()
		{
			var logradouroDTO = await _logradouroService.GetAll();
			return Ok(logradouroDTO);
		}

		[HttpGet("id", Name = "GetLogradouro")]
		public async Task<ActionResult<LogradouroDTO>> Get(int id)
		{
			var logradouroDTO = await _logradouroService.GetById(id);
			if (logradouroDTO == null) return NotFound("Logradouro não encontrado!");
			return Ok(logradouroDTO);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] LogradouroDTO logradouroDTO)
		{
			if (logradouroDTO is null) return BadRequest("Dado Inválido!");
			await _logradouroService.Create(logradouroDTO);
			return new CreatedAtRouteResult("GetLogradouro", new { id = logradouroDTO.Id }, logradouroDTO);
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] LogradouroDTO logradouroDTO)
		{
			if (logradouroDTO is null) return BadRequest("Dado Inválido!");
			await _logradouroService.Update(logradouroDTO);
			return Ok(logradouroDTO);
		}

		[HttpDelete("id")]
		public async Task<ActionResult> Delete(int id)
		{
			var logradouroDTO = await _logradouroService.GetById(id);
			if (logradouroDTO == null) return BadRequest("Dado Inválido!");
			await _logradouroService.Remove(id);
			return Ok(logradouroDTO);
		}
	}
}
