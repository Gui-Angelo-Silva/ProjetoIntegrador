using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;
using System.Collections;
using SGED.Objects.Enums;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoDocumentoEtapaController : Controller
    {

        private readonly ITipoDocumentoEtapaService _tipoDocumentoEtapaService;
        private readonly ITipoDocumentoService _tipoDocumentoService;
        private readonly IEtapaService _etapaService;
        private readonly Response _response;

        public TipoDocumentoEtapaController(ITipoDocumentoEtapaService TipoDocumentoEtapaService, ITipoDocumentoService TipoDocumentoService, IEtapaService EtapaService)
        {
            _tipoDocumentoEtapaService = TipoDocumentoEtapaService;
            _tipoDocumentoService = TipoDocumentoService;
            _etapaService = EtapaService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> GetAll()
        {
            try
            {
                var tipoDocumentoEtapas = await _tipoDocumentoEtapaService.GetAll();
                _response.SetSuccess();
                _response.Message = tipoDocumentoEtapas.Any() ?
                    "Lista do(s) relacionamento(s) entre Etapa(s) e Tipo(s) Documento obtida com sucesso." :
                    "Nenhum relacionamento entre Etapa(s) e Tipo(s) Documento encontrado!";
                _response.Data = tipoDocumentoEtapas;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) relacionamento(s) entre Etapas e Tipos de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetTypeDocumentStagesRelatedToStage/{idEtapa:int}")]
        public async Task<ActionResult<IEnumerable<TipoDocumentoEtapaDTO>>> GetTypeDocumentStagesRelatedToStage(int idEtapa)
        {
            try
            {
                var etapaDTO = await _etapaService.GetById(idEtapa);
                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Etapa informada não existe!";
                    _response.Data = new ArrayList();
                    return NotFound(_response);
                }

                var tipoDocumentoEtapas = await _tipoDocumentoEtapaService.GetTypeDocumentStagesRelatedToStage(idEtapa);

                _response.SetSuccess();
                _response.Message = tipoDocumentoEtapas.Any() ?
                    "Lista do(s) relacionamento(s) de Tipo(s) de Documento com a Etapa " + etapaDTO.NomeEtapa + " obtida com sucesso." :
                    "Nenhum relacionamento de Tipo de Documento com a Etapa " + etapaDTO.NomeEtapa + " foi encontrado!";
                _response.Data = tipoDocumentoEtapas.OrderBy(tipoDocumentoEtapa => tipoDocumentoEtapa.Posicao);
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) relacionamento(s) de Tipos de Documento com a Etapa!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetTypeDocumentsRelatedToStage/{idEtapa:int}")]
        public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> GetTypeDocumentsRelatedToStage(int idEtapa)
        {
            try
            {
                var etapaDTO = await _etapaService.GetById(idEtapa);
                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Etapa informada não existe!";
                    _response.Data = new ArrayList();
                    return NotFound(_response);
                }

                var tipoDocumentos = await _tipoDocumentoEtapaService.GetTypeDocumentsRelatedToStage(idEtapa);

                _response.SetSuccess();
                _response.Message = tipoDocumentos.Any() ?
                    "Lista do(s) Tipo(s) Documento relacionado(s) a Etapa " + etapaDTO.NomeEtapa + " obtida com sucesso." :
                    "Nenhum Tipo de Documento relacionado a Etapa " + etapaDTO.NomeEtapa + " foi encontrado!";
                _response.Data = tipoDocumentos;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Tipo(s) de Documento relacionado(s) a Etapa!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetTypeDocumentsNoRelatedToStage/{idEtapa:int}")]
        public async Task<ActionResult<TipoDocumentoDTO>> GetTypeDocumentsNoRelatedToStage(int idEtapa)
        {
            try
            {
                var etapaDTO = await _etapaService.GetById(idEtapa);
                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Etapa informada não existe!";
                    _response.Data = new ArrayList();
                    return NotFound(_response);
                }

                var tipoDocumentos = await _tipoDocumentoEtapaService.GetTypeDocumentsNoRelatedToStage(idEtapa);

                _response.SetSuccess();
                _response.Message = tipoDocumentos.Any() ?
                    "Lista do(s) Tipo(s) Documento não relacionado(s) a Etapa " + etapaDTO.NomeEtapa + " obtida com sucesso." :
                    "Nenhum Tipo de Documento não relacionado a Etapa " + etapaDTO.NomeEtapa + " foi encontrado!";
                _response.Data = tipoDocumentos;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Tipo(s) de Documento não relacionado(s)  a Etapa!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetTipoDocumentoEtapa")]
        public async Task<ActionResult<TipoDocumentoDTO>> Get(int id)
        {
            try
            {
                var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
                if (tipoDocumentoEtapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Relacionamento entre Etapa e Tipo de Documento não encontrado!";
                    _response.Data = tipoDocumentoEtapaDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Relacionamento entre Etapa e Tipo de Documento obtido com sucesso.";
                _response.Data = tipoDocumentoEtapaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o relacionamento entre Etapa e Tipo de Documento informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] TipoDocumentoEtapaDTO tipoDocumentoEtapaDTO)
        {
            if (tipoDocumentoEtapaDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }
            tipoDocumentoEtapaDTO.Id = 0;

            try
            {
                var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);

                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Etapa informada não existe!";
                    _response.Data = new { errorIdEtapa = "A Etapa informada não existe!" };
                    return NotFound(_response);
                }
                else if (!etapaDTO.CanRelate())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível adicionar relacionamentos com Tipos de Documento à Etapa " + etapaDTO.NomeEtapa + " porque ela está " + etapaDTO.GetState().ToLower() + "!";
                    _response.Data = new { errorIdEtapa = "Não é possível adicionar relacionamentos com Tipos de Documento à Etapa " + etapaDTO.NomeEtapa + " porque ela está " + etapaDTO.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }

                var tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

                if (tipoDocumentoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo de Documento informado não existe!";
                    _response.Data = new { errorIdTipoDocumento = "O Tipo de Documento informado não existe!" };
                    return NotFound(_response);
                }
                else if (!tipoDocumentoDTO.CanRelate())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível adicionar relacionamentos com Etapas ao Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!";
                    _response.Data = new { errorIdTipoDocumento = "Não é possível adicionar relacionamentos com Etapas ao Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!" }; ;
                    return BadRequest(_response);
                }
                else if (await TipoDocumentoEtapaExists(tipoDocumentoEtapaDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe um relacionamento da Etapa " + etapaDTO.NomeEtapa + " com o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
                    _response.Data = new { errorTipoDocumentoEtapa = "Já existe um relacionamento da Etapa " + etapaDTO.NomeEtapa + " com o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!" };
                    return BadRequest(_response);
                }

                var tipoDocumentoEtapasDTO = await _tipoDocumentoEtapaService.GetTypeDocumentStagesRelatedToStage(etapaDTO.Id);
                tipoDocumentoEtapaDTO.Posicao = tipoDocumentoEtapasDTO.Count() + 1;
                tipoDocumentoEtapaDTO.Enable();
                await _tipoDocumentoEtapaService.Create(tipoDocumentoEtapaDTO);

                _response.SetSuccess();
                _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " cadastrado com sucesso.";
                _response.Data = tipoDocumentoEtapaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o relacionamento entre etapa e Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoDocumentoEtapaDTO tipoDocumentoEtapaDTO)
        {
            if (tipoDocumentoEtapaDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingTipoDocumentoEtapa = await _tipoDocumentoEtapaService.GetById(tipoDocumentoEtapaDTO.Id);
                if (existingTipoDocumentoEtapa is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O relacionamento entre Etapa e Tipo de Documento informado não existe!";
                    _response.Data = new { errorId = "O relacionamento entre Etapa e Tipo de Documento informado não existe!" };
                    return NotFound(_response);
                }
                else if (!existingTipoDocumentoEtapa.CanEdit())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível alterar o relacionamento entre Etapa e Tipo de Documento porque ele está " + existingTipoDocumentoEtapa.GetState().ToLower() + "!";
                    _response.Data = new { errorStatus = "Não é possível alterar o relacionamento entre Etapa e Tipo de Documento porque ele está " + existingTipoDocumentoEtapa.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }

                var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);

                if (etapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Etapa informada não existe!";
                    _response.Data = new { errorIdEtapa = "A Etapa informada não existe!" };
                    return NotFound(_response);
                }
                else if (!etapaDTO.CanRelate())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível adicionar relacionamentos com Tipos de Documento à Etapa " + etapaDTO.NomeEtapa + " porque ela está " + etapaDTO.GetState().ToLower() + "!";
                    _response.Data = new { errorIdEtapa = "Não é possível adicionar relacionamentos com Tipos de Documento à Etapa " + etapaDTO.NomeEtapa + " porque ela está " + etapaDTO.GetState().ToLower() + "!" };
                    return BadRequest(_response);
                }

                var tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

                if (tipoDocumentoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo de Documento informado não existe!";
                    _response.Data = new { errorIdTipoDocumento = "O Tipo de Documento informado não existe!" };
                    return NotFound(_response);
                }
                else if (!tipoDocumentoDTO.CanRelate())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível adicionar relacionamentos com Etapas ao Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!";
                    _response.Data = new { errorIdTipoDocumento = "Não é possível adicionar relacionamentos com Etapas ao Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " porque ele está " + tipoDocumentoDTO.GetState().ToLower() + "!" }; ;
                    return BadRequest(_response);
                }
                else if (await TipoDocumentoEtapaExists(tipoDocumentoEtapaDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe um relacionamento da Etapa " + etapaDTO.NomeEtapa + " com o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
                    _response.Data = new { errorTipoDocumentoEtapa = "Já existe um relacionamento da Etapa " + etapaDTO.NomeEtapa + " com o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!" };
                    return BadRequest(_response);
                }

                tipoDocumentoEtapaDTO.Posicao = existingTipoDocumentoEtapa.Posicao;
                tipoDocumentoEtapaDTO.Status = existingTipoDocumentoEtapa.Status;
                await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);

                _response.SetSuccess();
                _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo de Documento " + tipoDocumentoDTO.NomeTipoDocumento + " alterado com sucesso.";
                _response.Data = tipoDocumentoEtapaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o relacionamento entre Etapa e Tipo de Documento!";
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
                _response.Message = "Dado Inválido!";
                _response.Data = null;
                return BadRequest(_response);
            }

            try
            {
                var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
                if (tipoDocumentoEtapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Relacionamento entre Etapa e Tipo de Documento não encontrado!";
                    _response.Data = new { errorId = "Relacionamento entre Etapa e Tipo de Documento não encontrado!" };
                    return NotFound(_response);
                }
                else if (!tipoDocumentoEtapaDTO.CanEdit())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível alterar o relacionamento entre Etapa e Tipo de Documento porque ele está " + tipoDocumentoEtapaDTO.GetState().ToLower() + "!";
                    _response.Data = tipoDocumentoEtapaDTO;
                    return BadRequest(_response);
                }
                else if (tipoDocumentoEtapaDTO.Posicao == position)
                {
                    _response.SetSuccess();
                    _response.Message = "O relacionamento entre Etapa e Tipo de Documento já está na posição " + position + "º.";
                    _response.Data = tipoDocumentoEtapaDTO;
                }

                var tipoDocumentoEtapas = await _tipoDocumentoEtapaService.GetTypeDocumentStagesRelatedToStage(tipoDocumentoEtapaDTO.IdEtapa);

                if (tipoDocumentoEtapas.Count() < position)
                {
                    _response.SetConflict();
                    _response.Message = "O relacionamento entre Etapa e Tipo de Documento não pode assumir a posição " + position + "º porque existe somente " + tipoDocumentoEtapas.Count() + " Tipo(s) Documento relacionado(s) a Etapa!";
                    _response.Data = tipoDocumentoEtapaDTO;
                    return BadRequest(_response);
                }
                else if (tipoDocumentoEtapas.Where(tipoDocumentoEtapa => tipoDocumentoEtapa.Id != tipoDocumentoEtapaDTO.Id) is not null)
                {
                    List<TipoDocumentoEtapaDTO> selecionadas;

                    if (position < tipoDocumentoEtapaDTO.Posicao)
                    {
                        selecionadas = tipoDocumentoEtapas
                            .OrderBy(tipoDocumentoEtapa => tipoDocumentoEtapa.Posicao)
                            .Skip(position - 1)
                            .Take(tipoDocumentoEtapaDTO.Posicao - position)
                            .ToList();

                        foreach (var tipoDocumentoEtapa in selecionadas)
                        {
                            tipoDocumentoEtapa.Posicao++;
                            await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapa);
                        }
                    }
                    else
                    {
                        selecionadas = tipoDocumentoEtapas
                            .OrderBy(tipoDocumentoEtapa => tipoDocumentoEtapa.Posicao)
                            .Skip(tipoDocumentoEtapaDTO.Posicao)
                            .Take(position - tipoDocumentoEtapaDTO.Posicao)
                            .ToList();

                        foreach (var tipoDocumentoEtapa in selecionadas)
                        {
                            tipoDocumentoEtapa.Posicao--;
                            await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapa);
                        }
                    }
                }

                tipoDocumentoEtapaDTO.Posicao = position;
                await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);

                _response.SetSuccess();
                _response.Message = "Posição do relacionamento entre Etapa e Tipo de Documento atualizado para " + position + "º.";
                _response.Data = tipoDocumentoEtapaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar a posição do relacionamento entre Etapa e Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id:int}/Ativar")]
        public async Task<ActionResult<TipoDocumentoEtapaDTO>> Activity(int id)
        {
            try
            {
                var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
                if (tipoDocumentoEtapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Relacionamento entre Etapa e Tipo de Documento não encontrado!";
                    _response.Data = new { errorId = "Relacionamento entre Etapa e Tipo de Documento não encontrado!" };
                    return NotFound(_response);
                }
                else if (tipoDocumentoEtapaDTO.Status == StatusEnum.Habilitado)
                {
                    _response.SetSuccess();
                    _response.Message = "O relacionamento entre Etapa e Tipo de Documento já está " + tipoDocumentoEtapaDTO.GetState().ToLower() + ".";
                    _response.Data = tipoDocumentoEtapaDTO;
                    return Ok(_response);
                }
                else
                {
                    tipoDocumentoEtapaDTO.Enable();
                    await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);

                    _response.SetSuccess();
                    _response.Message = "Relacionamento entre Etapa e Tipo de Documento " + tipoDocumentoEtapaDTO.GetState().ToLower() + " com sucesso.";
                    _response.Data = tipoDocumentoEtapaDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível habilitar o relacionamento entre Etapa e Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id:int}/Desativar")]
        public async Task<ActionResult<TipoProcessoDTO>> Desactivity(int id)
        {
            try
            {
                var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
                if (tipoDocumentoEtapaDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Relacionamento entre Etapa e Tipo de Documento não encontrado!";
                    _response.Data = new { errorId = "Relacionamento entre Etapa e Tipo de Documento não encontrado!" };
                    return NotFound(_response);
                }
                else if (tipoDocumentoEtapaDTO.Status == StatusEnum.Desativado)
                {
                    _response.SetSuccess();
                    _response.Message = "O relacionamento entre Etapa e Tipo de Documento já está " + tipoDocumentoEtapaDTO.GetState().ToLower() + ".";
                    _response.Data = tipoDocumentoEtapaDTO;
                    return Ok(_response);
                }
                else
                {
                    tipoDocumentoEtapaDTO.Disable();
                    await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);

                    _response.SetSuccess();
                    _response.Message = "Relacionamento entre Etapa e Tipo de Documento " + tipoDocumentoEtapaDTO.GetState().ToLower() + " com sucesso.";
                    _response.Data = tipoDocumentoEtapaDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível desativar o relacionamento entre Etapa e Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<TipoDocumentoEtapaDTO>> Delete(int id)
        {
            try
            {
                var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
                if (tipoDocumentoEtapaDTO == null)
                {
                    _response.SetNotFound();
                    _response.Message = "Relacionamento entre Etapa e Tipo de Documento não encontrado!";
                    _response.Data = new { errorId = "Relacionamento entre Etapa e Tipo de Documento não encontrado!" };
                    return NotFound(_response);
                }
                else if (!tipoDocumentoEtapaDTO.CanRemove())
                {
                    _response.SetConflict();
                    _response.Message = "Não é possível excluir o relacionamento entre Etapa e Tipo de Documento porque ele está " + tipoDocumentoEtapaDTO.GetState().ToLower() + "!";
                    _response.Data = tipoDocumentoEtapaDTO;
                    return BadRequest(_response);
                }

                var tipoDocumentoEtapasDTO = await _tipoDocumentoEtapaService.GetTypeDocumentStagesRelatedToStage(tipoDocumentoEtapaDTO.IdEtapa);
                tipoDocumentoEtapasDTO = tipoDocumentoEtapasDTO.Where(tde => tde.Id != tipoDocumentoEtapaDTO.Id).OrderBy(tde => tde.Posicao).Skip(tipoDocumentoEtapaDTO.Posicao - 1).ToList();

                foreach (var tipoDocumentoEtapa in tipoDocumentoEtapasDTO)
                {
                    tipoDocumentoEtapa.Posicao--;
                    await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapa);
                }

                await _tipoDocumentoEtapaService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Relacionamento entre Etapa e Tipo de Documento excluído com sucesso.";
                _response.Data = tipoDocumentoEtapaDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o relacionamento entre Etapa e Tipo de Documento!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> TipoDocumentoEtapaExists(TipoDocumentoEtapaDTO tipoDocumentoEtapaDTO)
        {
            var tipoDocumentoEtapasDTO = await _tipoDocumentoEtapaService.GetAll();
            return tipoDocumentoEtapasDTO.FirstOrDefault(tde => tde.Id != tipoDocumentoEtapaDTO.Id && (tde.IdEtapa == tipoDocumentoEtapaDTO.IdEtapa && tde.IdTipoDocumento == tipoDocumentoEtapaDTO.IdTipoDocumento)) is not null;
        }
    }
}