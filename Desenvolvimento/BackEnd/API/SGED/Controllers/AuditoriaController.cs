using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Server.Attributes;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuditoriaController : Controller
    {
        private readonly ISessaoService _sessaoService;
        private readonly IAuditoriaService _auditoriaService;
        private readonly Response _response;

        public AuditoriaController(ISessaoService sessaoService, IAuditoriaService auditoriaService)
        {
            _sessaoService = sessaoService;
            _auditoriaService = auditoriaService;

            _response = new Response();
        }

        [HttpGet(Name = "GetAll")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<AuditoriaDTO>>> GetAll()
        {
            try
            {
                var auditoriasDTO = await _auditoriaService.GetAll();
                _response.SetSuccess();
                _response.Message = auditoriasDTO.Any() ?
                    "Lista das Auditorias obtida com sucesso." :
                    "Nenhuma Auditoria encontrada.";
                _response.Data = auditoriasDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista das Auditorias!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetBySession/{idSessao:Guid}", Name = "GetAuditBySession")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<AuditoriaDTO>>> GetBySession(Guid idSessao)
        {
            try
            {
                var sessaoDTO = await _sessaoService.GetById(idSessao);
                if (sessaoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Sessão não encontrada!";
                    _response.Data = new List<AuditoriaDTO>();
                    return NotFound(_response);
                };

                var auditoriasDTO = await _auditoriaService.GetBySession(idSessao);
                _response.SetSuccess();
                _response.Message = auditoriasDTO.Any() ?
                    "Lista das Auditorias relacionadas a Sessão obtida com sucesso." :
                    "Nenhuma Auditoria relacionada a Sessão encontrada.";
                _response.Data = auditoriasDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista das Auditorias relacionadas a Sessão!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:Guid}", Name = "GetAuditById")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<AuditoriaDTO>> GetById(Guid id)
        {
            try
            {
                var auditoriaDTO = await _auditoriaService.GetById(id);
                if (auditoriaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Auditoria não encontrada!";
                    _response.Data = new AuditoriaDTO();
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Auditoria obtida com sucesso.";
                _response.Data = auditoriaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a Auditoria informada!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }
    }
}