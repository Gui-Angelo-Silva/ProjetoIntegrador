using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Entities;
using SGED.Services.Server.Attributes;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProcessoController : Controller
    {
        private readonly ITipoProcessoService _tipoProcessoService;
        private readonly IEtapaService _etapaService;
        private readonly ITipoDocumentoService _tipoDocumentoService;
        private readonly ITipoDocumentoEtapaService _tipoDocumentoEtapaService;
        private readonly IDocumentoProcessoService _documentoProcessoService;

        private readonly IProcessoService _processoService;
        private readonly Response _response;

        public ProcessoController(ITipoProcessoService tipoProcessoService, IEtapaService etapaService, ITipoDocumentoService tipoDocumentoService, ITipoDocumentoEtapaService tipoDocumentoEtapaService, IDocumentoProcessoService documentoProcessoService, IProcessoService processoService)
        {
            _tipoProcessoService = tipoProcessoService;
            _etapaService = etapaService;
            _tipoDocumentoService = tipoDocumentoService;
            _tipoDocumentoEtapaService = tipoDocumentoEtapaService;
            _documentoProcessoService = documentoProcessoService;

            _processoService = processoService;
            _response = new Response();
        }

        [HttpGet()]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<ProcessoDTO>>> Get()
        {
            try
            {
                var processosDTO = await _processoService.GetAll();
                _response.SetSuccess();
                _response.Message = processosDTO.Any() ?
                    "Lista do(s) Processo(s) obtida com sucesso." :
                    "Nenhum Processo encontrado.";
                _response.Data = processosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Processo(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetProcesso")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<ProcessoDTO>> Get(Guid id)
        {
            try
            {
                var processoDTO = await _processoService.GetById(id);
                if (processoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Processo não encontrado!";
                    _response.Data = processoDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " obtido com sucesso.";
                _response.Data = processoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Processo informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Post([FromBody] ProcessoDTO processoDTO)
        {
            if (processoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = processoDTO;
                return BadRequest(_response);
            }

            try
            {
                await _processoService.Create(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " cadastrado com sucesso.";
                _response.Data = processoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost("PostAllDatas")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> PostAllDatas([FromBody] ProcessoDTO processoDTO)
        {
            if (processoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = processoDTO;
                return BadRequest(_response);
            }

            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(processoDTO.IdTipoProcesso);
                if (tipoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo Processo informado não existe!";
                    _response.Data = new { errorIdTipoProcesso = "O Tipo Processo informado não existe!" };
                    return NotFound(_response);
                }

                if (processoDTO.DocumentosProcessoDTO.Any() || processoDTO.IdResponsavel.HasValue) processoDTO.PutInProgress();
                else processoDTO.AssignDefaultState();

                await _processoService.Create(processoDTO);

                await PercorrerDocumentosEtapa(
                    tipoProcessoDTO.Id, // ID da Etapa (int)
                    processoDTO.Id, // ID do Processo (Guid)
                    processoDTO.IdResponsavel.HasValue ? processoDTO.IdResponsavel.Value : (int?)null, // ID do Responsável (int?)
                    processoDTO.DocumentosProcessoDTO // Coleção de Documentos (ICollection<DocumentoProcessoDTO>
                );

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " cadastrado com sucesso.";
                _response.Data = processoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Put([FromBody] ProcessoDTO processoDTO)
        {
            if (processoDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = processoDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingProcessoDTO = await _processoService.GetById(processoDTO.Id);
                if (existingProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                await _processoService.Update(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " alterado com sucesso.";
                _response.Data = processoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<ProcessoDTO>> Delete(Guid id)
        {
            try
            {
                var processoDTO = await _processoService.GetById(id);
                if (processoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Processo não encontrado!";
                    _response.Data = new { errorId = "Processo não encontrado!" };
                    return NotFound(_response);
                }

                await _processoService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " excluído com sucesso.";
                _response.Data = processoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task PercorrerDocumentosEtapa(int idEtapa, Guid idProcesso, int? idResponsavel, ICollection<DocumentoProcessoDTO> documentosProcesso)
        {
            var documentosEtapaDTO = await _tipoDocumentoEtapaService.GetTypeDocumentStagesRelatedToStage(idEtapa);

            foreach (var documentoEtapa in documentosEtapaDTO)
            {
                var documentoProcesso = documentosProcesso.FirstOrDefault(dp => dp.IdTipoDocumentoEtapa == documentoEtapa.Id);

                if (documentoProcesso != null) // Se o documento foi declarado
                {
                    documentoProcesso.IdProcesso = idProcesso;
                    documentoProcesso.IdResponsavel = idResponsavel;

                    // Verifica se ArquivoDocumento não está vazio e se o tipo é PDF
                    if (documentoProcesso.ArquivoDocumento != null && documentoProcesso.ArquivoDocumento.Length > 0)
                    {
                        // Verifica se é PDF
                        bool isPDF = documentoProcesso.IsPDF();

                        if (isPDF) // Se for PDF
                        {
                            // Gera o hash do arquivo para comparação
                            if (documentoProcesso.GenerateHashSHA256() == documentoProcesso.HashDocumento)
                            {
                                documentoProcesso.MarkAsAttached(); // O arquivo está íntegro
                            }
                            else
                            {

                                documentoProcesso.MarkAsNotIntact(); // O arquivo não está íntegro
                                documentoProcesso.ArquivoDocumento = new byte[0]; // Define o arquivo como vazio
                                documentoProcesso.HashDocumento = "";
                            }
                        }
                        else
                        {
                            // Se não for PDF, marca como não anexado e define o arquivo como vazio
                            documentoProcesso.MarkAsNotAttached();
                            documentoProcesso.HashDocumento = "";
                            documentoProcesso.ArquivoDocumento = new byte[0];
                        }
                    }
                    else
                    {
                        // Se o ArquivoDocumento estiver vazio, marca como não anexado
                        documentoProcesso.MarkAsNotAttached();
                        documentoProcesso.HashDocumento = "";
                    }
                }
                else // Se nenhum documento foi declarado
                {
                    documentoProcesso = new DocumentoProcessoDTO();

                    documentoProcesso.IdentificacaoDocumento = "NÃO ANEXADO";
                    documentoProcesso.DescricaoDocumento = "";
                    documentoProcesso.ObservacaoDocumento = "";
                    documentoProcesso.HashDocumento = "";
                    documentoProcesso.IdProcesso = idProcesso;
                    documentoProcesso.IdTipoDocumentoEtapa = documentoEtapa.Id;

                    if (idResponsavel.HasValue) { documentoProcesso.PutOnPending(); documentoProcesso.IdResponsavel = idResponsavel; } // Existir um responsavel pelo processo
                    else documentoProcesso.AssignDefaultState();
                }

                await _documentoProcessoService.Create(documentoProcesso);
            }
        }
    }
}