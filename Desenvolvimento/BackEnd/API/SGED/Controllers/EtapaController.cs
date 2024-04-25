using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Interfaces;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities;
using SGED.Repositories.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EtapaController : Controller
    {
        private readonly ITipoProcessoService _tipoProcessoService;
        private readonly IEtapaService _etapaService;

        public EtapaController(ITipoProcessoService tipoprocessoservice, IEtapaService etapaservice)
        {
            _tipoProcessoService = tipoprocessoservice;
            _etapaService = etapaservice;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EtapaDTO>>> Get()
        {
            var etapaDTO = await _etapaService.GetAll();
            return Ok(etapaDTO);
        }

        [HttpGet("id", Name = "GetEtapa")]
        public async Task<ActionResult<EtapaDTO>> Get(int id)
        {
            var etapaDTO = await _etapaService.GetById(id);
            if (etapaDTO == null) return NotFound("Etapa não encontrada!");
            return Ok(etapaDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EtapaDTO etapaDTO)
        {
            if (etapaDTO == null) return BadRequest("Dado Inválido!");

            var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);
            if (tipoProcessoDTO == null) return BadRequest("O Tipo Processo não existe!");

            var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(etapaDTO.IdTipoProcesso);
            if (etapasDTO.FirstOrDefault(etapa => etapa.NomeEtapa == etapaDTO.NomeEtapa) != null)
            {
                return BadRequest("Já existe a Etapa " + etapaDTO.NomeEtapa + " no Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!");
            }

            if (tipoProcessoDTO.CanRelationation())
            {
                if (tipoProcessoDTO.CanOperation())
                {
                    tipoProcessoDTO.DisableOperations();
                    await _tipoProcessoService.Update(tipoProcessoDTO);
                }

                await _etapaService.Create(etapaDTO);
                return new CreatedAtRouteResult("GetEtapa", new { id = etapaDTO.Id }, etapaDTO);
            }
            else
            {
                return BadRequest("O Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " não está ativo para adicionar novas etapas!");
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] EtapaDTO etapaDTO)
        {
            if (etapaDTO == null)
            {
                return BadRequest("Dado Inválido!");
            }

            var existingEtapa = await _etapaService.GetById(etapaDTO.Id);
            if (existingEtapa == null)
            {
                return BadRequest("Não existe a Etapa informada!");
            }
            else if (!StatusExtensions.CanOperation(existingEtapa.Status))
            {
                return BadRequest("A Etapa " + existingEtapa.NomeEtapa + " não está ativa para alteração!");
            }

            var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);
            if (tipoProcessoDTO == null)
            {
                return BadRequest("O Tipo Processo não existe!");
            }
            else if (!tipoProcessoDTO.CanRelationation())
            {
                return BadRequest("O Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " não está ativo para adicionar novas etapas!");
            }

            var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(tipoProcessoDTO.Id);
            if (etapasDTO.FirstOrDefault(etapa => etapa.NomeEtapa == etapaDTO.NomeEtapa) != null)
            {
                return BadRequest("Já existe a Etapa " + etapaDTO.NomeEtapa + " no Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!");
            }
            else if (tipoProcessoDTO.CanOperation() && (etapasDTO != null && etapasDTO.Count() == 0))
            {
                tipoProcessoDTO.DisableOperations();
                await _tipoProcessoService.Update(tipoProcessoDTO);
            }

            tipoProcessoDTO = await _tipoProcessoService.GetById(existingEtapa.IdTipoProcesso);
            etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(tipoProcessoDTO.Id);
            etapasDTO = etapasDTO.Where(etapa => etapa.Id != etapaDTO.Id);

            if (tipoProcessoDTO.CanRelationation() && (etapasDTO != null && etapasDTO.Count() == 0))
            {
                tipoProcessoDTO.EnableAllActions();
                await _tipoProcessoService.Update(tipoProcessoDTO);
            }

            await _etapaService.Update(etapaDTO);
            return Ok(etapaDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<EtapaDTO>> Delete(int id)
        {
            var etapaDTO = await _etapaService.GetById(id);
            if (etapaDTO == null) return BadRequest("Etapa não encontrada!");

            var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);
            var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(tipoProcessoDTO.Id);
            etapasDTO = etapasDTO.Where(etapa => etapa.Id != etapaDTO.Id);

            if (tipoProcessoDTO.CanRelationation() && (etapasDTO != null && etapasDTO.Count() == 0))
            {
                tipoProcessoDTO.EnableAllActions();
                await _tipoProcessoService.Update(tipoProcessoDTO);
            }

            await _etapaService.Remove(id);
            return Ok(etapaDTO);
        }

        [HttpGet("GetRelatedToTypeProcess/{idTipoProcesso}")]
        public async Task<ActionResult<IEnumerable<EtapaDTO>>> GetStagesRelatedToTypeProcess(int idTipoProcesso)
        {
            if (idTipoProcesso == 0) return BadRequest("Informe o Id do Tipo Processo!");
            var etapaDTO = await _etapaService.GetStagesRelatedToTypeProcess(idTipoProcesso);
            return Ok(etapaDTO);
        }
    }
}
