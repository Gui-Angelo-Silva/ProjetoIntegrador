using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Interfaces;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities;
using SGED.Repositories.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EtapaController : Controller
	{
		private readonly ITipoProcessoService _tipoProcessoService;
		private readonly IEtapaService _etapaService;
		private Response _response;

		public EtapaController(ITipoProcessoService tipoprocessoservice, IEtapaService etapaservice)
		{
			_tipoProcessoService = tipoprocessoservice;
			_etapaService = etapaservice;
			_response = new Response();
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<EtapaDTO>>> Get()
		{
			var etapaDTO = await _etapaService.GetAll();
			_response.Status = true; _response.Message = etapaDTO;
			return Ok(_response);
		}

		[HttpGet("id", Name = "GetEtapa")]
		public async Task<ActionResult<EtapaDTO>> GetById(int id)
		{
			var etapaDTO = await _etapaService.GetById(id);
			if (etapaDTO == null)
			{
				_response.Status = false; _response.Message = "Tipo Processo não encontrado!";
				return NotFound(_response);
			};

			_response.Status = true; _response.Message = etapaDTO;
			return Ok(_response);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] EtapaDTO etapaDTO)
		{
			if (etapaDTO == null)
			{
				_response.Status = false; _response.Message = "Dado inválido!";
				return BadRequest(_response);
			}

			var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);

			if (tipoProcessoDTO == null)
			{
				_response.Status = false; _response.Message = "O Tipo Processo não existe!";
				return NotFound(_response);
			}
			else if (!tipoProcessoDTO.Status)
			{
				_response.Status = false; _response.Message = "O Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " está desabilitado para adicionar novas etapas!";
				return BadRequest(_response);
			}

			var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(etapaDTO.IdTipoProcesso);
			if (etapasDTO.FirstOrDefault(etapa => etapa.NomeEtapa == etapaDTO.NomeEtapa) != null)
			{
				_response.Status = false; _response.Message = "Já existe a Etapa " + etapaDTO.NomeEtapa + " no Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!";
				return BadRequest(_response);
			}

			etapaDTO.EnableAllOperations();
			await _etapaService.Create(etapaDTO);
			return new CreatedAtRouteResult("GetEtapa", new { id = etapaDTO.Id }, etapaDTO);
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] EtapaDTO etapaDTO)
		{
			if (etapaDTO == null)
			{
				return BadRequest("Dado Inválido!");
			}

			var existingEtapa = await _etapaService.GetById(etapaDTO.Id);
			if (existingEtapa == null)
			{
				return BadRequest("Não existe a Etapa informada!");
			}
			else if (!existingEtapa.Status)
			{
				return BadRequest("A Etapa " + existingEtapa.NomeEtapa + " está desabilitada para alteração!");
			}

			var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);

			if (tipoProcessoDTO == null)
			{
				return BadRequest("O Tipo Processo não existe!");
			}
			else if (!tipoProcessoDTO.Status)
			{
				return BadRequest("O Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " está desabilitado para adicionar novas etapas!");
			}

			var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(tipoProcessoDTO.Id);

			if (etapasDTO.FirstOrDefault(etapa => etapa.NomeEtapa == etapaDTO.NomeEtapa) != null)
			{
				return BadRequest("Já existe a Etapa " + etapaDTO.NomeEtapa + " no Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!");
			}

			etapaDTO.EnableAllOperations();
			await _etapaService.Update(etapaDTO);
			return Ok(etapaDTO);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<EtapaDTO>> Delete(int id)
		{
			var etapaDTO = await _etapaService.GetById(id);
			if (etapaDTO == null)
			{
				_response.Status = false; _response.Message = "Etapa não encontrada!";
				return NotFound(_response);
			}
			if (!etapaDTO.Status)
			{
				_response.Status = false; _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " está desabilitada para exclusão!";
				return BadRequest(_response);
			}

			await _etapaService.Remove(id);
			return Ok(etapaDTO);
		}

		[HttpGet("GetRelatedToTypeProcess/{idTipoProcesso}")]
		public async Task<ActionResult<IEnumerable<EtapaDTO>>> GetStagesRelatedToTypeProcess(int idTipoProcesso)
		{
			if (idTipoProcesso == 0)
			{
				_response.Status = false; _response.Message = "Informe o Id do Tipo Processo!";
				return BadRequest(_response);
			}

			var etapaDTO = await _etapaService.GetStagesRelatedToTypeProcess(idTipoProcesso);
			_response.Status = true; _response.Message = etapaDTO;
			return Ok(_response);
		}

		[HttpPut("{id}/Ativar")]
		public async Task<ActionResult<EtapaDTO>> Activity(int id)
		{
			var etapaDTO = await _etapaService.GetById(id);
			if (etapaDTO == null)
			{
				_response.Status = false; _response.Message = "Etapa não encontrada!";
				return NotFound(_response);
			}

			if (!etapaDTO.Status)
			{
				etapaDTO.EnableAllOperations();
				await _etapaService.Update(etapaDTO);
			}

			_response.Status = true; _response.Message = etapaDTO;
			return Ok(_response);
		}

		[HttpPut("{id}/Desativar")]
		public async Task<ActionResult<EtapaDTO>> Desactivity(int id)
		{
			var etapaDTO = await _etapaService.GetById(id);
			if (etapaDTO == null)
			{
				_response.Status = false; _response.Message = "Etapa não encontrada!";
				return NotFound(_response);
			}

			if (etapaDTO.Status)
			{
				etapaDTO.DisableAllOperations();
				await _etapaService.Update(etapaDTO);
			}

			_response.Status = true; _response.Message = etapaDTO;
			return Ok(_response);
		}
	}
}
