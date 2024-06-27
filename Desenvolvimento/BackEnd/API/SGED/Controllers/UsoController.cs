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
    public class UsoController : Controller
    {
        private readonly IUsoService _usoService;
        private readonly Response _response;

        public UsoController(IUsoService usoService)
        {
            _usoService = usoService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<UsoDTO>>> Get()
        {
            try
            {
                var usosDTO = await _usoService.GetAll();
                _response.SetSuccess();
                _response.Message = usosDTO.Any() ?
                    "Lista do(s) Uso(s) obtida com sucesso." :
                    "Nenhum Uso encontrado.";
                _response.Data = usosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Uso(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetUso")]
        public async Task<ActionResult<UsoDTO>> Get(int id)
        {
            try
            {
                var usoDTO = await _usoService.GetById(id);
                if (usoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Uso não encontrado!";
                    _response.Data = usoDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Uso " + usoDTO.NomeUso + " obtido com sucesso.";
                _response.Data = usoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Uso informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] UsoDTO usoDTO)
        {
            if (usoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = usoDTO;
                return BadRequest(_response);
            }
            usoDTO.Id = 0;

            try
            {
                if (await UsoExists(usoDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Uso " + usoDTO.NomeUso + "!";
                    _response.Data = new { errorNomeUso = "Já existe o Uso " + usoDTO.NomeUso + "!" };
                    return BadRequest(_response);
                }

                await _usoService.Create(usoDTO);

                _response.SetSuccess();
                _response.Message = "Uso " + usoDTO.NomeUso + " cadastrado com sucesso.";
                _response.Data = usoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Uso!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] UsoDTO usoDTO)
        {
            if (usoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = usoDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingUsoDTO = await _usoService.GetById(usoDTO.Id);
                if (existingUsoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Uso informado não existe!";
                    _response.Data = new { errorId = "O Uso informado não existe!" };
                    return NotFound(_response);
                }

                if (await UsoExists(usoDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Uso " + usoDTO.NomeUso + "!";
                    _response.Data = new { errorNomeUso = "Já existe o Uso " + usoDTO.NomeUso + "!" };
                    return BadRequest(_response);
                }

                await _usoService.Update(usoDTO);

                _response.SetSuccess();
                _response.Message = "Uso " + usoDTO.NomeUso + " alterado com sucesso.";
                _response.Data = usoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Uso!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<UsoDTO>> Delete(int id)
        {
            try
            {
                var usoDTO = await _usoService.GetById(id);
                if (usoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Uso não encontrado!";
                    _response.Data = new { errorId = "O Uso informado não existe!" };
                    return NotFound(_response);
                }

                await _usoService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Uso " + usoDTO.NomeUso + " excluído com sucesso.";
                _response.Data = usoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Uso!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> UsoExists(UsoDTO usoDTO)
        {
            var usosDTO = await _usoService.GetAll();
            return usosDTO.FirstOrDefault(u => u.Id != usoDTO.Id && Operator.CompareString(u.NomeUso, usoDTO.NomeUso)) is not null;
        }
    }
}