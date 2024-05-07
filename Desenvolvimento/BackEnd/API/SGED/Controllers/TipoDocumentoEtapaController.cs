using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using SGED.Objects.Models.Entities;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize("ApiScope")]
    public class TipoDocumentoEtapaController : Controller
    {

        private readonly ITipoDocumentoEtapaService _tipoDocumentoEtapaService;
        private readonly ITipoDocumentoService _tipoDocumentoService;
        private readonly IEtapaService _etapaService;
        private Response _response;

        public TipoDocumentoEtapaController(ITipoDocumentoEtapaService TipoDocumentoEtapaService, ITipoDocumentoService TipoDocumentoService, IEtapaService EtapaService)
        {
            _tipoDocumentoEtapaService = TipoDocumentoEtapaService;
            _tipoDocumentoService = TipoDocumentoService;
            _etapaService = EtapaService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> GetAll()
        {
            var tipoDocumentoEtapas = await _tipoDocumentoEtapaService.GetAll();
            _response.Status = true; _response.Data = tipoDocumentoEtapas;
            _response.Message = tipoDocumentoEtapas.Any() ?
                "Lista do(s) relacionamento(s) entre Etapa(s) e Tipo(s) Documento obtida com sucesso." :
                "Nenhum relacionamento entre Etapa(s) e Tipo(s) Documento encontrado!";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetTipoDocumentoEtapa")]
        public async Task<ActionResult<TipoDocumentoDTO>> Get(int id)
        {
            var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
            if (tipoDocumentoEtapaDTO == null)
            {
                _response.Status = false; _response.Message = "Relacionamento entre Etapa e Tipo Documento não encontrado!"; _response.Data = tipoDocumentoEtapaDTO;
                return NotFound(_response);
            };

            var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);
            var tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

            _response.Status = true; _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " obtido com sucesso."; _response.Data = tipoDocumentoEtapaDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoDocumentoEtapaDTO tipoDocumentoEtapaDTO)
        {
            if (tipoDocumentoEtapaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado inválido!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }

            var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);

            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "A Etapa não existe!"; _response.Data = tipoDocumentoEtapaDTO;
                return NotFound(_response);
            }
            else if (!etapaDTO.Status)
            {
                _response.Status = false; _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " está desabilitada para adicionar relacionamentos com Tipos Documento!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }

            var tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

            if (tipoDocumentoDTO == null)
            {
                _response.Status = false; _response.Message = "O Tipo Documento não existe!"; _response.Data = tipoDocumentoEtapaDTO;
                return NotFound(_response);
            }
            else if (!tipoDocumentoDTO.Status)
            {
                _response.Status = false; _response.Message = "O Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " está desabilitado para adicionar relacionamentos com Etapas!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }

            var tipoDocumentoEtapasDTO = await _tipoDocumentoEtapaService.GetAll();
            if (tipoDocumentoEtapasDTO.FirstOrDefault(tipoDocumentoEtapa => tipoDocumentoEtapa.IdTipoDocumento == tipoDocumentoDTO.Id && tipoDocumentoEtapa.IdEtapa == etapaDTO.Id) != null)
            {
                _response.Status = false; _response.Message = "Já existe um relacionamento da Etapa " + etapaDTO.NomeEtapa + " com o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }

            tipoDocumentoEtapaDTO.EnableAllOperations();
            await _tipoDocumentoEtapaService.Create(tipoDocumentoEtapaDTO);

            _response.Status = true; _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " cadastrado com sucesso."; _response.Data = tipoDocumentoEtapaDTO;
            return Ok(_response);

            //return new CreatedAtRouteResult("GetTipoDocumentoEtapa", new { id = tipoDocumentoEtapaDTO.Id }, tipoDocumentoEtapaDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoDocumentoEtapaDTO tipoDocumentoEtapaDTO)
        {
            if (tipoDocumentoEtapaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado inválido!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }

            var etapaDTO = default(EtapaDTO); var tipoDocumentoDTO = default(TipoDocumentoDTO);
            var existingTipoDocumentoEtapa = await _tipoDocumentoEtapaService.GetById(tipoDocumentoEtapaDTO.Id);
            if (existingTipoDocumentoEtapa == null)
            {
                _response.Status = false; _response.Message = "Não existe o relacionamento entre Etapa e Tipo Documento informado!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }
            else if (!existingTipoDocumentoEtapa.Status)
            {
                etapaDTO = await _etapaService.GetById(existingTipoDocumentoEtapa.IdEtapa);
                tipoDocumentoDTO = await _tipoDocumentoService.GetById(existingTipoDocumentoEtapa.IdTipoDocumento);

                _response.Status = false; _response.Message = "O relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " está desabilitado para alteração!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }

            etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);

            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "A Etapa não existe!";
                return NotFound(_response);
            }
            else if (!etapaDTO.Status)
            {
                _response.Status = false; _response.Message = "A Etapa " + etapaDTO.NomeEtapa + " está desabilitada para adicionar relacionamentos com Tipos Documento!";
                return BadRequest(_response);
            }

            tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

            if (tipoDocumentoDTO == null)
            {
                _response.Status = false; _response.Message = "O Tipo Documento não existe!";
                return NotFound(_response);
            }
            else if (!tipoDocumentoDTO.Status)
            {
                _response.Status = false; _response.Message = "O Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " está desabilitado para adicionar relacionamentos com Etapas!";
                return BadRequest(_response);
            }

            var tipoDocumentoEtapasDTO = await _tipoDocumentoEtapaService.GetAll();
            tipoDocumentoEtapasDTO = tipoDocumentoEtapasDTO.Where(tipoDocumentoEtapa => tipoDocumentoEtapa.Id != tipoDocumentoEtapaDTO.Id);
            if (tipoDocumentoEtapasDTO.FirstOrDefault(tipoDocumentoEtapa => tipoDocumentoEtapa.IdTipoDocumento == tipoDocumentoDTO.Id && tipoDocumentoEtapa.IdEtapa == etapaDTO.Id) != null)
            {
                _response.Status = false; _response.Message = "Já existe um relacionamento da Etapa " + etapaDTO.NomeEtapa + " com o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + "!";
                return BadRequest(_response);
            }

            tipoDocumentoEtapaDTO.EnableAllOperations();
            await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);

            _response.Status = true; _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " alterado com sucesso."; _response.Data = tipoDocumentoEtapaDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> UpdatePosition(int id, int position)
        {
            if (position <= 0)
            {
                _response.Status = false; _response.Message = "Dado Inválido!"; _response.Data = null;
                return BadRequest(_response);
            }

            var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
            if (tipoDocumentoEtapaDTO == null)
            {
                _response.Status = false; _response.Message = "Relacionamento entre Etapa e Tipo Documento não encontrado!"; _response.Data = tipoDocumentoEtapaDTO;
                return NotFound(_response);
            }
            else if (tipoDocumentoEtapaDTO.Status)
            {
                _response.Status = false; _response.Message = "O relacionamento entre Etapa e Tipo Documento está desabilitado para alteração!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }
            else if (tipoDocumentoEtapaDTO.Posicao == position)
            {
                _response.Status = true; _response.Message = "O relacionamento entre Etapa e Tipo Documento já está na posição " + position + "º."; _response.Data = tipoDocumentoEtapaDTO;
            }

            var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);
            var tipoDocumentoEtapas = await _tipoDocumentoEtapaService.GetAll();
            tipoDocumentoEtapas = tipoDocumentoEtapas.Where(tipoDocumentoEtapa => tipoDocumentoEtapa.IdEtapa == etapaDTO.Id);

            if (tipoDocumentoEtapas.Count() < position)
            {
                _response.Status = false; _response.Message = "O relacionamento entre Etapa e Tipo Documento não pode assumir a posição " + position + "º porque existe somente " + tipoDocumentoEtapas.Count() + " Tipo(s) Documento relacionado(s) a Etapa " + etapaDTO.NomeEtapa + "!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }
            else if (tipoDocumentoEtapas.Where(tipoDocumentoEtapa => tipoDocumentoEtapa.Id != tipoDocumentoEtapaDTO.Id) != null)
            {
                tipoDocumentoEtapas = tipoDocumentoEtapas.Where(tipoDocumentoEtapa => tipoDocumentoEtapa.Id != tipoDocumentoEtapaDTO.Id);
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
                        .Skip(tipoDocumentoEtapaDTO.Posicao - 1)
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

            _response.Status = true; _response.Message = "Posição do relacionamento entre Etapa e Tipo Documento atualizado para " + position + "º."; _response.Data = tipoDocumentoEtapaDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoDocumentoEtapaDTO>> Delete(int id)
        {
            var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
            if (tipoDocumentoEtapaDTO == null)
            {
                _response.Status = false; _response.Message = "Relacionamento entre Etapa e Tipo Documento não encontrado!"; _response.Data = tipoDocumentoEtapaDTO;
                return NotFound(_response);
            }

            var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);
            var tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

            if (!tipoDocumentoEtapaDTO.Status)
            {
                _response.Status = false; _response.Message = "O relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " está desabilitado para exclusão!"; _response.Data = tipoDocumentoEtapaDTO;
                return BadRequest(_response);
            }

            await _tipoDocumentoEtapaService.Remove(id);

            _response.Status = true; _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " excluído com sucesso."; _response.Data = tipoDocumentoEtapaDTO;
            return Ok(_response);
        }

        [HttpGet("GetTypeDocumentsRelatedToStage/{idEtapa}")]
        public async Task<ActionResult<IEnumerable<TipoDocumentoDTO>>> GetTypeDocumentsRelatedToStage(int idEtapa)
        {
            var etapaDTO = await _etapaService.GetById(idEtapa);
            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "A Etapa informada não existe!"; _response.Data = null;
                return BadRequest(_response);
            }

            var tipoDocumentos = await _tipoDocumentoEtapaService.GetTypeDocumentsRelatedToStage(idEtapa);

            _response.Status = true; _response.Data = tipoDocumentos;
            _response.Message = tipoDocumentos.Any() ?
                "Lista do(s) Tipo(s) Documento relacionado(s) a Etapa " + etapaDTO.NomeEtapa + " obtida com sucesso." :
                "Nenhum Tipo Documento relacionado a Etapa " + etapaDTO.NomeEtapa + " foi encontrado!";
            return Ok(_response);
        }

        [HttpGet("GetTypeDocumentsNoRelatedToStage/{idEtapa}")]
        public async Task<ActionResult<TipoDocumentoDTO>> GetTypeDocumentsNoRelatedToStage(int idEtapa)
        {
            var etapaDTO = await _etapaService.GetById(idEtapa);
            if (etapaDTO == null)
            {
                _response.Status = false; _response.Message = "A Etapa informada não existe!"; _response.Data = null;
                return BadRequest(_response);
            }

            var tipoDocumentos = await _tipoDocumentoEtapaService.GetTypeDocumentsNoRelatedToStage(idEtapa);

            _response.Status = true; _response.Data = tipoDocumentos;
            _response.Message = tipoDocumentos.Any() ?
                "Lista do(s) Tipo(s) Documento não relacionado(s) a Etapa " + etapaDTO.NomeEtapa + " obtida com sucesso." :
                "Nenhum Tipo Documento não relacionado a Etapa " + etapaDTO.NomeEtapa + " foi encontrado!";
            return Ok(_response);
        }

        [HttpPut("{id}/Ativar")]
        public async Task<ActionResult<TipoDocumentoEtapaDTO>> Activity(int id)
        {
            var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
            if (tipoDocumentoEtapaDTO == null)
            {
                _response.Status = false; _response.Message = "Relacionamento entre Etapa e Tipo Documento não encontrado!"; _response.Data = tipoDocumentoEtapaDTO;
                return NotFound(_response);
            }

            var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);
            var tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

            if (!tipoDocumentoEtapaDTO.Status)
            {
                tipoDocumentoEtapaDTO.EnableAllOperations();
                await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);

                _response.Status = true; _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " ativado com sucesso."; _response.Data = tipoDocumentoEtapaDTO;
                return Ok(_response);
            }
            else
            {
                _response.Status = true; _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " já está ativado!"; _response.Data = tipoDocumentoEtapaDTO;
                return Ok(_response);
            }
        }

        [HttpPut("{id}/Desativar")]
        public async Task<ActionResult<TipoDocumentoEtapaDTO>> Desactivity(int id)
        {
            var tipoDocumentoEtapaDTO = await _tipoDocumentoEtapaService.GetById(id);
            if (tipoDocumentoEtapaDTO == null)
            {
                _response.Status = false; _response.Message = "Relacionamento entre Etapa e Tipo Documento não encontrado!"; _response.Data = tipoDocumentoEtapaDTO;
                return NotFound(_response);
            }

            var etapaDTO = await _etapaService.GetById(tipoDocumentoEtapaDTO.IdEtapa);
            var tipoDocumentoDTO = await _tipoDocumentoService.GetById(tipoDocumentoEtapaDTO.IdTipoDocumento);

            if (tipoDocumentoEtapaDTO.Status)
            {
                tipoDocumentoEtapaDTO.DisableAllOperations();
                await _tipoDocumentoEtapaService.Update(tipoDocumentoEtapaDTO);

                _response.Status = true; _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " desativado com sucesso."; _response.Data = tipoDocumentoEtapaDTO;
                return Ok(_response);
            } else
            {
                _response.Status = true; _response.Message = "Relacionamento entre a Etapa " + etapaDTO.NomeEtapa + " e o Tipo Documento " + tipoDocumentoDTO.NomeTipoDocumento + " já está desativado!"; _response.Data = tipoDocumentoEtapaDTO;
                return Ok(_response);
            }
        }
    }
}