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
using System.ComponentModel.DataAnnotations;
using SGED.DTOs.Entities;

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

        [HttpGet("Filter/{filters}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<dynamic>>> Filter(object filters)
        {
            try
            {
                var processosDTO = new List<dynamic>();

                _response.SetSuccess();
                _response.Message = processosDTO.Any() ?
                    "Lista do(s) Processo(s) obtida com sucesso." :
                    "Nenhum Processo encontrado.";

                for (int i = 0; i < processosDTO.Count; i++)
                {
                    processosDTO[i] = await GetAllData(processosDTO[i]);
                }

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

                var processosComProgresso = new List<dynamic>();
                foreach (var processo in processosDTO)
                {
                    dynamic processoClone = new ExpandoObject();
                    processoClone.id = processo.Id;
                    processoClone.identificacaoProcesso = processo.IdentificacaoProcesso;
                    processoClone.descricaoProcesso = processo.DescricaoProcesso;
                    processoClone.situacaoProcesso = processo.SituacaoProcesso;
                    processoClone.dataAprovacao = processo.DataAprovacao;
                    processoClone.status = processo.Status;
                    processoClone.idImovel = processo.IdImovel;
                    processoClone.idTipoProcesso = processo.IdTipoProcesso;
                    processoClone.idEngenheiro = processo.IdEngenheiro;
                    processoClone.idFiscal = processo.IdFiscal;
                    processoClone.idResponsavel = processo.IdResponsavel;
                    processoClone.idAprovador = processo.IdAprovador;
                    processoClone.documentosProcessoDTO = processo.DocumentosProcessoDTO;

                    var documentos = await _documentoProcessoService.GetByProcess(processo.Id);

                    processoClone.progresso = new
                    {
                        total = documentos.Count(),
                        pendente = documentos.Count(documento => documento.Status == StatusDocumentProcess.OnHold),
                        anexado = documentos.Count(documento => documento.Status == StatusDocumentProcess.Pending ||
                                                                    documento.Status == StatusDocumentProcess.NotAttached ||
                                                                    documento.Status == StatusDocumentProcess.NotIntact ||
                                                                    documento.Status == StatusDocumentProcess.Attached),
                        analise = documentos.Count(documento => documento.Status == StatusDocumentProcess.InAnalysis),
                        aprovado = documentos.Count(documento => documento.Status == StatusDocumentProcess.Approved),
                        reprovado = documentos.Count(documento => documento.Status == StatusDocumentProcess.Disapproved),
                    };

                    processosComProgresso.Add(processoClone);
                }

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

                dynamic processo = new ExpandoObject();
                if (processoDTO != null) processo = await GetAllData(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processo.identificacaoProcesso + " obtido com sucesso.";
                _response.Data = processo;
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

                await BrowseStageDocuments(
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

        [HttpPut("PutOnHold/{id:Guid}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> PutOnHold(Guid id)
        {
            try
            {
                var processoDTO = await _processoService.GetById(id);
                if (processoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                processoDTO.PutOnHold();
                await _processoService.Update(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " colocado em espera.";
                _response.Data = processoDTO;
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

        [HttpPut("PutInProgress/{id:Guid}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> PutInProgress(Guid id)
        {
            try
            {
                var processoDTO = await _processoService.GetById(id);
                if (processoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                var documentosProcesso = await _documentoProcessoService.GetByProcess(processoDTO.Id);
                if (documentosProcesso is null || !documentosProcesso.Any())
                {
                    _response.SetInvalid();
                    _response.Message = "Não existe Documentos vinculados ao Processo!";
                    _response.Data = new { error = "Não existe Documentos vinculados ao Processo!" };
                    return BadRequest(_response);
                }

                processoDTO.PutInProgress();
                await _processoService.Update(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " em progresso.";
                _response.Data = processoDTO;
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

        [HttpPut("SendForAnalysis/{id:Guid}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> SendForAnalysis(Guid id)
        {
            try
            {
                var processoDTO = await _processoService.GetById(id);
                if (processoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                var documentosProcesso = await _documentoProcessoService.GetByProcess(processoDTO.Id);
                if (documentosProcesso is null || !documentosProcesso.Any())
                {
                    _response.SetInvalid();
                    _response.Message = "Não existe Documentos vinculados ao Processo!";
                    _response.Data = new { error = "Não existe Documentos vinculados ao Processo!" };
                    return BadRequest(_response);
                }
                else if (!documentosProcesso.Any(dp => dp.Status == StatusDocumentProcess.Attached))
                {
                    _response.SetInvalid();
                    _response.Message = "Não existe Documentos Anexados a ser enviado para Análise!";
                    _response.Data = new { error = "Não existe Documentos Anexados a ser enviado para Análise!" };
                    return BadRequest(_response);
                }

                foreach (var documento in documentosProcesso.Where(dp => dp.Status == StatusDocumentProcess.Attached))
                {
                    documento.SendForAnalysis();
                    await _documentoProcessoService.Update(documento);
                }

                processoDTO.SendForAnalysis();
                await _processoService.Update(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " enviado para análise.";
                _response.Data = processoDTO;
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

        [HttpPut("Approve/{id:Guid}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Approve(Guid id)
        {
            try
            {
                var processoDTO = await _processoService.GetById(id);
                if (processoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                processoDTO.Approve();
                await _processoService.Update(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " aprovado.";
                _response.Data = processoDTO;
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

        [HttpPut("Disapprove/{id:Guid}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Disapprove(Guid id)
        {
            try
            {
                var processoDTO = await _processoService.GetById(id);
                if (processoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Processo informado não existe!";
                    _response.Data = new { errorId = "O Processo informado não existe!" };
                    return NotFound(_response);
                }

                processoDTO.Disapprove();
                await _processoService.Update(processoDTO);

                _response.SetSuccess();
                _response.Message = "Processo " + processoDTO.IdentificacaoProcesso + " desaprovado.";
                _response.Data = processoDTO;
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

        private async Task BrowseStageDocuments(int idTipoProcesso, Guid idProcesso, int? idResponsavel, ICollection<DocumentoProcessoDTO> documentosProcesso)
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

        private async Task<dynamic> GetAllData(ProcessoDTO processoDTO)
        {
            dynamic processo = new ExpandoObject();
            var documentos = await _documentoProcessoService.GetByProcess(processoDTO.Id);

            processo = GenerateProcess(processoDTO);
            processo.tipoProcesso = GenerateTypeProcess(await _tipoProcessoService.GetById(processoDTO.IdTipoProcesso));

            processo.tipoProcesso.etapas = new List<dynamic>();
            var etapas = await _etapaService.GetStagesRelatedToTypeProcess(processoDTO.IdTipoProcesso);
            foreach (var etapa in etapas)
            {
                dynamic etapaObj = GenerateStage(etapa);
                etapaObj.documentosEtapa = new List<dynamic>();

                // Obtenha os documentos da etapa
                var documentosEtapa = await _tipoDocumentoEtapaService.GetTypeDocumentStagesRelatedToStage(etapa.Id);
                foreach (var documentoEtapa in documentosEtapa)
                {
                    var docEtapa = GenerateTypeDocumentStage(documentoEtapa);
                    docEtapa.tipoDocumento = GenerateTypeDocument(await _tipoDocumentoService.GetById(documentoEtapa.IdTipoDocumento));

                    // Associa o documento do processo, se existir
                    var documentoProcesso = documentos.FirstOrDefault(dp => dp.IdTipoDocumentoEtapa == documentoEtapa.Id);
                    docEtapa.documentoProcesso = documentoProcesso != null ? GenerateDocumentProcess(documentoProcesso) : null;

                    etapaObj.documentosEtapa.Add(docEtapa);
                }

                // Calcula o progresso da etapa
                var documentosEtapas = ((IEnumerable<dynamic>)etapaObj.documentosEtapa).ToList();
                etapaObj.progresso = new ExpandoObject();
                etapaObj.progresso.total = documentosEtapas.Count;
                etapaObj.progresso.pendente = documentosEtapas.Count(de => de.documentoProcesso == null ||
                                    (de.documentoProcesso?.status == StatusDocumentProcess.OnHold ||
                                     de.documentoProcesso.status == StatusDocumentProcess.Pending ||
                                     de.documentoProcesso.status == StatusDocumentProcess.NotAttached ||
                                     de.documentoProcesso.status == StatusDocumentProcess.NotIntact));
                etapaObj.progresso.anexado = documentosEtapas.Count(de => de.documentoProcesso != null && de.documentoProcesso.status == StatusDocumentProcess.Attached);
                etapaObj.progresso.analise = documentosEtapas.Count(de => de.documentoProcesso != null && de.documentoProcesso.status == StatusDocumentProcess.InAnalysis);
                etapaObj.progresso.aprovado = documentosEtapas.Count(de => de.documentoProcesso != null && de.documentoProcesso.status == StatusDocumentProcess.Approved);
                etapaObj.progresso.reprovado = documentosEtapas.Count(de => de.documentoProcesso != null && de.documentoProcesso.status == StatusDocumentProcess.Disapproved);

                // Adiciona o progresso da etapa ao progresso total do processo
                processo.progresso.total += etapaObj.progresso.total;
                processo.progresso.pendente += etapaObj.progresso.pendente;
                processo.progresso.anexado += etapaObj.progresso.anexado;
                processo.progresso.analise += etapaObj.progresso.analise;
                processo.progresso.aprovado += etapaObj.progresso.aprovado;
                processo.progresso.reprovado += etapaObj.progresso.reprovado;

                processo.tipoProcesso.etapas.Add(etapaObj);
            }

            return processo;
        }

        private static dynamic GenerateProcess(ProcessoDTO processo)
        {
            dynamic data = new ExpandoObject();
            data.id = processo.Id;
            data.identificacaoProcesso = processo.IdentificacaoProcesso;
            data.descricaoProcesso = processo.DescricaoProcesso;
            data.situacaoProcesso = processo.SituacaoProcesso;
            data.dataAprovacao = processo.DataAprovacao;
            data.status = processo.Status;

            data.idImovel = processo.IdImovel;
            data.idTipoProcesso = processo.IdTipoProcesso;
            data.idEngenheiro = processo.IdEngenheiro;
            data.idFiscal = processo.IdFiscal;
            data.idResponsavel = processo.IdResponsavel;
            data.idAprovador = processo.IdAprovador;

            data.progresso = new ExpandoObject();
            data.progresso.total = 0;
            data.progresso.pendente = 0;
            data.progresso.anexado = 0;
            data.progresso.analise = 0;
            data.progresso.aprovado = 0;
            data.progresso.reprovado = 0;

            return data;
        }

        private static dynamic GenerateTypeProcess(TipoProcessoDTO tipoProcesso)
        {
            dynamic data = new ExpandoObject();
            data.id = tipoProcesso.Id;
            data.nomeTipoProcesso = tipoProcesso.NomeTipoProcesso;
            data.descricaoTipoProcesso = tipoProcesso.DescricaoTipoProcesso;
            data.status = tipoProcesso.Status;

            return data;
        }

        private static dynamic GenerateStage(EtapaDTO etapa)
        {
            dynamic data = new ExpandoObject();
            data.id = etapa.Id;
            data.nomeEtapa = etapa.NomeEtapa;
            data.descricaoEtapa = etapa.DescricaoEtapa;
            data.posicao = etapa.Posicao;
            data.status = etapa.Status;

            data.idTipoProcesso = etapa.IdTipoProcesso;

            return data;
        }

        private static dynamic GenerateTypeDocumentStage(TipoDocumentoEtapaDTO tipoDocumentoEtapa)
        {
            dynamic data = new ExpandoObject();
            data.id = tipoDocumentoEtapa.Id;
            data.posicao = tipoDocumentoEtapa.Posicao;
            data.status = tipoDocumentoEtapa.Status;

            data.idEtapa = tipoDocumentoEtapa.IdEtapa;
            data.idTipoDocumento = tipoDocumentoEtapa.IdTipoDocumento;

            return data;
        }

        private static dynamic GenerateTypeDocument(TipoDocumentoDTO tipoDocumento)
        {
            dynamic data = new ExpandoObject();
            data.id = tipoDocumento.Id;
            data.nomeTipoDocumento = tipoDocumento.NomeTipoDocumento;
            data.descricaoTipoDocumento = tipoDocumento.DescricaoTipoDocumento;
            data.status = tipoDocumento.Status;

            return data;
        }

        private static dynamic GenerateDocumentProcess(DocumentoProcessoDTO documentoProcesso)
        {
            dynamic data = new ExpandoObject();
            data.id = documentoProcesso.Id;
            data.identificacaoDocumento = documentoProcesso.IdentificacaoDocumento;
            data.descricaoDocumento = documentoProcesso.DescricaoDocumento;
            data.observacaoDocumento = documentoProcesso.ObservacaoDocumento;
            data.status = documentoProcesso.Status;

            if (documentoProcesso.Arquivo != null)
            {
                data.arquivo = new
                {
                    hash = documentoProcesso.Arquivo.Hash,
                    bytes = documentoProcesso.Arquivo.Bytes,
                    fileName = documentoProcesso.Arquivo.FileName,
                    mimeType = documentoProcesso.Arquivo.MimeType
                };
            }
            else
            {
                data.arquivo = null;
            }

            data.idProcesso = documentoProcesso.IdProcesso;
            data.idTipoDocumentoEtapa = documentoProcesso.IdTipoDocumentoEtapa;
            data.idResponsavel = documentoProcesso.IdResponsavel;
            data.idAprovador = documentoProcesso.IdAprovador;

            return data;
        }
    }
}