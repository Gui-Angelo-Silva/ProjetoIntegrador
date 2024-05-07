using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class TipoDocumentoController : Controller
	{
		private readonly ITipoDocumentoService _tipoDocumentoService;
		private Response _response;

		public TipoDocumentoController(ITipoDocumentoService tipoDocumentoService)
		{
			_tipoDocumentoService = tipoDocumentoService;

			_response = new Response();
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> Get()
		{
			var tipoDocumentos = await _tipoDocumentoService.GetAll();
			_response.Status = true; _response.Message = tipoDocumentos;
			return Ok(_response);
		}

		[HttpGet("{id}", Name = "GetTipoDocumento")]
		public async Task<ActionResult<TipoDocumentoDTO>> Get(int id)
		{
			var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
			if (tipoDocumentoDTO == null)
			{
				_response.Status = false; _response.Message = "Tipo Documento não encontrado!";
				return NotFound(_response);
			};

			_response.Status = true; _response.Message = tipoDocumentoDTO;
			return Ok(_response);
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] TipoDocumentoDTO tipoDocumentoDTO)
		{
			if (tipoDocumentoDTO == null)
			{
				_response.Status = false; _response.Message = "Dado inválido!";
				return BadRequest(_response);
			}

			var tipoDocumentos = await _tipoDocumentoService.GetAll();

			if (tipoDocumentos.FirstOrDefault(tipodocumento => tipodocumento.NomeTipoDocumento == tipoDocumentoDTO.NomeTipoDocumento) != null)
			{
				_response.Status = false; _response.Message = "Já existe o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
				return BadRequest(_response);
			}
			else
			{
				tipoDocumentoDTO.EnableAllOperations();
				await _tipoDocumentoService.Create(tipoDocumentoDTO);

				return CreatedAtRoute("GetTipoDocumento", new { id = tipoDocumentoDTO.Id }, tipoDocumentoDTO);
			}
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] TipoDocumentoDTO tipoDocumentoDTO)
		{
			if (tipoDocumentoDTO == null)
			{
				_response.Status = false; _response.Message = "Dado inválido!";
				return BadRequest(_response);
			}

			var existingTipoDocumento = await _tipoDocumentoService.GetById(tipoDocumentoDTO.Id);
			if (existingTipoDocumento == null)
			{
				_response.Status = false; _response.Message = "Não existe o Tipo Documento informado!";
				return BadRequest(_response);
			}
			else if (!existingTipoDocumento.Status)
			{
				_response.Status = false; _response.Message = "O Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " está desabilitado para alteração!";
				return BadRequest(_response);
			}

			var tipoProcessos = await _tipoDocumentoService.GetAll();
			tipoProcessos = tipoProcessos.Where(tp => tp.Id != tipoDocumentoDTO.Id);

			if (tipoProcessos.FirstOrDefault(tp => tp.NomeTipoDocumento == tipoDocumentoDTO.NomeTipoDocumento) != null)
			{
				_response.Status = false; _response.Message = "Já existe o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
				return BadRequest(_response);
			}
			else
			{
				tipoDocumentoDTO.EnableAllOperations();
				await _tipoDocumentoService.Update(tipoDocumentoDTO);

				_response.Status = true; _response.Message = tipoDocumentoDTO;
				return Ok(_response);
			}
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<TipoDocumentoDTO>> Delete(int id)
		{
			var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
			if (tipoDocumentoDTO == null)
			{
				_response.Status = false; _response.Message = "Tipo Documento não encontrado!";
				return NotFound(_response);
			}
			if (!tipoDocumentoDTO.Status)
			{
				_response.Status = false; _response.Message = "O Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " está desabilitado para exclusão!";
				return BadRequest(_response);
			}

			await _tipoDocumentoService.Remove(id);
			return Ok(tipoDocumentoDTO);
		}


		[HttpPut("{id}/Ativar")]
		public async Task<ActionResult<TipoDocumentoDTO>> Activity(int id)
		{
			var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
			if (tipoDocumentoDTO == null)
			{
				_response.Status = false; _response.Message = "Tipo Documento não encontrado!";
				return NotFound(_response);
			}

			if (!tipoDocumentoDTO.Status)
			{
				tipoDocumentoDTO.EnableAllOperations();
				await _tipoDocumentoService.Update(tipoDocumentoDTO);
			}

			_response.Status = true; _response.Message = tipoDocumentoDTO;
			return Ok(_response);
		}

		[HttpPut("{id}/Desativar")]
		public async Task<ActionResult<TipoProcessoDTO>> Desactivity(int id)
		{
			var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
			if (tipoDocumentoDTO == null)
			{
				_response.Status = false; _response.Message = "Tipo Documento não encontrado!";
				return NotFound(_response);
			}

			if (tipoDocumentoDTO.Status)
			{
				tipoDocumentoDTO.DisableAllOperations();
				await _tipoDocumentoService.Update(tipoDocumentoDTO);
			}

			_response.Status = true; _response.Message = tipoDocumentoDTO;
			return Ok(_response);
		}
	}
}
