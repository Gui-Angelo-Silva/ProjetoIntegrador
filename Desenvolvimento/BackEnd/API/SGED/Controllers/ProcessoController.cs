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
    public class ProcessoController : Controller
    {
        private readonly IProcessoService _processoService;
        private readonly Response _response;

        public ProcessoController(IProcessoService processoService)
        {
            _processoService = processoService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<ProcessoDTO>>> Get()
        {
            try
            {
                var processosDTO = await _processoService.GetAll();
                _response.SetSuccess();
                _response.Message = processosDTO.Any() ?
                    "Lista do(s) Processo(s) obtida com sucesso." :
                    "Nenhum Processo encontrado.";
                _response.Data = processosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Processo(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetProcesso")]
        public async Task<ActionResult<ProcessoDTO>> Get(int id)
        {
            try
            {
                var processoDTO = await _processoService.GetById(id);
                if (processoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Processo não encontrado!";
                    _response.Data = processoDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.StatusProcesso + " obtido com sucesso.";
                _response.Data = processoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Processo informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] ProcessoDTO processoDTO)
        {
            if (processoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = processoDTO;
                return BadRequest(_response);
            }
            processoDTO.Id = 0;

            try
            {
                await _processoService.Create(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.StatusProcesso + " cadastrado com sucesso.";
                _response.Data = processoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] ProcessoDTO processoDTO)
        {
            if (processoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = processoDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingProcessoDTO = await _processoService.GetById(processoDTO.Id);
                if (existingProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                await _processoService.Update(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.StatusProcesso + " alterado com sucesso.";
                _response.Data = processoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ProcessoDTO>> Delete(int id)
        {
            try
            {
                var processoDTO = await _processoService.GetById(id);
                if (processoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Processo não encontrado!";
                    _response.Data = new { errorId = "Processo não encontrado!" };
                    return NotFound(_response);
                }

                await _processoService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.StatusProcesso + " excluído com sucesso.";
                _response.Data = processoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }
    }
}