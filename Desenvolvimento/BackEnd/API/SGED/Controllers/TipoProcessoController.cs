using Microsoft.AspNetCore.Mvc;
using SGED.Services.Interfaces;
using SGED.Objects.Interfaces;
using SGED.Objects.Models.Entities;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Entities;
using SGED.Objects.Enums;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoProcessoController : Controller
    {
        private readonly ITipoProcessoService _tipoProcessoService;
        private readonly Response _response;

        public TipoProcessoController(ITipoProcessoService tipoProcessoService)
        {
            _tipoProcessoService = tipoProcessoService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoProcessoDTO>>> GetAll()
        {
            try
            {
                var tipoProcessosDTO = await _tipoProcessoService.GetAll();
                _response.SetSuccess();
                _response.Message = tipoProcessosDTO.Any() ?
                    "Lista do(s) Tipo(s) Processo obtida com sucesso." :
                    "Nenhum Tipo Processo encontrado.";
                _response.Data = tipoProcessosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Tipo(s) de Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetTipoProcesso")]
        public async Task<ActionResult<TipoProcessoDTO>> GetById(int id)
        {
            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
                if (tipoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Processo não encontrado!";
                    _response.Data = tipoProcessoDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Tipo de Processo " + tipoProcessoDTO.NomeTipoProcesso + " obtido com sucesso.";
                _response.Data = tipoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Tipo de Processo informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoProcessoDTO tipoProcessoDTO)
        {
            if (tipoProcessoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }
            tipoProcessoDTO.Id = 0;

            try
            {
                var tipoProcessos = await _tipoProcessoService.GetAll();
                if (await TipoProcessoExists(tipoProcessoDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Tipo de Processo " + tipoProcessoDTO.NomeTipoProcesso + "!";
                    _response.Data = new { errorNomeTipoProcesso = "Já existe o Tipo de Processo " + tipoProcessoDTO.NomeTipoProcesso + "!" };
                    return BadRequest(_response);
                }
                else
                {
                    tipoProcessoDTO.Enable();
                    await _tipoProcessoService.Create(tipoProcessoDTO);

                    _response.SetSuccess();
                    _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " cadastrado com sucesso.";
                    _response.Data = tipoProcessoDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Tipo de Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoProcessoDTO tipoProcessoDTO)
        {
            if (tipoProcessoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingTipoProcesso = await _tipoProcessoService.GetById(tipoProcessoDTO.Id);
                if (existingTipoProcesso is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Não existe o Tipo de Processo informado!";
                    _response.Data = new { errorId = "Não existe o Tipo Processo informado!" };
                    return BadRequest(_response);
                }
                else if (!existingTipoProcesso.CanEdit())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível alterar o Tipo de Processo " + tipoProcessoDTO.NomeTipoProcesso + " pois ele está " + tipoProcessoDTO.GetState().ToLower() + "!";
                    _response.Data = new { errorStatus = "Não é possível alterar o Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " pois ele está " + tipoProcessoDTO.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }

                var tipoProcessos = await _tipoProcessoService.GetAll();
                if (await TipoProcessoExists(tipoProcessoDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Tipo de Processo " + tipoProcessoDTO.NomeTipoProcesso + "!";
                    _response.Data = new { errorNomeTipoProcesso = "Já existe o Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!" };
                    return BadRequest(_response);
                }
                else
                {
                    tipoProcessoDTO.Status = existingTipoProcesso.Status;
                    await _tipoProcessoService.Update(tipoProcessoDTO);

                    _response.SetSuccess();
                    _response.Message = "Tipo de Processo " + tipoProcessoDTO.NomeTipoProcesso + " alterado com sucesso.";
                    _response.Data = tipoProcessoDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Tipo de Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id:int}/Ativar")]
        public async Task<ActionResult<TipoProcessoDTO>> Activity(int id)
        {
            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
                if (tipoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Processo não encontrado!";
                    _response.Data = new { errorId = "Tipo de Processo não encontrado!" };
                    return NotFound(_response);
                }
                else if (tipoProcessoDTO.Status == StatusEnum.Habilitado)
                {
                    _response.SetSuccess();
                    _response.Message = "O Tipo de Processo já está " + tipoProcessoDTO.GetState().ToLower() + ".";
                    _response.Data = tipoProcessoDTO;
                    return Ok(_response);
                }
                else
                {
                    tipoProcessoDTO.Enable();
                    await _tipoProcessoService.Update(tipoProcessoDTO);

                    _response.SetSuccess();
                    _response.Message = "Tipo de Processo " + tipoProcessoDTO.GetState().ToLower() + " com sucesso.";
                    _response.Data = tipoProcessoDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível ativar o Tipo de Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id:int}/Desativar")]
        public async Task<ActionResult<TipoProcessoDTO>> Desactivity(int id)
        {
            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
                if (tipoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Processo não encontrado!";
                    _response.Data = new { errorId = "Tipo de Processo não encontrado!" };
                    return NotFound(_response);
                }
                else if (tipoProcessoDTO.Status == StatusEnum.Habilitado)
                {
                    _response.SetSuccess();
                    _response.Message = "O Tipo de Processo já está " + tipoProcessoDTO.GetState().ToLower() + ".";
                    _response.Data = tipoProcessoDTO;
                    return Ok(_response);
                }
                else
                {
                    tipoProcessoDTO.Enable();
                    await _tipoProcessoService.Update(tipoProcessoDTO);

                    _response.SetSuccess();
                    _response.Message = "Tipo de Processo " + tipoProcessoDTO.GetState().ToLower() + " com sucesso.";
                    _response.Data = tipoProcessoDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível desativar o Tipo de Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<TipoProcessoDTO>> Delete(int id)
        {
            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
                if (tipoProcessoDTO == null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Processo não encontrado!";
                    _response.Data = new { errorId = "Tipo de Processo não encontrado!" };
                    return NotFound(_response);
                }
                if (!tipoProcessoDTO.CanRemove())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível excluir o Tipo de Processo " + tipoProcessoDTO.NomeTipoProcesso + " porque ele está " + tipoProcessoDTO.GetState().ToLower() + "!";
                    _response.Data = new { errorStatus = "Não é possível excluir o Tipo de Processo " + tipoProcessoDTO.NomeTipoProcesso + " porque ele está " + tipoProcessoDTO.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }

                await _tipoProcessoService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Tipo de Processo " + tipoProcessoDTO.NomeTipoProcesso + " excluído com sucesso.";
                _response.Data = tipoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Tipo de Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> TipoProcessoExists(TipoProcessoDTO tipoProcessoDTO)
        {
            var tipoProcessosDTO = await _tipoProcessoService.GetAll();
            return tipoProcessosDTO.FirstOrDefault(tp => tp.Id != tipoProcessoDTO.Id && Operator.CompareString(tp.NomeTipoProcesso, tipoProcessoDTO.NomeTipoProcesso)) is not null;
        }
    }
}
