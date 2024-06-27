using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Entities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class OcupacaoAtualController : Controller
    {

        private readonly IOcupacaoAtualService _ocupacaoAtualService;
        private readonly Response _response;

        public OcupacaoAtualController(IOcupacaoAtualService ocupacaoAtualService)
        {
            _ocupacaoAtualService = ocupacaoAtualService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<OcupacaoAtualDTO>>> Get()
        {
            try
            {
                var ocupacaoAtualsDTO = await _ocupacaoAtualService.GetAll();
                _response.SetSuccess();
                _response.Message = ocupacaoAtualsDTO.Any() ?
                    "Lista da(s) Ocupação(ões) Atual(is) obtida com sucesso." :
                    "Nenhuma Ocupação Atual encontrada.";
                _response.Data = ocupacaoAtualsDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar a Ocupação Atual!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetOcupacaoAtual")]
        public async Task<ActionResult<OcupacaoAtualDTO>> Get(int id)
        {
            try
            {
                var ocupacaoAtualDTO = await _ocupacaoAtualService.GetById(id);
                if (ocupacaoAtualDTO == null)
                {
                    _response.SetNotFound();
                    _response.Message = "Ocupação Atual não encontrada!";
                    _response.Data = ocupacaoAtualDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Ocupação Atual " + ocupacaoAtualDTO.NomeOcupacaoAtual + " obtida com sucesso.";
                _response.Data = ocupacaoAtualDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar a Ocupação Atual!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] OcupacaoAtualDTO ocupacaoAtualDTO)
        {
            if (ocupacaoAtualDTO == null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = ocupacaoAtualDTO;
                return BadRequest(_response);
            }
            ocupacaoAtualDTO.Id = 0;

            try
            {
                if (await OcupacaoAtualExists(ocupacaoAtualDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe a Ocupação Atual " + ocupacaoAtualDTO.NomeOcupacaoAtual + "!";
                    _response.Data = new { errorNomeOcupacaoAtual = "Já existe o OcupacaoAtual " + ocupacaoAtualDTO.NomeOcupacaoAtual + "!" };
                    return BadRequest(_response);
                }

                await _ocupacaoAtualService.Create(ocupacaoAtualDTO);

                _response.SetSuccess();
                _response.Message = "Ocupação Atual " + ocupacaoAtualDTO.NomeOcupacaoAtual + " cadastrada com sucesso.";
                _response.Data = ocupacaoAtualDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível cadastrar a Ocupação Atual!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] OcupacaoAtualDTO ocupacaoAtualDTO)
        {
            if (ocupacaoAtualDTO == null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = ocupacaoAtualDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingOcupacaoAtual = await _ocupacaoAtualService.GetById(ocupacaoAtualDTO.Id);
                if (existingOcupacaoAtual == null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Ocupação Atual informada não existe!";
                    _response.Data = new { errorId = "A Ocupação Atual informada não existe!" };
                    return NotFound(_response);
                }

                if (await OcupacaoAtualExists(ocupacaoAtualDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe a Ocupação Atual" + ocupacaoAtualDTO.NomeOcupacaoAtual + "!";
                    _response.Data = new { errorNomeOcupacaoAtual = "Já existe o OcupacaoAtual " + ocupacaoAtualDTO.NomeOcupacaoAtual + "!" };
                    return BadRequest(_response);
                }

                await _ocupacaoAtualService.Update(ocupacaoAtualDTO);

                _response.SetSuccess();
                _response.Message = "Ocupação Atual " + ocupacaoAtualDTO.NomeOcupacaoAtual + " alterada com sucesso.";
                _response.Data = ocupacaoAtualDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar a Ocupação Atual!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<OcupacaoAtualDTO>> Delete(int id)
        {
            try
            {
                var ocupacaoAtualDTO = await _ocupacaoAtualService.GetById(id);
                if (ocupacaoAtualDTO == null)
                {
                    _response.SetNotFound();
                    _response.Message = "Ocupação Atual não encontrada!";
                    _response.Data = new { errorId = "Ocupação Atual não encontrada!" };
                    return NotFound(_response);
                }

                await _ocupacaoAtualService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Ocupação Atual " + ocupacaoAtualDTO.NomeOcupacaoAtual + " excluída com sucesso.";
                _response.Data = ocupacaoAtualDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar a Ocupação Atual!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> OcupacaoAtualExists(OcupacaoAtualDTO ocupacaoAtualDTO)
        {
            var ocupacaoAtualsDTO = await _ocupacaoAtualService.GetAll();
            return ocupacaoAtualsDTO.FirstOrDefault(oa => oa.Id != ocupacaoAtualDTO.Id && Operator.CompareString(oa.NomeOcupacaoAtual, ocupacaoAtualDTO.NomeOcupacaoAtual)) is not null;
        }
    }
}