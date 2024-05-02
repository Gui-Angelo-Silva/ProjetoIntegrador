using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	//[Authorize("ApiScope")]
	public class TipoDocumentoEtapaController : Controller
	{

		private readonly ITipoDocumentoEtapaService _tipoDocumentoEtapaService;
		private readonly ITipoDocumentoService _tipoDocumentoService;
		private readonly IEtapaService _etapaService;
		private Response _response;

		public TipoDocumentoEtapaController(ITipoDocumentoEtapaService TipoDocumentoEtapaService, ITipoDocumentoService TipoDocumentoService, IEtapaService EtapaService)
		{
			_tipoDocumentoEtapaService = TipoDocumentoEtapaService;
			_tipoDocumentoService = TipoDocumentoService;
			_etapaService = EtapaService;

			_response = new Response();
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> Get()
		{
			var tipoDocumentosEtapas = await _tipoDocumentoEtapaService.GetAll();
			_response.Status = true; _response.Message = tipoDocumentosEtapas;
			return Ok(_response);
		}

		[HttpGet("{id}", Name = "GetTipoDocumentoEtapa")]
		public async Task<ActionResult<TipoDocumentoDTO>> Get(int id)
		{
			var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
			if (tipoDocumentoEtapaDTO == null)
			{
				_response.Status = false; _response.Message = "Tipo Documento Etapa não encontrado!";
				return NotFound(_response);
			};

			_response.Status = true; _response.Message = tipoDocumentoEtapaDTO;
			return Ok(_response);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] TipoDocumentoEtapaDTO tipoDocumentoEtapaDTO)
		{
			if (tipoDocumentoEtapaDTO == null)
			{
				_response.Status = false; _response.Message = "Dado inválido!";
				return BadRequest(_response);
			}

			var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);

			if (etapaDTO == null)
			{
				_response.Status = false; _response.Message = "A Etapa não existe!";
				return NotFound(_response);
			}
			else if (!etapaDTO.Status)
			{
				_response.Status = false; _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " está desabilitada para adicionar relacionamentos com Tipo Documento!";
				return BadRequest(_response);
			}

			var tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

			if (tipoDocumentoDTO == null)
			{
				_response.Status = false; _response.Message = "O Tipo Documento não existe!";
				return NotFound(_response);
			}
			else if (!tipoDocumentoDTO.Status)
			{
				_response.Status = false; _response.Message = "O Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " está desabilitado para adicionar relacionamentos com Etapas!";
				return BadRequest(_response);
			}

			var tipoDocumentoEtapasDTO = await _tipoDocumentoEtapaService.GetAll();
			if (tipoDocumentoEtapasDTO.FirstOrDefault(tipoDocumentoEtapa => tipoDocumentoEtapa.IdTipoDocumento == tipoDocumentoDTO.Id && tipoDocumentoEtapa.IdEtapa == etapaDTO.Id) != null)
			{
				_response.Status = false; _response.Message = "Já existe um relacionamento da Etapa " + etapaDTO.NomeEtapa + " com o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
				return BadRequest(_response);
			}

			tipoDocumentoEtapaDTO.EnableAllOperations();
			await _tipoDocumentoEtapaService.Create(tipoDocumentoEtapaDTO);
			return new CreatedAtRouteResult("GetTipoDocumentoEtapa", new { id = tipoDocumentoEtapaDTO.Id }, tipoDocumentoEtapaDTO);
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] TipoDocumentoEtapaDTO tipoDocumentoEtapaDTO)
		{
			if (tipoDocumentoEtapaDTO == null)
			{
				return BadRequest("Dado Inválido!");
			}

			var existingTipoDocumentoEtapa = await _tipoDocumentoEtapaService.GetById(tipoDocumentoEtapaDTO.Id);
			if (existingTipoDocumentoEtapa == null)
			{
				return BadRequest("Não existe o Tipo Documento Etapa informado!");
			}
			else if (!existingTipoDocumentoEtapa.Status)
			{
				return BadRequest("O Tipo Documento Etapa está desabilitado para alteração!");
			}

			var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);

			if (etapaDTO == null)
			{
				_response.Status = false; _response.Message = "A Etapa não existe!";
				return NotFound(_response);
			}
			else if (!etapaDTO.Status)
			{
				_response.Status = false; _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " está desabilitada para adicionar relacionamentos com Tipo Documento!";
				return BadRequest(_response);
			}

			var tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

			if (tipoDocumentoDTO == null)
			{
				_response.Status = false; _response.Message = "O Tipo Documento não existe!";
				return NotFound(_response);
			}
			else if (!tipoDocumentoDTO.Status)
			{
				_response.Status = false; _response.Message = "O Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " está desabilitado para adicionar relacionamentos com Etapas!";
				return BadRequest(_response);
			}

			var tipoDocumentoEtapasDTO = await _tipoDocumentoEtapaService.GetAll();
			tipoDocumentoEtapasDTO = tipoDocumentoEtapasDTO.Where(tipoDocumentoEtapa => tipoDocumentoEtapa.Id != tipoDocumentoEtapaDTO.Id);
			if (tipoDocumentoEtapasDTO.FirstOrDefault(tipoDocumentoEtapa => tipoDocumentoEtapa.IdTipoDocumento == tipoDocumentoDTO.Id && tipoDocumentoEtapa.IdEtapa == etapaDTO.Id) != null)
			{
				_response.Status = false; _response.Message = "Já existe um relacionamento da Etapa " + etapaDTO.NomeEtapa + " com o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
				return BadRequest(_response);
			}

			tipoDocumentoEtapaDTO.EnableAllOperations();
			await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);
			return Ok(tipoDocumentoEtapaDTO);
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TipoDocumentoEtapaDTO>> Delete(int id)
		{
			var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
			if (tipoDocumentoEtapaDTO == null)
			{
				_response.Status = false; _response.Message = "Tipo Documento Etapa não encontrado!";
				return NotFound(_response);
			}
			if (!tipoDocumentoEtapaDTO.Status)
			{
				_response.Status = false; _response.Message = "O Tipo Documento Etapa está desabilitado para exclusão!";
				return BadRequest(_response);
			}

			await _tipoDocumentoEtapaService.Remove(id);
			return Ok(tipoDocumentoEtapaDTO);
		}

		[HttpGet("GetTypeDocumentsRelatedToStage/{idEtapa}")]
		public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> GetTypeDocumentsRelatedToStage(int idEtapa)
		{
			if (idEtapa == 0)
			{
				_response.Status = false; _response.Message = "Informe o Id da Etapa!";
				return BadRequest(_response);
			}

			var tipoDocumentosDTO = await _tipoDocumentoEtapaService.GetTypeDocumentsRelatedToStage(idEtapa);
			_response.Status = true; _response.Message = tipoDocumentosDTO;
			return Ok(_response);
		}

		[HttpGet("GetTypeDocumentsNoRelatedToStage/{idEtapa}")]
		public async Task<ActionResult<TipoDocumentoDTO>> GetTypeDocumentsNoRelatedToStage(int idEtapa)
		{
			if (idEtapa == 0)
			{
				_response.Status = false; _response.Message = "Informe o Id da Etapa!";
				return BadRequest(_response);
			}

			var tipoDocumentosDTO = await _tipoDocumentoEtapaService.GetTypeDocumentsNoRelatedToStage(idEtapa);
			_response.Status = true; _response.Message = tipoDocumentosDTO;
			return Ok(_response);
		}

		[HttpPut("{id}/Ativar")]
		public async Task<ActionResult<TipoDocumentoEtapaDTO>> Activity(int id)
		{
			var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
			if (tipoDocumentoEtapaDTO == null)
			{
				_response.Status = false; _response.Message = "Tipo Documento Etapa não encontrado!";
				return NotFound(_response);
			}

			if (!tipoDocumentoEtapaDTO.Status)
			{
				tipoDocumentoEtapaDTO.EnableAllOperations();
				await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);
			}

			_response.Status = true; _response.Message = tipoDocumentoEtapaDTO;
			return Ok(_response);
		}

		[HttpPut("{id}/Desativar")]
		public async Task<ActionResult<TipoDocumentoEtapaDTO>> Desactivity(int id)
		{
			var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
			if (tipoDocumentoEtapaDTO == null)
			{
				_response.Status = false; _response.Message = "Tipo Documento Etapa não encontrado!";
				return NotFound(_response);
			}

			if (tipoDocumentoEtapaDTO.Status)
			{
				tipoDocumentoEtapaDTO.DisableAllOperations();
				await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);
			}

			_response.Status = true; _response.Message = tipoDocumentoEtapaDTO;
			return Ok(_response);
		}
	}
}