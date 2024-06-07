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
    public class TopografiaController : Controller
    {
        private readonly ITopografiaService _topografiaService;
        private readonly Response _response;

        public TopografiaController(ITopografiaService topografiaService)
        {
            _topografiaService = topografiaService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<TopografiaDTO>>> Get()
        {
            try
            {
                var topografiasDTO = await _topografiaService.GetAll();
                _response.SetSuccess(); _response.Data = topografiasDTO;
                _response.Message = topografiasDTO.Any() ?
                    "Lista da(s) Topografia(s) obtida com sucesso." :
                    "Nenhuma Topografia encontrada.";
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista da(s) Topografia(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetTopografia")]
        public async Task<ActionResult<TopografiaDTO>> Get(int id)
        {
            try
            {
                var topografiaDTO = await _topografiaService.GetById(id);
                if (topografiaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Topografia não encontrada!";
                    _response.Data = topografiaDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Topografia " + topografiaDTO.NomeTopografia + " obtida com sucesso.";
                _response.Data = topografiaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a Topografia informada!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] TopografiaDTO topografiaDTO)
        {
            if (topografiaDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = topografiaDTO;
                return BadRequest(_response);
            }
            topografiaDTO.Id = 0;

            try
            {
                if (await TopografiaExists(topografiaDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe a Topografia " + topografiaDTO.NomeTopografia + "!";
                    _response.Data = new { errorNomeTopografia = "Já existe a Topografia " + topografiaDTO.NomeTopografia + "!" };
                    return BadRequest(_response);
                }

                await _topografiaService.Create(topografiaDTO);

                _response.SetSuccess();
                _response.Message = "Topografia " + topografiaDTO.NomeTopografia + " cadastrada com sucesso.";
                _response.Data = topografiaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar a Topografia!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TopografiaDTO topografiaDTO)
        {
            if (topografiaDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = topografiaDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingTopografiaDTO = await _topografiaService.GetById(topografiaDTO.Id);
                if (existingTopografiaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Topografia informada não existe!";
                    _response.Data = new { errorId = "A Topografia informada não existe!" };
                    return NotFound(_response);
                }

                if (await TopografiaExists(topografiaDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe a Topografia " + topografiaDTO.NomeTopografia + "!";
                    _response.Data = new { errorNomeTopografia = "Já existe a Topografia " + topografiaDTO.NomeTopografia + "!" };
                    return BadRequest(_response);
                }

                await _topografiaService.Update(topografiaDTO);

                _response.SetSuccess();
                _response.Message = "Topografia " + topografiaDTO.NomeTopografia + " alterada com sucesso.";
                _response.Data = topografiaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar a Topografia!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<TopografiaDTO>> Delete(int id)
        {
            try
            {
                var topografiaDTO = await _topografiaService.GetById(id);
                if (topografiaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Topografia não encontrada!";
                    _response.Data = new { errorId = "Topografia não encontrada!" };
                    return NotFound(_response);
                }

                await _topografiaService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Topografia " + topografiaDTO.NomeTopografia + " excluída com sucesso.";
                _response.Data = topografiaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir a Topografia!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> TopografiaExists(TopografiaDTO topografiaDTO)
        {
            var topografiasDTO = await _topografiaService.GetAll();
            return topografiasDTO.FirstOrDefault(t => t.Id != topografiaDTO.Id && Operator.CompareString(t.NomeTopografia, topografiaDTO.NomeTopografia)) is not null;
        }
    }
}