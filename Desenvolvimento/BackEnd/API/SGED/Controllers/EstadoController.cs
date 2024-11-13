using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using System.Dynamic;
using SGED.Services.Server.Attributes;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoController : Controller
    {
        private readonly IEstadoService _estadoService;
        private readonly Response _response;

        public EstadoController(IEstadoService estadoService)
        {
            _estadoService = estadoService;

            _response = new Response();
        }

        [HttpGet()]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<EstadoDTO>>> GetAll()
        {
            try
            {
                var estadosDTO = await _estadoService.GetAll();
                _response.SetSuccess();
                _response.Message = estadosDTO.Any() ?
                    "Lista do(s) Estado(s) obtida com sucesso." :
                    "Nenhum Estado encontrado.";
                _response.Data = estadosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Estado(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetEstado")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<EstadoDTO>> GetById(int id)
        {
            try
            {
                var estadoDTO = await _estadoService.GetById(id);
                if (estadoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Estado não encontrado!";
                    _response.Data = estadoDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Estado " + estadoDTO.NomeEstado + " obtido com sucesso.";
                _response.Data = estadoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Estado informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Post([FromBody] EstadoDTO estadoDTO)
        {
            if (estadoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = estadoDTO;
                return BadRequest(_response);
            }
            estadoDTO.Id = 0;

            try
            {
                dynamic errors = new ExpandoObject();
                var hasErrors = false;

                var estadosDTO = await _estadoService.GetAll();
                CheckDuplicates(estadosDTO, estadoDTO, ref errors, ref hasErrors);

                if (hasErrors)
                {
                    _response.SetConflict();
                    _response.Message = "Dado(s) com conflito!";
                    _response.Data = errors;
                    return BadRequest(_response);
                }

                await _estadoService.Create(estadoDTO);

                _response.SetSuccess();
                _response.Message = "Estado " + estadoDTO.NomeEstado + " cadastrado com sucesso.";
                _response.Data = estadoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Estado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Put([FromBody] EstadoDTO estadoDTO)
        {
            if (estadoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = estadoDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingEstadoDTO = await _estadoService.GetById(estadoDTO.Id);
                if (existingEstadoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Dado(s) com conflito!";
                    _response.Data = new { errorId = "O Estado informado não existe!" };
                    return NotFound(_response);
                }

                dynamic errors = new ExpandoObject();
                var hasErrors = false;

                var estadosDTO = await _estadoService.GetAll();
                CheckDuplicates(estadosDTO, estadoDTO, ref errors, ref hasErrors);

                if (hasErrors)
                {
                    _response.SetConflict();
                    _response.Message = "Dado(s) com conflito!";
                    _response.Data = errors;
                    return BadRequest(_response);
                }

                await _estadoService.Update(estadoDTO);

                _response.SetSuccess();
                _response.Message = "Estado " + estadoDTO.NomeEstado + " alterado com sucesso.";
                _response.Data = estadoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Estado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<EstadoDTO>> Delete(int id)
        {
            try
            {
                var estadoDTO = await _estadoService.GetById(id);
                if (estadoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Dado com conflito!";
                    _response.Data = new { errorId = "Estado não encontrado!" };
                    return NotFound(_response);
                }

                await _estadoService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Estado " + estadoDTO.NomeEstado + " excluído com sucesso.";
                _response.Data = estadoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Estado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private static void CheckDuplicates(IEnumerable<EstadoDTO> estadosDTO, EstadoDTO estadoDTO, ref dynamic errors, ref bool hasErrors)
        {
            foreach (var estado in estadosDTO)
            {
                if (estadoDTO.Id == estado.Id)
                {
                    continue;
                }

                if (Operator.CompareString(estadoDTO.NomeEstado, estado.NomeEstado))
                {
                    errors.errorNomeEstado = "Já existe o Estado " + estadoDTO.NomeEstado + "!";
                    hasErrors = true;
                }

                if (Operator.CompareString(estadoDTO.UfEstado, estado.UfEstado))
                {
                    errors.errorUfEstado = "Já existe o UF " + estadoDTO.UfEstado + "!";
                    hasErrors = true;
                }
            }
        }
    }
}