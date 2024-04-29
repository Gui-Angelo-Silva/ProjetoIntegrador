using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
	[ApiController]
	public class TipoDocumentoController : Controller
	{
		private readonly ITipoDocumentoService _tipoDocumentoService;

		public TipoDocumentoController(ITipoDocumentoService tipoDocumentoService)
		{
			_tipoDocumentoService = tipoDocumentoService;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> Get()
		{
			var tipoDocumentosDTO = await _tipoDocumentoService.GetAll();
			return Ok(tipoDocumentosDTO);
		}

		[HttpGet("{id}", Name = "GetTipoDocumento")]
		public async Task<ActionResult<TipoDocumentoDTO>> Get(int id)
		{
			var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
			if (tipoDocumentoDTO == null) return NotFound("TipoDocumento não encontrado!");
			return Ok(tipoDocumentoDTO);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] TipoDocumentoDTO TipoDocumentoDTO)
		{
			if (TipoDocumentoDTO is null) return BadRequest("Dado Inválido!");
			await _tipoDocumentoService.Create(TipoDocumentoDTO);
			return new CreatedAtRouteResult("GetTipoDocumento", new { id = TipoDocumentoDTO.Id }, TipoDocumentoDTO);
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] TipoDocumentoDTO TipoDocumentoDTO)
		{
			if (TipoDocumentoDTO is null) return BadRequest("Dado Inválido!");
			await _tipoDocumentoService.Update(TipoDocumentoDTO);
			return Ok(TipoDocumentoDTO);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TipoDocumentoDTO>> Delete(int id)
		{
			var TipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
			if (TipoDocumentoDTO == null) return NotFound("TipoDocumento não encontrad0!");
			await _tipoDocumentoService.Remove(id);
			return Ok(TipoDocumentoDTO);	
		}
	}
}
