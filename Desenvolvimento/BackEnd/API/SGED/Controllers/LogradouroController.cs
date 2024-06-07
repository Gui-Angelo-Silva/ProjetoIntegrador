using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using Google.Protobuf;
using SGED.Services.Entities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LogradouroController : Controller
    {
        private readonly ITipoLogradouroService _tipoLogradouroService;
        private readonly IBairroService _bairroService;
        private readonly IEngenheiroService _engenheiroService;
        private readonly ILogradouroService _logradouroService;
        private readonly Response _response;

        public LogradouroController(ITipoLogradouroService tipoLogradouroService, ILogradouroService logradouroService)
        {
            _tipoLogradouroService = tipoLogradouroService;
            _logradouroService = logradouroService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<LogradouroDTO>>> Get()
        {
            try
            {
                var logradourosDTO = await _logradouroService.GetAll();
                _response.SetSuccess();
                _response.Message = logradourosDTO.Any() ?
                    "Lista do(s) Logradouro(s) obtida com sucesso." :
                    "Nenhum Logradouro encontrado.";
                _response.Data = logradourosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Logradouro(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetLogradouro")]
        public async Task<ActionResult<LogradouroDTO>> Get(int id)
        {
            try
            {
                var logradouroDTO = await _logradouroService.GetById(id);
                if (logradouroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Logradouro não encontrado!";
                    _response.Data = logradouroDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Logradouro obtido com sucesso.";
                _response.Data = logradouroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Logradouro informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] LogradouroDTO logradouroDTO)
        {
            if (logradouroDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = logradouroDTO;
                return BadRequest(_response);
            }
            logradouroDTO.Id = 0;

            try
            {
                var bairroDTO = await _bairroService.GetById(logradouroDTO.IdBairro);
                if (bairroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Bairro informado não existe!";
                    _response.Data = new { errorIdBairro = "O Bairro informado não existe!" };
                    return NotFound(_response);
                }

                var tipoLogradouroDTO = await _tipoLogradouroService.GetById(logradouroDTO.IdTipoLogradouro);
                if (bairroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo de Logradouro informado não existe!";
                    _response.Data = new { errorIdBairro = "O Tipo de Logradouro informado não existe!" };
                    return NotFound(_response);
                }

                if (await LogradouroExists(logradouroDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Logradouro" + logradouroDTO.Cep + "!";
                    _response.Data = new { errorCep = "Já existe o Logradouro" + logradouroDTO.Cep + "!" };
                    return BadRequest(_response);
                }

                await _logradouroService.Create(logradouroDTO);

                _response.SetSuccess();
                _response.Message = "Logradouro " + logradouroDTO.Cep + " cadastrado com sucesso.";
                _response.Data = logradouroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Logradouro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] LogradouroDTO logradouroDTO)
        {
            if (logradouroDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = logradouroDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingLogradouroDTO = await _logradouroService.GetById(logradouroDTO.Id);
                if (existingLogradouroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Logradouro informado não existe!";
                    _response.Data = new { errorId = "O Logradouro informado não existe!" };
                    return NotFound(_response);
                }

                var bairroDTO = await _bairroService.GetById(logradouroDTO.IdBairro);
                if (bairroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Bairro informado não existe!";
                    _response.Data = new { errorIdBairro = "O Bairro informado não existe!" };
                    return NotFound(_response);
                }

                var tipoLogradouroDTO = await _tipoLogradouroService.GetById(logradouroDTO.IdTipoLogradouro);
                if (bairroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo de Logradouro informado não existe!";
                    _response.Data = new { errorIdBairro = "O Tipo de Logradouro informado não existe!" };
                    return NotFound(_response);
                }

                if (await LogradouroExists(logradouroDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Logradouro" + logradouroDTO.Cep + "!";
                    _response.Data = new { errorCep = "Já existe o Logradouro" + logradouroDTO.Cep + "!" };
                    return BadRequest(_response);
                }

                await _logradouroService.Update(logradouroDTO);

                _response.SetSuccess();
                _response.Message = "Logradouro " + logradouroDTO.Cep + " alterado com sucesso.";
                _response.Data = logradouroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Logradouro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<LogradouroDTO>> Delete(int id)
        {
            try
            {
                var logradouroDTO = await _logradouroService.GetById(id);
                if (logradouroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Logradouro não encontrado!";
                    _response.Data = new { errorId = "Logradouro não encontrado!" };
                    return NotFound(_response);
                }

                await _logradouroService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Logradouro " + logradouroDTO.Cep + " excluído com sucesso.";
                _response.Data = logradouroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Logradouro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> LogradouroExists(LogradouroDTO logradouroDTO)
        {
            var logradourosDTO = await _logradouroService.GetByNeighbourhood(logradouroDTO.IdBairro);
            return logradourosDTO.FirstOrDefault(l => l.Id != logradouroDTO.Id && Operator.CompareString(l.Cep, logradouroDTO.Cep)) is not null;
        }
    }
}