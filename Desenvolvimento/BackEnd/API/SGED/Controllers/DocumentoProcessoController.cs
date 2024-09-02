using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;
using System.Collections;
using SGED.Objects.Enums;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class DocumentoProcessoController : Controller
	{

		private readonly IDocumentoProcessoService _documentoProcessoService;
		private readonly ITipoDocumentoService _tipoDocumentoService;
		private readonly Response _response;

		public DocumentoProcessoController(IDocumentoProcessoService DocumentoProcessoService, ITipoDocumentoService TipoDocumentoService)
		{
			_documentoProcessoService = DocumentoProcessoService;
			_tipoDocumentoService = TipoDocumentoService;

			_response = new Response();
		}

		[HttpGet()]
		public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> GetAll()
		{
			try
			{
				var documentoProcessos = await _documentoProcessoService.GetAll();
				_response.SetSuccess();
				_response.Message = documentoProcessos.Any() ?
					"Lista do(s) Documento(s) de Processo(s) obtida com sucesso." :
					"Nenhum Documento(s) de Processo(s) encontrado!";
				_response.Data = documentoProcessos;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível adquirir a lista do(s) Documento(s) de Processo(s)!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpGet("{id:int}", Name = "GetDocumentoProcesso")]
		public async Task<ActionResult<TipoDocumentoDTO>> Get(int id)
		{
			try
			{
				var documentoProcessoDTO = await _documentoProcessoService.GetById(id);
				if (documentoProcessoDTO is null)
				{
					_response.SetNotFound();
					_response.Message = "Documento de Processo não encontrado!";
					_response.Data = documentoProcessoDTO;
					return NotFound(_response);
				};

				_response.SetSuccess();
				_response.Message = "Documento de Processo obtido com sucesso.";
				_response.Data = documentoProcessoDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível adquirir o Documento de Processo informado!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpPost()]
		public async Task<ActionResult> Post([FromBody] DocumentoProcessoDTO documentoProcessoDTO)
		{
			if (documentoProcessoDTO is null)
			{
				_response.SetInvalid();
				_response.Message = "Dado(s) inválido(s)!";
				_response.Data = documentoProcessoDTO;
				return BadRequest(_response);
			}
			documentoProcessoDTO.Id = 0;

			try
			{
				var tipoDocumentoDTO = await _tipoDocumentoService.GetById(documentoProcessoDTO.IdTipoDocumento);

				if (tipoDocumentoDTO is null)
				{
					_response.SetNotFound();
					_response.Message = "O Tipo de Documento informado não existe!";
					_response.Data = new { errorIdTipoDocumento = "O Tipo de Documento informado não existe!" };
					return NotFound(_response);
				}
				else if (!tipoDocumentoDTO.CanRelate())
				{
					_response.SetConflict();
					_response.Message = "Não é possível relacionamentos o Documento de Processo ao Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!";
					_response.Data = new { errorIdTipoDocumento = "Não é possível relacionamentos o Documento de Processo ao Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!" }; ;
					return BadRequest(_response);
				}

				await _documentoProcessoService.Create(documentoProcessoDTO);

				_response.SetSuccess();
				_response.Message = "Documento de Processo cadastrado com sucesso.";
				_response.Data = documentoProcessoDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível cadastrar o Documento de Processo!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] DocumentoProcessoDTO documentoProcessoDTO)
		{
			if (documentoProcessoDTO is null)
			{
				_response.SetInvalid();
				_response.Message = "Dado(s) inválido(s)!";
				_response.Data = documentoProcessoDTO;
				return BadRequest(_response);
			}

			try
			{
				var existingDocumentoProcesso = await _documentoProcessoService.GetById(documentoProcessoDTO.Id);
				if (existingDocumentoProcesso is null)
				{
					_response.SetNotFound();
					_response.Message = "O Documento de Processo informado não existe!";
					_response.Data = new { errorId = "O Documento de Processo informado não existe!" };
					return NotFound(_response);
				}

				var tipoDocumentoDTO = await _tipoDocumentoService.GetById(documentoProcessoDTO.IdTipoDocumento);

				if (tipoDocumentoDTO is null)
				{
					_response.SetNotFound();
					_response.Message = "O Tipo de Documento informado não existe!";
					_response.Data = new { errorIdTipoDocumento = "O Tipo de Documento informado não existe!" };
					return NotFound(_response);
				}
				else if (!tipoDocumentoDTO.CanRelate())
				{
					_response.SetConflict();
					_response.Message = "Não é possível relacionamentos o Documento de Processo ao Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!";
					_response.Data = new { errorIdTipoDocumento = "Não é possível relacionamentos o Documento de Processo ao Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!" }; ;
					return BadRequest(_response);
				}

				await _documentoProcessoService.Update(documentoProcessoDTO);

				_response.SetSuccess();
				_response.Message = "Documento de Processo alterado com sucesso.";
				_response.Data = documentoProcessoDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível alterar o Documento de Processo!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpDelete("{id:int}")]
		public async Task<ActionResult<DocumentoProcessoDTO>> Delete(int id)
		{
			try
			{
				var documentoProcessoDTO = await _documentoProcessoService.GetById(id);
				if (documentoProcessoDTO == null)
				{
					_response.SetNotFound();
					_response.Message = "Documento de Processo não encontrado!";
					_response.Data = new { errorId = "Documento de Processo não encontrado!" };
					return NotFound(_response);
				}

				var documentosProcesso = await _documentoProcessoService.GetDocumentProcessRelatedToTypeDocument(documentoProcessoDTO.IdTipoDocumento);

				if (documentosProcesso.Count() == 1) 
				{
					var tipoDocumento = await _tipoDocumentoService.GetById(documentoProcessoDTO.IdTipoDocumento);
					tipoDocumento.Enable();

					await _tipoDocumentoService.GetById(documentoProcessoDTO.IdTipoDocumento);
				}

				await _documentoProcessoService.Remove(id);

				_response.SetSuccess();
				_response.Message = "Documento de Processo excluído com sucesso.";
				_response.Data = documentoProcessoDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível excluir o Documento de Processo!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}
	}
}