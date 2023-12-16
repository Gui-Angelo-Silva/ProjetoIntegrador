using Microsoft.AspNetCore.Mvc;
using SGED.DTO.Entities;
using SGED.Services.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TipoLogradouroController : Controller
	{
		private readonly ITipoLogradouroService _tipologradouroservice;

		public TipoLogradouroController(ITipoLogradouroService tipologradouroservice)
		{
			_tipologradouroservice = tipologradouroservice;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<TipoLogradouroDTO>>> Get()
		{
			var tipologradouroDTO = await _tipologradouroservice.GetAll();
			if (tipologradouroDTO == null) return NotFound("Tipo Logradouro não encontrado!");
			return Ok(tipologradouroDTO);
		}

		[HttpGet("{id}", Name = "GetTipoLogradouro")]
		public async Task<ActionResult<TipoLogradouroDTO>> Get(int id)
		{
			var tipologradouroDTO = await _tipologradouroservice.GetById(id);
			if (tipologradouroDTO == null) return NotFound("Tipo Logradouro não encontrado!");
			return Ok(tipologradouroDTO);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] TipoLogradouroDTO tipoLogradouroDTO)
		{
			if (tipoLogradouroDTO is null) return BadRequest("Dado inválido!");

			await _tipologradouroservice.Create(tipoLogradouroDTO);
			return new CreatedAtRouteResult("GetById", new { id = tipoLogradouroDTO.Id }, tipoLogradouroDTO);
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] TipoLogradouroDTO tipoLogradouroDTO)
		{
			if (tipoLogradouroDTO is null) return BadRequest("Dado inválido!");
			await _tipologradouroservice.Update(tipoLogradouroDTO);
			return Ok(tipoLogradouroDTO);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TipoLogradouroDTO>> Delete(int id)
		{
			var tipologradouroDTO = await _tipologradouroservice.GetById(id);
			if (tipologradouroDTO == null) return NotFound("Tipo Logradouro não encontrado!");
			await _tipologradouroservice.Remove(id);
			return Ok(tipologradouroDTO);
		}
	}
}
