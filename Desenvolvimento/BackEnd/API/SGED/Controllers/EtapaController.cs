using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Enums;
using SGED.Objects.Interfaces;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities;
using SGED.Repositories.Entities;
using SGED.Services.Entities;
using SGED.Services.Interfaces;
using System.Collections;

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

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<EtapaDTO>>> GetAll()
        {
            try
            {
                var etapasDTO = await _etapaService.GetAll();
                _response.SetSuccess();
                _response.Message = etapasDTO.Any() ?
                    "Lista da(s) Etapa(s) obtida com sucesso." :
                    "Nenhuma Etapa encontrada!";
                _response.Data = etapasDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista da(s) Etapa(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetRelatedToTypeProcess/{idTipoProcesso:int}")]
        public async Task<ActionResult<IEnumerable<EtapaDTO>>> GetStagesRelatedToTypeProcess(int idTipoProcesso)
        {
            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(idTipoProcesso);
                if (tipoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo Processo informado não existe!";
                    _response.Data = new ArrayList();
                    return NotFound(_response);
                }

                var etapas = await _etapaService.GetStagesRelatedToTypeProcess(idTipoProcesso);

                _response.SetSuccess();
                _response.Message = etapas.Any() ?
                    "Lista da(s) Etapa(s) relacionada(s) ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " obtida com sucesso." :
                    "Nenhuma Etapa relacionada ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " foi encontrada!";
                _response.Data = etapas.OrderBy(etapa => etapa.Posicao);
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista da(s) Etapa(s) relacionada(s) ao Tipo Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetEtapa")]
        public async Task<ActionResult<EtapaDTO>> GetById(int id)
        {
            try
            {
                var etapaDTO = await _etapaService.GetById(id);
                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Etapa não encontrada!";
                    _response.Data = etapaDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Etapa " + etapaDTO.NomeEtapa + " obtida com sucesso.";
                _response.Data = etapaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a Etapa informada!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] EtapaDTO etapaDTO)
        {
            if (etapaDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);

                if (tipoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo Processo não existe!";
                    _response.Data = new { errorIdTipoProcesso = "O Tipo Processo não existe!" };
                    return NotFound(_response);
                }

                var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(etapaDTO.IdTipoProcesso);
                if (etapasDTO.FirstOrDefault(etapa => Operator.CompareString(etapa.NomeEtapa, etapaDTO.NomeEtapa)) is not null)
                {
                    _response.SetConflict();
                    _response.Message = "Já existe a Etapa " + etapaDTO.NomeEtapa + " relacionada ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!";
                    _response.Data = new { errorNomeEtapa = "Já existe a Etapa " + etapaDTO.NomeEtapa + " relacionada ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!" };
                    return BadRequest(_response);
                }

                etapaDTO.Posicao = etapasDTO.Count() + 1; etapaDTO.Enable();
                await _etapaService.Create(etapaDTO);

                _response.SetSuccess();
                _response.Message = "Etapa " + etapaDTO.NomeEtapa + " cadastrada com sucesso.";
                _response.Data = etapaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar a Etapa!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] EtapaDTO etapaDTO)
        {
            if (etapaDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado Inválido!";
                _response.Data = etapaDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingEtapa = await _etapaService.GetById(etapaDTO.Id);
                if (existingEtapa is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Etapa informada não existe!";
                    _response.Data = new { errorId = "A Etapa informada não existe!" };
                    return NotFound(_response);
                }
                else if (!existingEtapa.CanEdit())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível alterar a Etapa " + existingEtapa.NomeEtapa + " porque ela está " + existingEtapa.GetState().ToLower() + "!";
                    _response.Data = new { errorStatus = "Não é possível alterar a Etapa " + existingEtapa.NomeEtapa + " porque ela está " + existingEtapa.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }

                var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);

                if (tipoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo Processo não existe!";
                    _response.Data = new { errorIdTipoProcesso = "O Tipo Processo não existe!" };
                    return NotFound(_response);
                }
                else if (!tipoProcessoDTO.CanRelate())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível relacionar a Etapa ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " porque ele está " + tipoProcessoDTO.GetState().ToLower() + "!";
                    _response.Data = new { errorIdTipoProcesso = "Não é possível relacionar a Etapa ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " porque ele está " + tipoProcessoDTO.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }

                var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(etapaDTO.IdTipoProcesso);
                if (etapasDTO.FirstOrDefault(etapa => etapa.Id != etapaDTO.Id && Operator.CompareString(etapa.NomeEtapa, etapaDTO.NomeEtapa)) is not null)
                {
                    _response.SetConflict();
                    _response.Message = "Já existe a Etapa " + etapaDTO.NomeEtapa + " relacionada ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!";
                    _response.Data = new { errorNomeEtapa = "Já existe a Etapa " + etapaDTO.NomeEtapa + " relacionada ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!" };
                    return BadRequest(_response);
                }

                etapaDTO.Posicao = existingEtapa.Posicao; etapaDTO.Status = existingEtapa.Status;
                await _etapaService.Update(etapaDTO);

                _response.SetSuccess(); _response.Message = "Etapa " + etapaDTO.NomeEtapa + " alterada com sucesso."; _response.Data = etapaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar a Etapa!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id:int}/UpdatePosition/{position:int}")]
        public async Task<ActionResult> UpdatePosition(int id, int position)
        {
            if (position <= 0)
            {
                _response.SetInvalid();
                _response.Message = "Dado inválido!";
                _response.Data = null;
                return BadRequest(_response);
            }

            try
            {
                var etapaDTO = await _etapaService.GetById(id);
                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Etapa não encontrada!";
                    _response.Data = new { errorId = "Etapa não encontrada!" };
                    return NotFound(_response);
                }
                else if (!etapaDTO.CanEdit())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível alterar a Etapa " + etapaDTO.NomeEtapa + " porque ela está " + etapaDTO.GetState().ToLower() + "!";
                    _response.Data = new { errorStatus = "Não é possível alterar a Etapa " + etapaDTO.NomeEtapa + " porque ela está " + etapaDTO.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }
                else if (etapaDTO.Posicao == position)
                {
                    _response.SetSuccess();
                    _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " já está na posição " + position + "º.";
                    _response.Data = etapaDTO;
                    return Ok(_response);
                }

                var tipoProcessoDTO = await _tipoProcessoService.GetById(etapaDTO.IdTipoProcesso);
                var etapas = await _etapaService.GetStagesRelatedToTypeProcess(etapaDTO.IdTipoProcesso);

                if (etapas.Count() < position)
                {
                    _response.SetConflict();
                    _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " não pode assumir a posição " + position + "º porque existe somente " + etapas.Count() + " Etapa(s) relacionada(s) ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!";
                    _response.Data = new { errorPosicao = "A Etapa " + etapaDTO.NomeEtapa + " não pode assumir a posição " + position + "º porque existe somente " + etapas.Count() + " Etapa(s) relacionada(s) ao Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!" };
                    return BadRequest(_response);
                }
                else if (etapas.Where(etapa => etapa.Id != etapaDTO.Id) is not null)
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

                _response.SetSuccess();
                _response.Message = "Posição da Etapa " + etapaDTO.NomeEtapa + " atualizada para " + position + "º.";
                _response.Data = etapaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar a posição da Etapa!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id:int}/Ativar")]
        public async Task<ActionResult<EtapaDTO>> Activity(int id)
        {
            try
            {
                var etapaDTO = await _etapaService.GetById(id);
                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Etapa não encontrada!";
                    _response.Data = new { errorId = "Etapa não encontrada!" };
                    return NotFound(_response);
                }
                else if (etapaDTO.Status == StatusEnum.Habilitado)
                {
                    _response.SetSuccess();
                    _response.Message = "A Etapa já está " + etapaDTO.GetState().ToLower() + ".";
                    _response.Data = etapaDTO;
                    return Ok(_response);
                }
                else
                {
                    etapaDTO.Enable();
                    await _etapaService.Update(etapaDTO);

                    _response.SetSuccess();
                    _response.Message = "Etapa " + etapaDTO.GetState().ToLower() + " com sucesso.";
                    _response.Data = etapaDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível ativar a Etapa!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id:int}/Desativar")]
        public async Task<ActionResult<EtapaDTO>> Desactivity(int id)
        {
            try
            {
                var etapaDTO = await _etapaService.GetById(id);
                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Etapa não encontrada!";
                    _response.Data = new { errorId = "Etapa não encontrada!" };
                    return NotFound(_response);
                }
                else if (etapaDTO.Status == StatusEnum.Habilitado)
                {
                    _response.SetSuccess();
                    _response.Message = "A Etapa já está " + etapaDTO.GetState().ToLower() + ".";
                    _response.Data = etapaDTO;
                    return Ok(_response);
                }
                else
                {
                    etapaDTO.Enable();
                    await _etapaService.Update(etapaDTO);

                    _response.SetSuccess();
                    _response.Message = "Etapa " + etapaDTO.GetState().ToLower() + " com sucesso.";
                    _response.Data = etapaDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível desativar a Etapa!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<EtapaDTO>> Delete(int id)
        {
            try
            {
                var etapaDTO = await _etapaService.GetById(id);
                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Etapa não encontrada!";
                    _response.Data = new { errorId = "Etapa não encontrada!" };
                    return NotFound(_response);
                }
                if (!etapaDTO.CanRemove())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível excluir a Etapa " + etapaDTO.NomeEtapa + " porque ela está " + etapaDTO.GetState().ToLower() + "!";
                    _response.Data = etapaDTO;
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

                _response.SetSuccess();
                _response.Message = "Etapa " + etapaDTO.NomeEtapa + " excluída com sucesso.";
                _response.Data = etapaDTO;
                return Ok(etapaDTO);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir a Etapa!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }
    }
}
