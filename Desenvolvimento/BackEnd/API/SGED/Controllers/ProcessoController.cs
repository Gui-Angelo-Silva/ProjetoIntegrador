using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Entities;
using SGED.Services.Server.Attributes;
using AutoMapper;
using System.Dynamic;
using System.Linq;
using SGED.Objects.Enums.Status;

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
        private readonly IMapper _mapper;

        public ProcessoController(
            ITipoProcessoService tipoProcessoService, IEtapaService etapaService, ITipoDocumentoService tipoDocumentoService,
            ITipoDocumentoEtapaService tipoDocumentoEtapaService, IDocumentoProcessoService documentoProcessoService,
            IProcessoService processoService, IMapper mapper)
        {
            _tipoProcessoService = tipoProcessoService;
            _etapaService = etapaService;
            _tipoDocumentoService = tipoDocumentoService;
            _tipoDocumentoEtapaService = tipoDocumentoEtapaService;
            _documentoProcessoService = documentoProcessoService;

            _processoService = processoService;
            _response = new Response();
            _mapper = mapper;
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

        [HttpGet("GetByStatus/{status:int}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetByStatus(int status)
        {
            try
            {
                var processosDTO = await _processoService.GetByStatus(status);

                _response.SetSuccess();
                _response.Message = processosDTO.Any() ?
                    "Lista do(s) Processo(s) obtida com sucesso." :
                    "Nenhum Processo encontrado.";

                // Cria uma nova lista com ExpandoObject para adicionar propriedades dinamicamente
                var processosComProgresso = await Task.WhenAll(processosDTO.Select(async processo =>
                {
                    // Cria uma cópia dinâmica do processo
                    dynamic processoClone = new ExpandoObject();
                    foreach (var property in processo.GetType().GetProperties())
                    {
                        // Adiciona cada propriedade do processo original ao novo objeto
                        ((IDictionary<string, object>)processoClone).Add(property.Name, property.GetValue(processo));
                    }

                    // Obtém os documentos relacionados ao processo
                    var documentos = await _documentoProcessoService.GetByProcess(processo.Id);

                    // Define o novo atributo "Progresso" com contadores
                    processoClone.Progresso = new
                    {
                        total = documentos.Count(),
                        emEspera = documentos.Count(documento => documento.Status == StatusDocumentProcess.OnHold ||
                                                                   documento.Status == StatusDocumentProcess.Pending ||
                                                                   documento.Status == StatusDocumentProcess.NotAttached ||
                                                                   documento.Status == StatusDocumentProcess.NotIntact),
                        emProcesso = documentos.Count(documento => documento.Status == StatusDocumentProcess.Attached),
                        emAnalise = documentos.Count(documento => documento.Status == StatusDocumentProcess.InAnalysis),
                        aprovado = documentos.Count(documento => documento.Status == StatusDocumentProcess.Approved),
                        reprovado = documentos.Count(documento => documento.Status == StatusDocumentProcess.Disapproved),
                    };

                    return processoClone;  // Retorna o processo com o atributo Progresso
                }));

                _response.Data = processosComProgresso;
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

        [HttpGet("{id:Guid}", Name = "GetProcesso")]
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
                else processoDTO.PutOnHold();

                await _processoService.Create(processoDTO);

                await PercorrerDocumentosEtapa(
                    tipoProcessoDTO.Id, // ID da TipoProcesso (int)
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

        [HttpPut("PutOnHold")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> PutOnHold(Guid id)
        {
            try
            {
                var documentoProcessoDTO = await _processoService.GetById(id);
                if (documentoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                documentoProcessoDTO.PutOnHold();
                await _processoService.Update(documentoProcessoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + documentoProcessoDTO.IdentificacaoProcesso + " colocado em espera.";
                _response.Data = documentoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível atualizar o status do Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("PutInProgress")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> PutInProgress(Guid id)
        {
            try
            {
                var documentoProcessoDTO = await _processoService.GetById(id);
                if (documentoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                documentoProcessoDTO.PutInProgress();
                await _processoService.Update(documentoProcessoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + documentoProcessoDTO.IdentificacaoProcesso + " em progresso.";
                _response.Data = documentoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível atualizar o status do Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("SendForAnalysis")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> SendForAnalysis(Guid id)
        {
            try
            {
                var documentoProcessoDTO = await _processoService.GetById(id);
                if (documentoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                documentoProcessoDTO.SendForAnalysis();
                await _processoService.Update(documentoProcessoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + documentoProcessoDTO.IdentificacaoProcesso + " enviado para análise.";
                _response.Data = documentoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível atualizar o status do Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("Approve")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Approve(Guid id)
        {
            try
            {
                var documentoProcessoDTO = await _processoService.GetById(id);
                if (documentoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                documentoProcessoDTO.Approve();
                await _processoService.Update(documentoProcessoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + documentoProcessoDTO.IdentificacaoProcesso + " aprovado.";
                _response.Data = documentoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível atualizar o status do Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("Disapprove")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Disapprove(Guid id)
        {
            try
            {
                var documentoProcessoDTO = await _processoService.GetById(id);
                if (documentoProcessoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                documentoProcessoDTO.Disapprove();
                await _processoService.Update(documentoProcessoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + documentoProcessoDTO.IdentificacaoProcesso + " desaprovado.";
                _response.Data = documentoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível atualizar o status do Processo!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:Guid}")]
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

        private async Task PercorrerDocumentosEtapa(int idTipoProcesso, Guid idProcesso, int? idResponsavel, ICollection<DocumentoProcessoDTO> documentosProcesso)
        {
            var etapasDTO = await _etapaService.GetStagesRelatedToTypeProcess(idTipoProcesso);

            foreach (var etapa in etapasDTO)
            {
                var documentosEtapaDTO = await _tipoDocumentoEtapaService.GetTypeDocumentStagesRelatedToStage(etapa.Id);

                foreach (var documentoEtapa in documentosEtapaDTO)
                {
                    var documentoProcesso = documentosProcesso.FirstOrDefault(dp => dp.IdTipoDocumentoEtapa == documentoEtapa.Id);

                    if (documentoProcesso != null) // Se o documento foi declarado
                    {
                        documentoProcesso.IdProcesso = idProcesso;
                        documentoProcesso.IdResponsavel = idResponsavel;

                        // Verifica se ArquivoDocumento não está vazio e se o tipo é PDF
                        if (documentoProcesso.Arquivo != null && documentoProcesso.Arquivo.Bytes.Length > 0)
                        {
                            // Gera o hash do arquivo para comparação
                            if (documentoProcesso.Arquivo.CompareHashs())
                            {
                                documentoProcesso.MarkAsAttached(); // O arquivo está íntegro
                            }
                            else
                            {

                                documentoProcesso.MarkAsNotIntact(); // O arquivo não está íntegro
                                documentoProcesso.Arquivo.Bytes = Array.Empty<byte>(); // Define o arquivo como vazio
                                documentoProcesso.Arquivo.Hash = "";
                                documentoProcesso.Arquivo.FileName = "";
                                documentoProcesso.Arquivo.MimeType = "";
                            }
                        }
                        else
                        {
                            // Se o ArquivoDocumento estiver vazio, marca como não anexado
                            documentoProcesso.MarkAsNotAttached();
                            documentoProcesso.Arquivo = new Archive();
                        }
                    }
                    else // Se nenhum documento foi declarado
                    {
                        documentoProcesso = new DocumentoProcessoDTO();

                        documentoProcesso.IdentificacaoDocumento = "NÃO ANEXADO";
                        documentoProcesso.DescricaoDocumento = "";
                        documentoProcesso.ObservacaoDocumento = "";
                        documentoProcesso.Arquivo = new Archive();
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
}