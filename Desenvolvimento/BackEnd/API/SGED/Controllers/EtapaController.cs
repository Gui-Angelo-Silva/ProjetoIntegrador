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
        private readonly Response _response;

        public EtapaController(ITipoProcessoService tipoprocessoservice, IEtapaService etapaservice)
        {
            _tipoProcessoService = tipoprocessoservice;
            _etapaService = etapaservice;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EtapaDTO>>> GetAll()
        {
            var etapas = await _etapaService.GetAll();
            _response.Status = true; _response.Data = etapas;
            _response.Message = etapas.Any() ?
                "Lista da(s) Etapa(s) obtida com sucesso." :
                "Nenhuma Etapa encontrada!";
            return Ok(_response);
        }

        [HttpGet("id", Name = "GetEtapa")]
        public async Task<ActionResult<EtapaDTO>> GetById(int id)
        {
            var etapaDTO = await _etapaService.GetById(id);
            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "Etapa não encontrada!"; _response.Data = etapaDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Etapa " + etapaDTO.NomeEtapa + " obtida com sucesso."; _response.Data = etapaDTO;
            return Ok(_response);
        }

        [HttpGet("GetRelatedToTypeProcess/{idTipoProcesso}")]
        public async Task<ActionResult<IEnumerable<EtapaDTO>>> GetStagesRelatedToTypeProcess(int idTipoProcesso)
        {
            var tipoProcessoDTO = await _tipoProcessoService.GetById(idTipoProcesso);
            if (tipoProcessoDTO == null)
            {
                _response.Status = false; _response.Message = "O Tipo Processo informado não existe!"; _response.Data = null;
                return NotFound(_response);
            }

            var etapas = await _etapaService.GetStagesRelatedToTypeProcess(idTipoProcesso);

            _response.Status = true; _response.Data = etapas.OrderBy(etapa => etapa.Posicao);
            _response.Message = etapas.Any() ?
                "Lista da(s) Etapa(s) relacionada(s) ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " obtida com sucesso." :
                "Nenhuma Etapa relacionada ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " foi encontrada!";
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EtapaDTO etapaDTO)
        {
            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);

            if (tipoProcessoDTO == null)
            {
                _response.Status = false; _response.Message = "O Tipo Processo não existe!"; _response.Data = etapaDTO;
                return NotFound(_response);
            }
            else if (!tipoProcessoDTO.Status)
            {
                _response.Status = false; _response.Message = "O Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " está desabilitado para adicionar novas etapas!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(etapaDTO.IdTipoProcesso);
            if (etapasDTO.FirstOrDefault(etapa => etapa.NomeEtapa == etapaDTO.NomeEtapa) != null)
            {
                _response.Status = false; _response.Message = "Já existe a Etapa " + etapaDTO.NomeEtapa + " no Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            etapaDTO.Posicao = etapasDTO.Count() + 1;
            etapaDTO.EnableAllOperations();
            await _etapaService.Create(etapaDTO);

            _response.Status = true; _response.Message = "Etapa " + etapaDTO.NomeEtapa + " cadastrada com sucesso."; _response.Data = etapaDTO;
            return Ok(_response);

            //return new CreatedAtRouteResult("GetEtapa", new { id = etapaDTO.Id }, etapaDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] EtapaDTO etapaDTO)
        {
            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado Inválido!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            var existingEtapa = await _etapaService.GetById(etapaDTO.Id);
            if (existingEtapa == null)
            {
                _response.Status = false; _response.Message = "Não existe a Etapa informada!"; _response.Data = etapaDTO;
                return NotFound(_response);
            }
            else if (!existingEtapa.Status)
            {
                _response.Status = false; _response.Message = "A Etapa " + existingEtapa.NomeEtapa + " está desabilitada para alteração!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);

            if (tipoProcessoDTO == null)
            {
                _response.Status = false; _response.Message = "O Tipo Processo não existe!"; _response.Data = etapaDTO;
                return NotFound(_response);
            }
            else if (!tipoProcessoDTO.Status)
            {
                _response.Status = false; _response.Message = "O Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " está desabilitado para adicionar novas etapas!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(tipoProcessoDTO.Id);
            if (etapasDTO.FirstOrDefault(etapa => etapa.NomeEtapa == etapaDTO.NomeEtapa) != null)
            {
                _response.Status = false; _response.Message = "Já existe a Etapa " + etapaDTO.NomeEtapa + " no Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            etapaDTO.Posicao = existingEtapa.Posicao;
            etapaDTO.EnableAllOperations();
            await _etapaService.Update(etapaDTO);

            _response.Status = true; _response.Message = "Etapa " + etapaDTO.NomeEtapa + " alterada com sucesso."; _response.Data = etapaDTO;
            return Ok(_response);
        }

        [HttpPut("UpdatePosition")]
        public async Task<ActionResult> UpdatePosition(int id, int position)
        {
            if (position <= 0)
            {
                _response.Status = false; _response.Message = "Dado Inválido!"; _response.Data = null;
                return BadRequest(_response);
            }

            var etapaDTO = await _etapaService.GetById(id);
            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "Etapa não encontrada!"; _response.Data = etapaDTO;
                return NotFound(_response);
            }
            else if (!etapaDTO.Status)
            {
                _response.Status = false; _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " está desabilitada para alteração!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            } else if (etapaDTO.Posicao == position) {
                _response.Status = true; _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " já está na posição " + position + "º."; _response.Data = etapaDTO;
            }

            var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);
            var etapas = await _etapaService.GetStagesRelatedToTypeProcess(etapaDTO.IdTipoProcesso);

            if (etapas.Count() < position)
            {
                _response.Status = false; _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " não pode assumir a posição " + position + "º porque existe somente " + etapas.Count() + " Etapa(s) relacionada(s) ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            }
            else if (etapas.Where(etapa => etapa.Id != etapaDTO.Id) != null)
            {
                List<EtapaDTO> selecionadas;

                if (position < etapaDTO.Posicao)
                {
                    selecionadas = etapas
                        .OrderBy(etapa => etapa.Posicao)
                        .Skip(position - 1)
                        .Take(etapaDTO.Posicao - position)
                        .ToList();

                    foreach (var etapa in selecionadas)
                    {
                        etapa.Posicao++;
                        await _etapaService.Update(etapa);
                    }
                }
                else
                {
                    selecionadas = etapas
                        .OrderBy(etapa => etapa.Posicao)
                        .Skip(etapaDTO.Posicao)
                        .Take(position - etapaDTO.Posicao)
                        .ToList();

                    foreach (var etapa in selecionadas)
                    {
                        etapa.Posicao--;
                        await _etapaService.Update(etapa);
                    }
                }
            }

            etapaDTO.Posicao = position;
            await _etapaService.Update(etapaDTO);

            _response.Status = true; _response.Message = "Posição da Etapa " + etapaDTO.NomeEtapa + " atualizada para " + position + "º."; _response.Data = etapaDTO;
            return Ok(_response);
        }

        [HttpPut("{id}/Ativar")]
        public async Task<ActionResult<EtapaDTO>> Activity(int id)
        {
            var etapaDTO = await _etapaService.GetById(id);
            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "Etapa não encontrada!"; _response.Data = etapaDTO;
                return NotFound(_response);
            }

            if (!etapaDTO.Status)
            {
                etapaDTO.EnableAllOperations();
                await _etapaService.Update(etapaDTO);
            }

            _response.Status = true; _response.Message = "Etapa " + etapaDTO.NomeEtapa + " ativada com sucesso."; _response.Data = etapaDTO;
            return Ok(_response);
        }

        [HttpPut("{id}/Desativar")]
        public async Task<ActionResult<EtapaDTO>> Desactivity(int id)
        {
            var etapaDTO = await _etapaService.GetById(id);
            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "Etapa não encontrada!"; _response.Data = etapaDTO;
                return NotFound(_response);
            }

            if (etapaDTO.Status)
            {
                etapaDTO.DisableAllOperations();
                await _etapaService.Update(etapaDTO);
            }

            _response.Status = true; _response.Message = "Etapa " + etapaDTO.NomeEtapa + " desativada com sucesso."; _response.Data = etapaDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<EtapaDTO>> Delete(int id)
        {
            var etapaDTO = await _etapaService.GetById(id);
            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "Etapa não encontrada!"; _response.Data = etapaDTO;
                return NotFound(_response);
            }
            if (!etapaDTO.Status)
            {
                _response.Status = false; _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " está desabilitada para exclusão!"; _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(etapaDTO.IdTipoProcesso);
            etapasDTO = etapasDTO.Where(etapa => etapa.Id != etapaDTO.Id).OrderBy(etapa => etapa.Posicao).Skip(etapaDTO.Posicao - 1).ToList();

            foreach (var etapa in etapasDTO)
            {
                etapa.Posicao--;
                await _etapaService.Update(etapa);
            }

            await _etapaService.Remove(id);

            _response.Status = true; _response.Message = "Etapa " + etapaDTO.NomeEtapa + " excluída com sucesso."; _response.Data = etapaDTO;
            return Ok(etapaDTO);
        }
    }
}
