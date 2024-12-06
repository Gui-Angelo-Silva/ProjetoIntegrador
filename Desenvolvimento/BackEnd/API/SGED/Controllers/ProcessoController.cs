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
using MySqlX.XDevAPI;
using SGED.Objects.Filters;
using System.Diagnostics;

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

        private readonly IImovelService _imovelService;
        private readonly IFiscalService _fiscalService;
        private readonly IEngenheiroService _engenheiroService;
        private readonly IUsuarioService _usuarioService;

        private readonly ISessaoService _sessaoService;
        private readonly Response _response;
        private readonly IMapper _mapper;

        public ProcessoController(
            ITipoProcessoService tipoProcessoService, IEtapaService etapaService, ITipoDocumentoService tipoDocumentoService, ITipoDocumentoEtapaService tipoDocumentoEtapaService, IDocumentoProcessoService documentoProcessoService, IProcessoService processoService,
            IImovelService imovelService, IFiscalService fiscalService, IEngenheiroService engenheiroService, IUsuarioService usuarioService,
            ISessaoService sessaoService, IMapper mapper)
        {
            _tipoProcessoService = tipoProcessoService;
            _etapaService = etapaService;
            _tipoDocumentoService = tipoDocumentoService;
            _tipoDocumentoEtapaService = tipoDocumentoEtapaService;
            _documentoProcessoService = documentoProcessoService;
            _processoService = processoService;

            _imovelService = imovelService;
            _fiscalService = fiscalService;
            _engenheiroService = engenheiroService;
            _usuarioService = usuarioService;

            _sessaoService = sessaoService;
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

        [HttpPost("Filter")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<dynamic>>> Filter(ProcessoFilter filters)
        {
            try
            {
                var processos = await _processoService.GetAllForFilter();

                // Aplica os filtros dinamicamente
                var processosList = new List<ProcessoDTO>();
                await foreach (var processo in ApplyFilters(processos, filters))
                {
                    processosList.Add(processo);
                }
                processos = processosList;

                // Aplica a ordenação com base no primeiro atributo com order válido
                processosList = new List<ProcessoDTO>();
                await foreach (var processo in ApplyOrder(processos, filters))
                {
                    processosList.Add(processo);
                }

                processos = processosList;

                // Monta a lista final com os dados processados
                var lista = new List<dynamic>();
                foreach (var processo in processos)
                {
                    lista.Add(await GetAllData(processo));
                }

                dynamic dados = new ExpandoObject();
                dados.quantidade = lista.Count;
                dados.quatidadePaginas = (int)Math.Ceiling((double)lista.Count() / filters.QuantidadeElementos);
                dados.paginaAtual = filters.Pagina < dados.quatidadePaginas ? filters.Pagina : dados.quatidadePaginas;

                // Índice inicial baseado na página atual
                int startIndex = (dados.paginaAtual - 1) * filters.QuantidadeElementos;

                // Pegando os itens da página atual
                dados.processos = lista
                    .Skip(startIndex) // Ignora os elementos antes do índice inicial
                    .Take(filters.QuantidadeElementos) // Pega apenas os elementos da página atual
                    .ToList();


                // Resposta da API
                _response.SetSuccess();
                _response.Message = lista.Any()
                    ? "Lista do(s) Processo(s) obtida com sucesso."
                    : "Nenhum Processo encontrado.";
                _response.Data = dados;
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

                // Pega o token do cabeçalho Authorization
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var sessao = await _sessaoService.GetByToken(token);

                processoDTO.PutInProgress();
                processoDTO.IdResponsavel = sessao.IdUsuario;
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

                // Pega o token do cabeçalho Authorization
                var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
                var sessao = await _sessaoService.GetByToken(token);

                processoDTO.Approve();
                processoDTO.IdAprovador = sessao.IdUsuario;
                processoDTO.DataAprovacao = DateTime.Now.ToString("dd/MM/yyyy");
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

                var documentosProcesso = await _documentoProcessoService.GetByProcess(processoDTO.Id);
                foreach (var documento in documentosProcesso.Where(dp => dp.Status == StatusDocumentProcess.InAnalysis))
                {
                    documento.Disapprove();
                    await _documentoProcessoService.Update(documento);
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
                        documentoProcesso.DataExpedicao = "";
                        documentoProcesso.DataAprovacao = "";
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
            data.dataInicio = processo.DataInicio;
            data.dataFinalizacao = processo.DataFinalizacao;
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
            data.dataExpedicao = documentoProcesso.DataExpedicao;
            data.dataAprovacao = documentoProcesso.DataAprovacao;
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

        // Método genérico para aplicar os filtros
        private async IAsyncEnumerable<ProcessoDTO> ApplyFilters(IEnumerable<ProcessoDTO> processos, ProcessoFilter filters)
        {
            if (!processos.Any() || filters == null) { foreach (var processo in processos) { yield return processo; } yield break; }

            // Filtra por ID do processo
            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.Id))
            {
                processos = processos.Where(p =>
                    p.Id != Guid.Empty &&
                    p.Id.ToString().Contains(filters.Id, StringComparison.OrdinalIgnoreCase));
            }

            // Filtra por identificação do processo
            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.IdentificacaoProcesso))
                processos = processos.Where(p =>
                    p.IdentificacaoProcesso != null &&
                    p.IdentificacaoProcesso.Contains(filters.IdentificacaoProcesso, StringComparison.OrdinalIgnoreCase));

            // Filtra por descrição do processo
            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.DescricaoProcesso))
                processos = processos.Where(p =>
                    p.DescricaoProcesso != null &&
                    p.DescricaoProcesso.Contains(filters.DescricaoProcesso, StringComparison.OrdinalIgnoreCase));

            // Filtra por situação do processo
            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.SituacaoProcesso))
                processos = processos.Where(p =>
                    p.SituacaoProcesso != null &&
                    p.SituacaoProcesso.Contains(filters.SituacaoProcesso, StringComparison.OrdinalIgnoreCase));

            // Filtra por intervalo de DataInicio
            if (processos.Any() && (!string.IsNullOrWhiteSpace(filters.DataInicio1) || !string.IsNullOrWhiteSpace(filters.DataInicio2)))
            {
                var startDate = ParseDateBR(filters.DataInicio1);
                var endDate = ParseDateBR(filters.DataInicio2);

                if (startDate.HasValue)
                    processos = processos.Where(p =>
                        DateTime.TryParseExact(p.DataInicio, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out var dataInicio)
                        && dataInicio >= startDate.Value);

                if (endDate.HasValue)
                    processos = processos.Where(p =>
                        DateTime.TryParseExact(p.DataInicio, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out var dataInicio)
                        && dataInicio <= endDate.Value);
            }

            // Filtra por intervalo de DataFinalizacao
            if (processos.Any() && (!string.IsNullOrWhiteSpace(filters.DataFinalizacao1) || !string.IsNullOrWhiteSpace(filters.DataFinalizacao2)))
            {
                var startDate = ParseDateBR(filters.DataFinalizacao1);
                var endDate = ParseDateBR(filters.DataFinalizacao2);

                if (startDate.HasValue)
                    processos = processos.Where(p =>
                        DateTime.TryParseExact(p.DataFinalizacao, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out var dataFinalizacao)
                        && dataFinalizacao >= startDate.Value);

                if (endDate.HasValue)
                    processos = processos.Where(p =>
                        DateTime.TryParseExact(p.DataFinalizacao, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out var dataFinalizacao)
                        && dataFinalizacao <= endDate.Value);
            }

            // Filtra por intervalo de DataAprovacao
            if (processos.Any() && (!string.IsNullOrWhiteSpace(filters.DataAprovacao1) || !string.IsNullOrWhiteSpace(filters.DataAprovacao2)))
            {
                var startDate = ParseDateBR(filters.DataAprovacao1);
                var endDate = ParseDateBR(filters.DataAprovacao2);

                if (startDate.HasValue)
                    processos = processos.Where(p =>
                        DateTime.TryParseExact(p.DataAprovacao, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out var dataAprovacao)
                        && dataAprovacao >= startDate.Value);

                if (endDate.HasValue)
                    processos = processos.Where(p =>
                        DateTime.TryParseExact(p.DataAprovacao, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out var dataAprovacao)
                        && dataAprovacao <= endDate.Value);
            }

            // Filtra por status (traduz enum para int)
            if (processos.Any() && filters.Status != -1)
                processos = processos.Where(p => (int)p.Status == filters.Status);

            // Filtra pela inscrição cadastral
            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.InscricaoCadastral))
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var imoveis = await _imovelService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var imoveisFiltrados = imoveis.Where(o =>
                    !string.IsNullOrWhiteSpace(o.InscricaoCadastral) &&
                    o.InscricaoCadastral.Contains(filters.InscricaoCadastral, StringComparison.OrdinalIgnoreCase))
                    .Select(o => o.Id) // Seleciona apenas os IDs dos imóveis
                    .ToList(); // Converte para lista

                // Filtra os processos que possuem o IdImovel presente nos imóveis filtrados
                processos = processos.Where(p => imoveisFiltrados.Contains(p.IdImovel)).ToList();
            }

            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.NomeTipoProcesso))
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var tiposProcesso = await _tipoProcessoService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var tiposProcessoFiltrados = tiposProcesso.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomeTipoProcesso) &&
                    o.NomeTipoProcesso.Contains(filters.NomeTipoProcesso, StringComparison.OrdinalIgnoreCase))
                    .Select(o => o.Id) // Seleciona apenas os IDs dos imóveis
                    .ToList(); // Converte para lista

                // Filtra os processos que possuem o IdImovel presente nos imóveis filtrados
                processos = processos.Where(p => tiposProcessoFiltrados.Contains(p.IdTipoProcesso)).ToList();
            }

            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.NomeFiscal))
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var fiscais = await _fiscalService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var fiscaisFiltrados = fiscais.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomePessoa) &&
                    o.NomePessoa.Contains(filters.NomeFiscal, StringComparison.OrdinalIgnoreCase))
                    .Select(o => o.Id) // Seleciona apenas os IDs dos imóveis
                    .ToList(); // Converte para lista

                // Filtra os processos que possuem o IdImovel presente nos imóveis filtrados
                processos = processos.Where(p => p.IdFiscal.HasValue && fiscaisFiltrados.Contains(p.IdFiscal.Value)).ToList();
            }

            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.NomeEngenheiro))
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var engenheiros = await _engenheiroService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var engenheirosFiltrados = engenheiros.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomePessoa) &&
                    o.NomePessoa.Contains(filters.NomeEngenheiro, StringComparison.OrdinalIgnoreCase))
                    .Select(o => o.Id) // Seleciona apenas os IDs dos imóveis
                    .ToList(); // Converte para lista

                // Filtra os processos que possuem o IdImovel presente nos imóveis filtrados
                processos = processos.Where(p => p.IdEngenheiro.HasValue && engenheirosFiltrados.Contains(p.IdEngenheiro.Value)).ToList();
            }

            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.NomeResponsavel))
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var responsaveis = await _usuarioService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var responsaveisFiltrados = responsaveis.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomePessoa) &&
                    o.NomePessoa.Contains(filters.NomeResponsavel, StringComparison.OrdinalIgnoreCase))
                    .Select(o => o.Id) // Seleciona apenas os IDs dos imóveis
                    .ToList(); // Converte para lista

                // Filtra os processos que possuem o IdImovel presente nos imóveis filtrados
                processos = processos.Where(p => p.IdResponsavel.HasValue && responsaveisFiltrados.Contains(p.IdResponsavel.Value)).ToList();
            }

            if (processos.Any() && !string.IsNullOrWhiteSpace(filters.NomeAprovador))
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var aprovadores = await _usuarioService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var aprovadoresFiltrados = aprovadores.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomePessoa) &&
                    o.NomePessoa.Contains(filters.NomeAprovador, StringComparison.OrdinalIgnoreCase))
                    .Select(o => o.Id) // Seleciona apenas os IDs dos imóveis
                    .ToList(); // Converte para lista

                // Filtra os processos que possuem o IdImovel presente nos imóveis filtrados
                processos = processos.Where(p => p.IdAprovador.HasValue && aprovadoresFiltrados.Contains(p.IdAprovador.Value)).ToList();
            }

            // Agora, yield return cada processo filtrado
            foreach (var processo in processos) { yield return processo; }
        }

        // Função auxiliar para converter strings em datas no formato esperado
        private DateTime? ParseDateBR(string dateString)
        {
            if (DateTime.TryParseExact(dateString, "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out var date))
                return date;

            return null;
        }

        private async IAsyncEnumerable<ProcessoDTO> ApplyOrder(IEnumerable<ProcessoDTO> processos, ProcessoFilter filters)
        {
            if (!processos.Any() || filters == null) { foreach (var processo in processos) { yield return processo; } yield break; }

            if (filters.OrdenarIdentificacaoProcesso != 0) // aqui ele diz que o filters pode ser null
                processos = filters.OrdenarIdentificacaoProcesso == 1
                    ? processos.OrderBy(p => p.IdentificacaoProcesso)
                    : processos.OrderByDescending(p => p.IdentificacaoProcesso);

            else if (filters.OrdenarDescricaoProcesso != 0) // aqui ele não diz isso, porque?
                processos = filters.OrdenarDescricaoProcesso == 1
                    ? processos.OrderBy(p => p.DescricaoProcesso)
                    : processos.OrderByDescending(p => p.DescricaoProcesso);

            else if (filters.OrdenarSituacaoProcesso != 0)
                processos = filters.OrdenarSituacaoProcesso == 1
                    ? processos.OrderBy(p => p.SituacaoProcesso)
                    : processos.OrderByDescending(p => p.SituacaoProcesso);

            else if (filters.OrdenarDataInicio != 0)
                processos = filters.OrdenarDataInicio == 1
                    ? processos.OrderBy(p => p.DataInicio)
                    : processos.OrderByDescending(p => p.DataInicio);

            else if (filters.OrdenarDataFinalizacao != 0)
                processos = filters.OrdenarDataFinalizacao == 1
                    ? processos.OrderBy(p => p.DataFinalizacao)
                    : processos.OrderByDescending(p => p.DataFinalizacao);

            else if (filters.OrdenarDataAprovacao != 0)
                processos = filters.OrdenarDataAprovacao == 1
                    ? processos.OrderBy(p => p.DataAprovacao)
                    : processos.OrderByDescending(p => p.DataAprovacao);

            else if (filters.OrdenarStatus != 0)
                processos = filters.OrdenarStatus == 1
                    ? processos.OrderBy(p => p.Status)
                    : processos.OrderByDescending(p => p.Status);

            else if (filters.OrdenarStatus != 0)
                processos = filters.OrdenarStatus == 1
                    ? processos.OrderBy(p => p.Status)
                    : processos.OrderByDescending(p => p.Status);

            else if (filters.OrdenarInscricaoCadastral != 0)
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var imoveis = await _imovelService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var imoveisFiltrados = imoveis.Where(o =>
                    !string.IsNullOrWhiteSpace(o.InscricaoCadastral) &&
                    o.InscricaoCadastral.Contains(filters.InscricaoCadastral, StringComparison.OrdinalIgnoreCase));

                // Aplica a ordenação conforme o filtro
                imoveisFiltrados = filters.OrdenarInscricaoCadastral == 1
                    ? imoveisFiltrados.OrderBy(p => p.InscricaoCadastral)
                    : imoveisFiltrados.OrderByDescending(p => p.InscricaoCadastral);

                var idsFiltrados = imoveisFiltrados.Select(o => o.Id).ToList();

                // Cria um dicionário para mapear o IdImovel à sua posição na lista de idsFiltrados
                var indexMap = idsFiltrados.Select((id, index) => new { id, index })
                                           .ToDictionary(x => x.id, x => x.index);

                // Ordena os processos pela posição de IdImovel nos idsFiltrados
                processos = processos.Where(p => idsFiltrados.Contains(p.IdImovel))
                                     .OrderBy(p => indexMap[p.IdImovel])  // Ordena com base na posição no indexMap
                                     .ToList();
            }

            else if (filters.OrdenarNomeTipoProcesso != 0)
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var tiposProcesso = await _tipoProcessoService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var tiposProcessoFiltrados = tiposProcesso.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomeTipoProcesso) &&
                    o.NomeTipoProcesso.Contains(filters.NomeTipoProcesso, StringComparison.OrdinalIgnoreCase));

                // Aplica a ordenação conforme o filtro
                tiposProcessoFiltrados = filters.OrdenarNomeTipoProcesso == 1
                    ? tiposProcessoFiltrados.OrderBy(p => p.NomeTipoProcesso)
                    : tiposProcessoFiltrados.OrderByDescending(p => p.NomeTipoProcesso);

                var idsFiltrados = tiposProcessoFiltrados.Select(o => o.Id).ToList();

                // Cria um dicionário para mapear o IdImovel à sua posição na lista de idsFiltrados
                var indexMap = idsFiltrados.Select((id, index) => new { id, index })
                                           .ToDictionary(x => x.id, x => x.index);

                // Ordena os processos pela posição de IdImovel nos idsFiltrados
                processos = processos.Where(p => idsFiltrados.Contains(p.IdTipoProcesso))
                                     .OrderBy(p => indexMap[p.IdTipoProcesso])  // Ordena com base na posição no indexMap
                                     .ToList();
            }

            else if (filters.OrdenarNomeFiscal != 0)
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var fiscais = await _fiscalService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var fiscaisFiltrados = fiscais.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomePessoa) &&
                    o.NomePessoa.Contains(filters.NomeFiscal, StringComparison.OrdinalIgnoreCase));

                // Aplica a ordenação conforme o filtro
                fiscaisFiltrados = filters.OrdenarNomeFiscal == 1
                    ? fiscaisFiltrados.OrderBy(p => p.NomePessoa)
                    : fiscaisFiltrados.OrderByDescending(p => p.NomePessoa);

                var idsFiltrados = fiscaisFiltrados.Select(o => o.Id).ToList();

                // Cria um dicionário para mapear o IdImovel à sua posição na lista de idsFiltrados
                var indexMap = idsFiltrados.Select((id, index) => new { id, index })
                                           .ToDictionary(x => x.id, x => x.index);

                // Ordena os processos pela posição de IdImovel nos idsFiltrados
                processos = processos.Where(p => p.IdFiscal.HasValue && idsFiltrados.Contains(p.IdFiscal.Value))
                                     .OrderBy(p => indexMap[p.IdFiscal.Value])  // Ordena com base na posição no indexMap
                                     .ToList();
            }

            else if (filters.OrdenarNomeEngenheiro != 0)
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var engenheiros = await _engenheiroService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var engenheirosFiltrados = engenheiros.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomePessoa) &&
                    o.NomePessoa.Contains(filters.NomeEngenheiro, StringComparison.OrdinalIgnoreCase));

                // Aplica a ordenação conforme o filtro
                engenheirosFiltrados = filters.OrdenarNomeEngenheiro == 1
                    ? engenheirosFiltrados.OrderBy(p => p.NomePessoa)
                    : engenheirosFiltrados.OrderByDescending(p => p.NomePessoa);

                var idsFiltrados = engenheirosFiltrados.Select(o => o.Id).ToList();

                // Cria um dicionário para mapear o IdImovel à sua posição na lista de idsFiltrados
                var indexMap = idsFiltrados.Select((id, index) => new { id, index })
                                           .ToDictionary(x => x.id, x => x.index);

                // Ordena os processos pela posição de IdImovel nos idsFiltrados
                processos = processos.Where(p => p.IdEngenheiro.HasValue && idsFiltrados.Contains(p.IdEngenheiro.Value))
                                     .OrderBy(p => indexMap[p.IdEngenheiro.Value])  // Ordena com base na posição no indexMap
                                     .ToList();
            }

            else if (filters.OrdenarNomeResponsavel != 0)
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var usuarios = await _usuarioService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var usuariosFiltrados = usuarios.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomePessoa) &&
                    o.NomePessoa.Contains(filters.NomeResponsavel, StringComparison.OrdinalIgnoreCase));

                // Aplica a ordenação conforme o filtro
                usuariosFiltrados = filters.OrdenarNomeResponsavel == 1
                    ? usuariosFiltrados.OrderBy(p => p.NomePessoa)
                    : usuariosFiltrados.OrderByDescending(p => p.NomePessoa);

                var idsFiltrados = usuariosFiltrados.Select(o => o.Id).ToList();

                // Cria um dicionário para mapear o IdImovel à sua posição na lista de idsFiltrados
                var indexMap = idsFiltrados.Select((id, index) => new { id, index })
                                           .ToDictionary(x => x.id, x => x.index);

                // Ordena os processos pela posição de IdImovel nos idsFiltrados
                processos = processos.Where(p => p.IdResponsavel.HasValue && idsFiltrados.Contains(p.IdResponsavel.Value))
                                     .OrderBy(p => indexMap[p.IdResponsavel.Value])  // Ordena com base na posição no indexMap
                                     .ToList();
            }

            else if (filters.OrdenarNomeAprovador != 0)
            {
                // Obtém todos os imóveis, mas com o filtro já aplicado se possível
                var usuarios = await _usuarioService.GetAll();

                // Filtra os imóveis pela inscrição cadastral
                var usuariosFiltrados = usuarios.Where(o =>
                    !string.IsNullOrWhiteSpace(o.NomePessoa) &&
                    o.NomePessoa.Contains(filters.NomeAprovador, StringComparison.OrdinalIgnoreCase));

                // Aplica a ordenação conforme o filtro
                usuariosFiltrados = filters.OrdenarNomeAprovador == 1
                    ? usuariosFiltrados.OrderBy(p => p.NomePessoa)
                    : usuariosFiltrados.OrderByDescending(p => p.NomePessoa);

                var idsFiltrados = usuariosFiltrados.Select(o => o.Id).ToList();

                // Cria um dicionário para mapear o IdImovel à sua posição na lista de idsFiltrados
                var indexMap = idsFiltrados.Select((id, index) => new { id, index })
                                           .ToDictionary(x => x.id, x => x.index);

                // Ordena os processos pela posição de IdImovel nos idsFiltrados
                processos = processos.Where(p => p.IdAprovador.HasValue && idsFiltrados.Contains(p.IdAprovador.Value))
                                     .OrderBy(p => indexMap[p.IdAprovador.Value])  // Ordena com base na posição no indexMap
                                     .ToList();
            }

            foreach (var processo in processos) { yield return processo; }
        }
    }
}