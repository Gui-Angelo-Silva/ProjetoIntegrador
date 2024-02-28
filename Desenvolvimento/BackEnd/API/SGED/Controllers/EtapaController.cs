using Microsoft.AspNetCore.Mvc;
using SGED.DTO.Entities;
using SGED.Repositories.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EtapaController : Controller
	{
		private readonly IEtapaService _etapaService;

		public EtapaController(IEtapaService etapaservice)
		{
			_etapaService = etapaservice;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<EtapaDTO>>> Get()
		{
			var etapaDTO = await _etapaService.GetAll();
			return Ok(etapaDTO);
		}

		[HttpGet("id", Name = "GetEtapa")]
		public async Task<ActionResult<EtapaDTO>> Get(int id)
		{
			var etapaDTO = await _etapaService.GetById(id);
			if (etapaDTO == null) return NotFound("Etapa não encontrada!");
			return Ok(etapaDTO);	
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] EtapaDTO etapaDTO)
		{
			if (etapaDTO == null) return BadRequest("Dado Inválido!");
			await _etapaService.Create(etapaDTO);
			return new CreatedAtRouteResult("GetEtapa", new { id = etapaDTO.Id }, etapaDTO);
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] EtapaDTO etapaDTO)
		{
			if (etapaDTO is null) return BadRequest("Dado Inválido!");
			await _etapaService.Update(etapaDTO);
			return Ok(etapaDTO);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<EtapaDTO>> Delete(int id)
		{
			var etapaDTO = await _etapaService.GetById(id);
			if (etapaDTO == null) return BadRequest("Etapa não encontrada!");
			await _etapaService.Remove(id);
			return Ok(etapaDTO);
		}
	}
}
