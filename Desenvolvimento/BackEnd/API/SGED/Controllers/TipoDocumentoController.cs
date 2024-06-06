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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> GetAll()
        {
            var tipoDocumentos = await _tipoDocumentoService.GetAll();
            _response.SetSuccess();
            _response.Message = tipoDocumentos.Any() ?
                "Lista do(s) Tipo(s) Documento obtida com sucesso." :
                "Nenhum Tipo Documento encontrado!";
            _response.Data = tipoDocumentos;
            return Ok(_response);
        }

        [HttpGet("{id:int}", Name = "GetTipoDocumento")]
        public async Task<ActionResult<TipoDocumentoDTO>> GetById(int id)
        {
            var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
            if (tipoDocumentoDTO is null)
            {
                _response.SetNotFound();
                _response.Message = "Tipo Documento não encontrado!";
                _response.Data = tipoDocumentoDTO;
                return NotFound(_response);
            };

            _response.SetSuccess();
            _response.Message = "Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " obtido com sucesso.";
            _response.Data = tipoDocumentoDTO;
            return Ok(_response);
        }

        [HttpPost]
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

            if (!await TipoDocumentoExists(tipoDocumentoDTO))
            {
                _response.SetNotFound();
                _response.Message = "Já existe o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
                _response.Data = new { errorNomeTipoDocumento = "Já existe o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!" };
                return BadRequest(_response);
            }

            tipoDocumentoDTO.Enable();
            await _tipoDocumentoService.Create(tipoDocumentoDTO);

            _response.SetSuccess();
            _response.Message = "Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " cadastrado com sucesso.";
            _response.Data = tipoDocumentoDTO;
            return Ok(_response);

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

            var existingTipoDocumento = await _tipoDocumentoService.GetById(tipoDocumentoDTO.Id);
            if (existingTipoDocumento is null)
            {
                _response.SetNotFound();
                _response.Message = "Não existe o Tipo Documento informado!";
                _response.Data = new { errorId = "Não existe o Tipo Documento informado!" };
                return NotFound(_response);
            }
            else if (!existingTipoDocumento.CanEdit())
            {
                _response.SetConflict();
                _response.Message = "Não é possível alterar o Tipo Documento " + existingTipoDocumento.NomeTipoDocumento + " porque ele está " + existingTipoDocumento.GetState().ToLower() + "!";
                _response.Data = new { errorStatus = "Não é possível alterar o Tipo Documento " + existingTipoDocumento.NomeTipoDocumento + " porque ele está " + existingTipoDocumento.GetState().ToLower() + "!" };
                return BadRequest(_response);
            }
            else if (!await TipoDocumentoExists(tipoDocumentoDTO))
            {
                _response.SetConflict();
                _response.Message = "Já existe o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
                _response.Data = new { errorNomeTipoDocumento = "Já existe o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!" };
                return BadRequest(_response);
            }

            tipoDocumentoDTO.Status = existingTipoDocumento.Status;
            await _tipoDocumentoService.Update(tipoDocumentoDTO);

            _response.SetSuccess();
            _response.Message = "Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " alterado com sucesso.";
            _response.Data = tipoDocumentoDTO;
            return Ok(_response);
        }

        [HttpPut("{id:int}/Ativar")]
        public async Task<ActionResult<TipoDocumentoDTO>> Activity(int id)
        {
            var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
            if (tipoDocumentoDTO is null)
            {
                _response.SetNotFound();
                _response.Message = "Tipo Documento não encontrado!";
                _response.Data = tipoDocumentoDTO;
                return NotFound(_response);
            }
            else if (tipoDocumentoDTO.Status == StatusEnum.Habilitado)
            {
                _response.SetSuccess();
                _response.Message = "Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " ja está " + tipoDocumentoDTO.GetState().ToLower() + ".";
                _response.Data = tipoDocumentoDTO;
                return Ok(_response);
            }
            else
            {
                tipoDocumentoDTO.Enable();
                await _tipoDocumentoService.Update(tipoDocumentoDTO);

                _response.SetSuccess(); 
                _response.Message = "Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " " + tipoDocumentoDTO.GetState().ToLower() + " com sucesso.";
                _response.Data = tipoDocumentoDTO;
                return Ok(_response);
            }
        }

        [HttpPut("{id:int}/Desativar")]
        public async Task<ActionResult<TipoProcessoDTO>> Desactivity(int id)
        {
            var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
            if (tipoDocumentoDTO is null)
            {
                _response.SetNotFound();
                _response.Message = "Tipo Documento não encontrado!";
                _response.Data = tipoDocumentoDTO;
                return NotFound(_response);
            }
            else if (tipoDocumentoDTO.Status == StatusEnum.Desativado)
            {
                _response.SetSuccess();
                _response.Message = "Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " ja está " + tipoDocumentoDTO.GetState().ToLower() + ".";
                _response.Data = tipoDocumentoDTO;
                return Ok(_response);
            }
            else
            {
                tipoDocumentoDTO.Disable();
                await _tipoDocumentoService.Update(tipoDocumentoDTO);

                _response.SetSuccess();
                _response.Message = "Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " " + tipoDocumentoDTO.GetState().ToLower() + " com sucesso.";
                _response.Data = tipoDocumentoDTO;
                return Ok(_response);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoDocumentoDTO>> Delete(int id)
        {
            var tipoDocumentoDTO = await _tipoDocumentoService.GetById(id);
            if (tipoDocumentoDTO == null)
            {
                _response.SetNotFound(); 
                _response.Message = "Tipo Documento não encontrado!"; 
                _response.Data = new { errorId = "Tipo Documento não encontrado!" };
                return NotFound(_response);
            }
            if (!tipoDocumentoDTO.CanRemove())
            {
                _response.SetConflict();
                _response.Message = "Não é possível excluir o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!";
                _response.Data = new { errorStatus = "Não é possível excluir o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!" };
                return BadRequest(_response);
            }

            await _tipoDocumentoService.Remove(id);

            _response.SetSuccess(); 
            _response.Message = "Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " excluído com sucesso."; 
            _response.Data = tipoDocumentoDTO;
            return Ok(_response);
        }

        private async Task<bool> TipoDocumentoExists(TipoDocumentoDTO tipoDocumentoDTO)
        {
            var tipoDocumentosDTO = await _tipoDocumentoService.GetAll();
            return tipoDocumentosDTO.FirstOrDefault(td => td.Id != tipoDocumentoDTO.Id && Operator.CompareString(td.NomeTipoDocumento, tipoDocumentoDTO.NomeTipoDocumento)) is not null;
        }
    }
}
