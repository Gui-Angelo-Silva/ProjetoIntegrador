using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Interfaces;
using SGED.Services.Server.Attributes;
using System.Dynamic;

namespace SGED.Controllers
{
	[Route("api/[controller]")]
	public class CondicaoSoloController : Controller
	{
		private readonly ICondicaoSoloService _condicaoSoloService;
		private readonly Response _response;

		public CondicaoSoloController(ICondicaoSoloService condicaoSoloService, Response response)
		{
			_condicaoSoloService = condicaoSoloService;
			_response = new Response();
		}

		[HttpGet()]
		[AccessPermission("A", "B", "C")]
		public async Task<ActionResult<IEnumerable<CondicaoSoloDTO>>> GetAll()
		{
			try
			{
				var condicaosoloDTO = await _condicaoSoloService.GetAll();
				_response.SetSuccess();
				_response.Message = condicaosoloDTO.Any() ?
					"lista de Condição do Solo obtida com sucesso." :
					"Nenhuma condição do solo encontrada.";
				_response.Data = condicaosoloDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível adquirir a lista de Condição do Solo";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpGet("{id:int}", Name = "GetCondicaoSolo")]
		[AccessPermission("A", "B", "C")]
		public async Task<ActionResult<CondicaoSoloDTO>> GetById(int id)
		{
			try
			{
				var condicaosoloDTO = await _condicaoSoloService.GetById(id);
				if (condicaosoloDTO is null)
				{
					_response.SetNotFound();
					_response.Message = "Condição do solo não encontrada!";
					_response.Data = condicaosoloDTO;
					return NotFound(_response);
				};

				_response.SetSuccess();
				_response.Message = "Condição do Solo " + condicaosoloDTO.Condicao + " obtida com sucesso.";
				_response.Data = condicaosoloDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível adquirir a Condição do Solo informada!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpPost()]
		[AccessPermission("A", "B", "C")]
		public async Task<ActionResult> Post([FromBody] CondicaoSoloDTO condicaosoloDTO)
		{
			if (condicaosoloDTO is null)
			{
				_response.SetInvalid();
				_response.Message = "Dado(s) inválido(s)!";
				_response.Data = condicaosoloDTO;
				return BadRequest(_response);
			}

			condicaosoloDTO.Id = 0;

			try
			{
				dynamic errors = new ExpandoObject();
				var hasErrors = false;

				var condicoessoloDTO = await _condicaoSoloService.GetAll();
				CheckDuplicates(condicoessoloDTO, condicaosoloDTO, ref errors, ref hasErrors);

				if (hasErrors)
				{
					_response.SetConflict();
					_response.Message = "Dado(s) com conflito!";
					_response.Data = errors;
					return BadRequest(_response);
				}

				await _condicaoSoloService.Create(condicaosoloDTO);

				_response.SetSuccess();
				_response.Message = "Condição do Solo " + condicaosoloDTO.Condicao + " cadastrado com sucesso";
				_response.Data = condicaosoloDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível cadastrar a Condição do Solo!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpPut()]
		[AccessPermission("A", "B", "C")]
		public async Task<ActionResult> Put([FromBody] CondicaoSoloDTO condicaosoloDTO)
		{
			if (condicaosoloDTO is null)
			{
				_response.SetInvalid();
				_response.Message = "Dado(s) inválido(s)!";
				_response.Data = condicaosoloDTO;
				return BadRequest(_response);
			};

			try
			{
				var existingCondicaoSoloDTO = await _condicaoSoloService.GetById(condicaosoloDTO.Id);
				if (existingCondicaoSoloDTO is null)
				{
					_response.SetNotFound();
					_response.Message = "Dado(s) com conflito!";
					_response.Data = new { errorId = "A Condição do Solo informada não existe!" };
					return NotFound(_response);
				};

				dynamic errors = new ExpandoObject();
				var hasErrors = false;

				var condicaoesdosoloDTO = await _condicaoSoloService.GetAll();
				CheckDuplicates(condicaoesdosoloDTO, condicaosoloDTO, ref errors, ref hasErrors);

				if (hasErrors)
				{
					_response.SetConflict();
					_response.Message = "Dado(s) com conflito!";
					_response.Data = errors;
					return BadRequest(_response);
				};

				await _condicaoSoloService.Update(condicaosoloDTO);

				_response.SetSuccess();
				_response.Message = "Condição do Solo " + condicaosoloDTO.Condicao + " alterado com sucesso.";
				_response.Data = condicaosoloDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível alterar a Condição do Solo!";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpDelete("{id:int}")]
		[AccessPermission("A", "B", "C")]
		public async Task<ActionResult<CondicaoSoloDTO>> Delete(int id)
		{
			try
			{
				var condicaosoloDTO = await _condicaoSoloService.GetById(id);
				if (condicaosoloDTO is null)
				{
					_response.SetNotFound();
					_response.Message = "Dado com conflito!";
					_response.Data = new { errorId = "Condição do Solo não encontrada!" };
					return NotFound(_response);
				};

				await _condicaoSoloService.Remove(id);

				_response.SetSuccess();
				_response.Message = "Condição do Solo " + condicaosoloDTO.Condicao + " excluído com sucesso.";
				_response.Data = condicaosoloDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError();
				_response.Message = "Não foi possível excluir a Condição do Solo";
				_response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		private static void CheckDuplicates(IEnumerable<CondicaoSoloDTO> condicoessoloDTO, CondicaoSoloDTO condicaoSoloDTO, ref dynamic errors, ref bool hasErrors)
		{
			foreach (var condicaosolo in condicoessoloDTO)
			{
				if (condicaosolo.Id == condicaosolo.Id)
				{
					continue;
				}

				if (Operator.CompareString(condicaoSoloDTO.Condicao, condicaosolo.Condicao))
				{
					errors.errorNomeEstado = "Já existe a Condição do Solo " + condicaoSoloDTO.Condicao + "!";
					hasErrors = true;
				}

				if (Operator.CompareString(condicaoSoloDTO.Descricao, condicaosolo.Descricao))
				{
					errors.errorUfEstado = "Já existe a Descrição " + condicaoSoloDTO.Descricao + "!";
					hasErrors = true;
				}
			}
		}
	}
}
