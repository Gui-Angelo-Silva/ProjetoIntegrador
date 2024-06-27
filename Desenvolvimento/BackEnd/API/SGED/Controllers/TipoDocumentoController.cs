using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Enums;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDocumentoController : Controller
    {
        private readonly ITipoDocumentoService _tipoDocumentoService;
        private readonly Response _response;

        public TipoDocumentoController(ITipoDocumentoService tipoDocumentoService)
        {
            _tipoDocumentoService = tipoDocumentoService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> GetAll()
        {
            try
            {
                var tipoDocumentos = await _tipoDocumentoService.GetAll();
                _response.SetSuccess();
                _response.Message = tipoDocumentos.Any() ?
                    "Lista do(s) Tipo(s) Documento obtida com sucesso." :
                    "Nenhum Tipo de Documento encontrado!";
                _response.Data = tipoDocumentos;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Tipo de Documento(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetTipoDocumento")]
        public async Task<ActionResult<TipoDocumentoDTO>> GetById(int id)
        {
            try
            {
                var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
                if (tipoDocumentoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Documento não encontrado!";
                    _response.Data = tipoDocumentoDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " obtido com sucesso.";
                _response.Data = tipoDocumentoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Tipo de Documento informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] TipoDocumentoDTO tipoDocumentoDTO)
        {
            if (tipoDocumentoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = tipoDocumentoDTO;
                return BadRequest(_response);
            }
            tipoDocumentoDTO.Id = 0;

            try
            {
                if (await TipoDocumentoExists(tipoDocumentoDTO))
                {
                    _response.SetNotFound();
                    _response.Message = "Já existe o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
                    _response.Data = new { errorNomeTipoDocumento = "Já existe o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!" };
                    return BadRequest(_response);
                }

                tipoDocumentoDTO.Enable();
                await _tipoDocumentoService.Create(tipoDocumentoDTO);

                _response.SetSuccess();
                _response.Message = "Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " cadastrado com sucesso.";
                _response.Data = tipoDocumentoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }

        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoDocumentoDTO tipoDocumentoDTO)
        {
            if (tipoDocumentoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = tipoDocumentoDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingTipoDocumento = await _tipoDocumentoService.GetById(tipoDocumentoDTO.Id);
                if (existingTipoDocumento is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo de Documento informado não existe!";
                    _response.Data = new { errorId = "O Tipo de Documento informado não existe!" };
                    return NotFound(_response);
                }
                else if (!existingTipoDocumento.CanEdit())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível alterar o Tipo de Documento " + existingTipoDocumento.NomeTipoDocumento + " porque ele está " + existingTipoDocumento.GetState().ToLower() + "!";
                    _response.Data = new { errorStatus = "Não é possível alterar o Tipo de Documento " + existingTipoDocumento.NomeTipoDocumento + " porque ele está " + existingTipoDocumento.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }
                else if (await TipoDocumentoExists(tipoDocumentoDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
                    _response.Data = new { errorNomeTipoDocumento = "Já existe o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!" };
                    return BadRequest(_response);
                }

                tipoDocumentoDTO.Status = existingTipoDocumento.Status;
                await _tipoDocumentoService.Update(tipoDocumentoDTO);

                _response.SetSuccess();
                _response.Message = "Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " alterado com sucesso.";
                _response.Data = tipoDocumentoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id:int}/Ativar")]
        public async Task<ActionResult<TipoDocumentoDTO>> Activity(int id)
        {
            try
            {
                var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
                if (tipoDocumentoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Documento não encontrado!";
                    _response.Data = new { errorId = "Tipo de Documento não encontrado!" };
                    return NotFound(_response);
                }
                else if (tipoDocumentoDTO.Status == StatusEnum.Habilitado)
                {
                    _response.SetSuccess();
                    _response.Message = "O Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " já está " + tipoDocumentoDTO.GetState().ToLower() + ".";
                    _response.Data = tipoDocumentoDTO;
                    return Ok(_response);
                }
                else
                {
                    tipoDocumentoDTO.Enable();
                    await _tipoDocumentoService.Update(tipoDocumentoDTO);

                    _response.SetSuccess();
                    _response.Message = "Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " " + tipoDocumentoDTO.GetState().ToLower() + " com sucesso.";
                    _response.Data = tipoDocumentoDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível habilitar o Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id:int}/Desativar")]
        public async Task<ActionResult<TipoProcessoDTO>> Desactivity(int id)
        {
            try
            {
                var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
                if (tipoDocumentoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Documento não encontrado!";
                    _response.Data = new { errorId = "Tipo de Documento não encontrado!" };
                    return NotFound(_response);
                }
                else if (tipoDocumentoDTO.Status == StatusEnum.Desativado)
                {
                    _response.SetSuccess();
                    _response.Message = "O Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " já está " + tipoDocumentoDTO.GetState().ToLower() + ".";
                    _response.Data = tipoDocumentoDTO;
                    return Ok(_response);
                }
                else
                {
                    tipoDocumentoDTO.Disable();
                    await _tipoDocumentoService.Update(tipoDocumentoDTO);

                    _response.SetSuccess();
                    _response.Message = "Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " " + tipoDocumentoDTO.GetState().ToLower() + " com sucesso.";
                    _response.Data = tipoDocumentoDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível desativar o Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<TipoDocumentoDTO>> Delete(int id)
        {
            try
            {
                var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
                if (tipoDocumentoDTO == null)
                {
                    _response.SetNotFound();
                    _response.Message = "Tipo de Documento não encontrado!";
                    _response.Data = new { errorId = "Tipo de Documento não encontrado!" };
                    return NotFound(_response);
                }
                if (!tipoDocumentoDTO.CanRemove())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível excluir o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!";
                    _response.Data = new { errorStatus = "Não é possível excluir o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }

                await _tipoDocumentoService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " excluído com sucesso.";
                _response.Data = tipoDocumentoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> TipoDocumentoExists(TipoDocumentoDTO tipoDocumentoDTO)
        {
            var tipoDocumentosDTO = await _tipoDocumentoService.GetAll();
            return tipoDocumentosDTO.FirstOrDefault(td => td.Id != tipoDocumentoDTO.Id && Operator.CompareString(td.NomeTipoDocumento, tipoDocumentoDTO.NomeTipoDocumento)) is not null;
        }
    }
}
