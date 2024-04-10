using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGED.DTO.Entities;
using SGED.Services.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	//[Authorize("ApiScope")]
	public class TipoUsuarioController : Controller
	{
		private readonly ITipoUsuarioService _service;

		public TipoUsuarioController(ITipoUsuarioService service)
		{
			_service = service;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<TipoUsuarioDTO>>> Get()
		{
			var tipoUsuarioDTO = await _service.GetAll();
			return Ok(tipoUsuarioDTO);
		}

		[HttpGet("{id}", Name = "GetTipoUsuario")]
		public async Task<ActionResult<TipoUsuarioDTO>> Get(int id)
		{
			var tipoUsuarioDTO = await _service.GetById(id);
			if (tipoUsuarioDTO == null) return NotFound("Tipo de usuário não encontrado!");
			return Ok(tipoUsuarioDTO);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] TipoUsuarioDTO tipoUsuarioDTO)
		{
			if (tipoUsuarioDTO is null) return BadRequest("Dado inválido!");
			await _service.Create(tipoUsuarioDTO);
			return new CreatedAtRouteResult("GetTipoUsuario", new { id = tipoUsuarioDTO.Id }, tipoUsuarioDTO);
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] TipoUsuarioDTO tipoUsuarioDTO)
		{
			if (tipoUsuarioDTO is null) return BadRequest("Dado inválido!");
			await _service.Update(tipoUsuarioDTO);
			return Ok(tipoUsuarioDTO);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TipoUsuarioDTO>> Delete(int id)
		{
			var tipoUsuarioDTO = await _service.GetById(id);
			if (tipoUsuarioDTO == null) return NotFound("Tipo de usuário não encontrado!");
			await _service.Remove(id);
			return Ok(tipoUsuarioDTO);
		}
	}
}