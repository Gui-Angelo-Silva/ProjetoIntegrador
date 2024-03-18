using SGED.DTO.Entities;
using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    //[Authorize("ApiScope")]
    public class TipoDocumentoEtapaController : Controller
    {

        private readonly ITipoDocumentoEtapaService _TipoDocumentoEtapaService;

        public TipoDocumentoEtapaController(ITipoDocumentoEtapaService TipoDocumentoEtapaService)
        {
			_TipoDocumentoEtapaService = TipoDocumentoEtapaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoDocumentoEtapaDTO>>> Get()
        {
            var tipoProcessoEtapaDTO = await _TipoDocumentoEtapaService.GetAll();
            return Ok(tipoProcessoEtapaDTO);
        }

        [HttpGet("{id}", Name = "GetTipoDocumentoEtapa")]
        public async Task<ActionResult<TipoDocumentoEtapaDTO>> Get(int id)
        {
            var TipoDocumentoEtapaDTO = await _TipoDocumentoEtapaService.GetById(id);
            if (TipoDocumentoEtapaDTO == null) return NotFound("TipoDocumentoEtapa não encontrado");
            return Ok(TipoDocumentoEtapaDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoDocumentoEtapaDTO TipoDocumentoEtapaDTO)
        {
            if (TipoDocumentoEtapaDTO is null) return BadRequest("Dado inválido!");
            await _TipoDocumentoEtapaService.Create(TipoDocumentoEtapaDTO);
            return new CreatedAtRouteResult("GetTipoDocumentoEtapa", new { id = TipoDocumentoEtapaDTO.Id }, TipoDocumentoEtapaDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoDocumentoEtapaDTO TipoDocumentoEtapaDTO)
        {
            if (TipoDocumentoEtapaDTO is null) return BadRequest("Dado invalido!");
            await _TipoDocumentoEtapaService.Update(TipoDocumentoEtapaDTO);
            return Ok(TipoDocumentoEtapaDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoDocumentoEtapaDTO>> Delete(int id)
        {
            var TipoDocumentoEtapaDTO = await _TipoDocumentoEtapaService.GetById(id);
            if (TipoDocumentoEtapaDTO == null) return NotFound("TipoDocumentoEtapa não econtrado!");
            await _TipoDocumentoEtapaService.Remove(id);
            return Ok(TipoDocumentoEtapaDTO);
        }

        [HttpGet("Related/{IdEtapa}")]
        public async Task<ActionResult<TipoDocumentoDTO>> GetTypeDocumentsRelatedToStage(int IdEtapa)
        {
            if (IdEtapa <= 0) return BadRequest("Dado inválido!");
            var tipoDocumentosRelacionados = await _TipoDocumentoEtapaService.GetTypeDocumentsRelatedToStage(IdEtapa);
            return Ok(tipoDocumentosRelacionados);
        }

        [HttpGet("NoRelated/{IdEtapa}")]
        public async Task<ActionResult<TipoDocumentoDTO>> GetTypeDocumentsNoRelatedToStage(int IdEtapa)
        {
            if (IdEtapa <= 0) return BadRequest("Dado inválido!");
            var tipoDocumentosNaoRelacionados = await _TipoDocumentoEtapaService.GetTypeDocumentsNoRelatedToStage(IdEtapa);
            return Ok(tipoDocumentosNaoRelacionados);
        }
    }
}