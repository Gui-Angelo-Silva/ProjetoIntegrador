using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;

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
        public async Task<ActionResult<IEnumerable<EstadoDTO>>> Get()
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
        public async Task<ActionResult<EstadoDTO>> Get(int id)
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
                if (await EstadoExists(estadoDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Estado " + estadoDTO.NomeEstado + "!";
                    _response.Data = new { errorNomeEstado = "Já existe o Estado " + estadoDTO.NomeEstado + "!" };
                    return BadRequest(_response);
                }
                else if (await UfExists(estadoDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o UF " + estadoDTO.UfEstado + "!";
                    _response.Data = new { errorUfEstado = "Já existe o UF " + estadoDTO.UfEstado + "!" };
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
                    _response.Message = "O Estado informado não existe!";
                    _response.Data = estadoDTO;
                    return NotFound(_response);
                }
                else if (await EstadoExists(estadoDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Estado " + estadoDTO.NomeEstado + "!";
                    _response.Data = new { errorNomeEstado = "Já existe o Estado " + estadoDTO.NomeEstado + "!" };
                    return BadRequest(_response);
                }
                else if (await UfExists(estadoDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o UF " + estadoDTO.UfEstado + "!";
                    _response.Data = new { errorUfEstado = "Já existe o UF " + estadoDTO.UfEstado + "!" };
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
        public async Task<ActionResult<EstadoDTO>> Delete(int id)
        {
            try
            {
                var estadoDTO = await _estadoService.GetById(id);
                if (estadoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Estado não encontrado!";
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

        private async Task<bool> EstadoExists(EstadoDTO estadoDTO)
        {
            var estadosDTO = await _estadoService.GetAll();
            return estadosDTO.FirstOrDefault(e => e.Id != estadoDTO.Id && Operator.CompareString(e.NomeEstado, estadoDTO.NomeEstado)) is not null;
        }

        private async Task<bool> UfExists(EstadoDTO estadoDTO)
        {
            var estadosDTO = await _estadoService.GetAll();
            return estadosDTO.FirstOrDefault(e => e.Id != estadoDTO.Id && Operator.CompareString(e.UfEstado, estadoDTO.UfEstado)) is not null;
        }
    }
}