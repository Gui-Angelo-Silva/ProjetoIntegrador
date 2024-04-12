using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using SGED.Models.Entities;
using SGED.Helpers;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TipoProcessoController : Controller
	{
		private readonly ITipoProcessoService _tipoProcessoService;

		public TipoProcessoController(ITipoProcessoService tipoProcessoService)
		{
			_tipoProcessoService = tipoProcessoService;
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<TipoProcesso>>> Get()
		{
			var tipoProcessos = await _tipoProcessoService.GetAll();
			return Ok(tipoProcessos);
		}

		[HttpGet("{id}", Name = "GetTipoProcesso")]
		public async Task<ActionResult<TipoProcesso>> Get(int id)
		{
			var tipoProcesso = await _tipoProcessoService.GetById(id);
			if (tipoProcesso == null) return NotFound("TipoProcesso não encontrado");
			return Ok(tipoProcesso);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] TipoProcessoDTO tipoProcesso)
		{
			if (tipoProcesso == null) return BadRequest("Dado inválido!");
			tipoProcesso.Status = Status.Ativo;

			await _tipoProcessoService.Create(tipoProcesso);
			return CreatedAtRoute("GetTipoProcesso", new { id = tipoProcesso.Id }, tipoProcesso);
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] TipoProcessoDTO tipoProcesso)
		{
			if (tipoProcesso == null)
				return BadRequest("Dado inválido!");

			// Verifica se o TipoProcessoDTO existe e está ativo
			var existingTipoProcesso = await _tipoProcessoService.GetById(tipoProcesso.Id);
			if (existingTipoProcesso == null)
				return BadRequest("Não existe o Tipo Processo informado!");

			if (existingTipoProcesso.Status == Status.Inativo)
				return BadRequest("O Tipo Processo informado não está ativo para esta operação!");

			// Atualiza o status do TipoProcessoDTO para Ativo
			existingTipoProcesso.Status = Status.Ativo;

			// Atualiza o TipoProcessoDTO no serviço
			await _tipoProcessoService.Update(existingTipoProcesso);

			return Ok(existingTipoProcesso);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TipoProcesso>> Delete(int id)
		{
			var tipoProcesso = await _tipoProcessoService.GetById(id);
			if (tipoProcesso == null) return NotFound("TipoProcesso não encontrado!");
			else if (tipoProcesso.Status == Status.Inativo) return BadRequest("O Tipo Processo informado não está ativo para está operação!");

			await _tipoProcessoService.Delete(id);
			return Ok(tipoProcesso);
		}

		[HttpPut("{id}/Ativar")]
		public async Task<ActionResult<TipoProcesso>> Activity(int id)
		{
			var tipoProcesso = await _tipoProcessoService.GetById(id);
			if (tipoProcesso == null) return NotFound("TipoProcesso não encontrado!");

			tipoProcesso.Status = Status.Ativo;
			await _tipoProcessoService.Update(tipoProcesso);
			return Ok(tipoProcesso);
		}

		[HttpPut("{id}/Desativar")]
		public async Task<ActionResult<TipoProcesso>> Desactivity(int id)
		{
			var tipoProcesso = await _tipoProcessoService.GetById(id);
			if (tipoProcesso == null) return NotFound("TipoProcesso não encontrado!");

			tipoProcesso.Status = Status.Inativo;
			await _tipoProcessoService.Update(tipoProcesso);
			return Ok(tipoProcesso);
		}
	}
}
