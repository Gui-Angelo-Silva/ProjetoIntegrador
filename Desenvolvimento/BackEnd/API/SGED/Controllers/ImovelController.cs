using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class ImovelController : Controller
	{
		private readonly IImovelService _imovelService;

		public ImovelController(IImovelService imovelService)
		{
			_imovelService = imovelService;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<ImovelDTO>>> Get()
		{
			var imovelDTO = await _imovelService.GetAll();
			return Ok(imovelDTO);
		}

		[HttpGet("id", Name = "GetImovel")]
		public async Task<ActionResult<ImovelDTO>> Get(int id)
		{
			var imovelDTO = await _imovelService.GetById(id);
			if (imovelDTO == null) return NotFound("Imóvel não encontrado!");
			return Ok(imovelDTO);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] ImovelDTO imovelDTO)
		{
			if (imovelDTO is null) return BadRequest("Dado Inválido!");
			await _imovelService.Create(imovelDTO);
			return new CreatedAtRouteResult("GetImovel", new { id = imovelDTO.Id }, imovelDTO);
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] ImovelDTO imovelDTO)
		{
			if (imovelDTO is null) return BadRequest("Dado Inválido!");
			await _imovelService.Update(imovelDTO);
			return Ok(imovelDTO);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<ImovelDTO>> Delete(int id)
		{
			var imovelDTO = await _imovelService.GetById(id);
			if (imovelDTO == null) return BadRequest("Imovel não encontrado!");
			await _imovelService.Remove(id);
			return Ok(imovelDTO);
		}
	}
}
