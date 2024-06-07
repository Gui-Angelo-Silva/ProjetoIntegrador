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
    public class TipoLogradouroController : Controller
    {
        private readonly ITipoLogradouroService _tipoLogradouroService;
        private readonly Response _response;

        public TipoLogradouroController(ITipoLogradouroService tipoLogradouroService)
        {
            _tipoLogradouroService = tipoLogradouroService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<TipoLogradouroDTO>>> Get()
        {
            try
            {
                var tipoLogradourosDTO = await _tipoLogradouroService.GetAll();
                _response.SetSuccess();
                _response.Message = tipoLogradourosDTO.Any() ?
                    "Lista do(s) Tipo(s) de Logradouro obtida com sucesso." :
                    "Nenhum TipoLogradouro encontrado.";
                _response.Data = tipoLogradourosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Tipo(s) de Logradouro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetTipoLogradouro")]
        public async Task<ActionResult<TipoLogradouroDTO>> Get(int id)
        {
            try
            {
                var tipoLogradouroDTO = await _tipoLogradouroService.GetById(id);
                if (tipoLogradouroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Logradouro não encontrado!";
                    _response.Data = tipoLogradouroDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + " obtido com sucesso.";
                _response.Data = tipoLogradouroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível adquirir o Tipo de Logradouro informado!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] TipoLogradouroDTO tipoLogradouroDTO)
        {
            if (tipoLogradouroDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = tipoLogradouroDTO;
                return BadRequest(_response);
            }

            try
            {
                if (await TipoLogradouroExists(tipoLogradouroDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + "!";
                    _response.Data = new { errorCodigoInformativo = "Já existe o Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + "!" };
                    return BadRequest(_response);
                }

                await _tipoLogradouroService.Create(tipoLogradouroDTO);

                _response.SetSuccess();
                _response.Message = "Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + " cadastrado com sucesso.";
                _response.Data = tipoLogradouroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível cadastrar o Tipo de Logradouro!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoLogradouroDTO tipoLogradouroDTO)
        {
            if (tipoLogradouroDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = tipoLogradouroDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingTipoLogradouroDTO = await _tipoLogradouroService.GetById(tipoLogradouroDTO.Id);
                if (existingTipoLogradouroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo de Logradouro informado não existe!";
                    _response.Data = new { errorId = "O Tipo de Logradouro informado não existe!" };
                    return NotFound(_response);
                }

                if (await TipoLogradouroExists(tipoLogradouroDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + "!";
                    _response.Data = new { errorCodigoInformativo = "Já existe o Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + "!" };
                    return BadRequest(_response);
                }

                await _tipoLogradouroService.Update(tipoLogradouroDTO);

                _response.SetSuccess();
                _response.Message = "Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + " alterado com sucesso.";
                _response.Data = tipoLogradouroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Tipo de Logradouro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<TipoLogradouroDTO>> Delete(int id)
        {
            try
            {
                var tipoLogradouroDTO = await _tipoLogradouroService.GetById(id);
                if (tipoLogradouroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Logradouro não encontrado!";
                    _response.Data = new { errorId = "Tipo de Logradouro não encontrado!" };
                    return NotFound(_response);
                }

                await _tipoLogradouroService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + " excluído com sucesso.";
                _response.Data = tipoLogradouroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Tipo de Logradouro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> TipoLogradouroExists(TipoLogradouroDTO tipoLogradouroDTO)
        {
            var tipoLogradourosDTO = await _tipoLogradouroService.GetAll();
            return tipoLogradourosDTO.FirstOrDefault(tl => tl.Id != tipoLogradouroDTO.Id && Operator.CompareString(tl.CodigoInformativo, tipoLogradouroDTO.CodigoInformativo)) is not null;
        }
    }
}