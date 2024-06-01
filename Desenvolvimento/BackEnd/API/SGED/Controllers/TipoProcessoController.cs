using Microsoft.AspNetCore.Mvc;
using SGED.Services.Interfaces;
using SGED.Objects.Interfaces;
using SGED.Objects.Models.Entities;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Entities;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoProcessoController : Controller
    {
        private readonly ITipoProcessoService _tipoProcessoService;
        private readonly Response _response;

        public TipoProcessoController(ITipoProcessoService tipoProcessoService)
        {
            _tipoProcessoService = tipoProcessoService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoProcessoDTO>>> GetAll()
        {
            var tipoProcessos = await _tipoProcessoService.GetAll();
            _response.Status = true; _response.Data = tipoProcessos;
            _response.Message = tipoProcessos.Any() ? 
                "Lista do(s) Tipo(s) Processo obtida com sucesso." : 
                "Nenhum Tipo Processo encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetTipoProcesso")]
        public async Task<ActionResult<TipoProcessoDTO>> GetById(int id)
        {
            var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
            if (tipoProcessoDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo Processo não encontrado!"; _response.Data = tipoProcessoDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " obtido com sucesso."; _response.Data = tipoProcessoDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoProcessoDTO tipoProcessoDTO)
        {
            if (tipoProcessoDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }

            var tipoProcessos = await _tipoProcessoService.GetAll();

            if (tipoProcessos.FirstOrDefault(tipoprocesso => tipoprocesso.NomeTipoProcesso == tipoProcessoDTO.NomeTipoProcesso) != null)
            {
                _response.Status = false; _response.Message = "Já existe o Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!"; _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }
            else
            {
                tipoProcessoDTO.EnableAllOperations();
                await _tipoProcessoService.Create(tipoProcessoDTO);

                _response.Status = true; _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " cadastrado com sucesso."; _response.Data = tipoProcessoDTO;
                return Ok(_response);

                //return CreatedAtRoute("GetTipoProcesso", new { id = tipoProcessoDTO.Id }, tipoProcessoDTO);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoProcessoDTO tipoProcessoDTO)
        {
            if (tipoProcessoDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }

            var existingTipoProcesso = await _tipoProcessoService.GetById(tipoProcessoDTO.Id);
            if (existingTipoProcesso == null)
            {
                _response.Status = false; _response.Message = "Não existe o Tipo Processo informado!"; _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }
            else if (!existingTipoProcesso.Status)
            {
                _response.Status = false; _response.Message = "O Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " está desabilitado para alteração!"; _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }

            var tipoProcessos = await _tipoProcessoService.GetAll();
            tipoProcessos = tipoProcessos.Where(tp => tp.Id != tipoProcessoDTO.Id);

            if (tipoProcessos.FirstOrDefault(tp => tp.NomeTipoProcesso == tipoProcessoDTO.NomeTipoProcesso) != null)
            {
                _response.Status = false; _response.Message = "Já existe o Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!"; _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }
            else
            {
                tipoProcessoDTO.EnableAllOperations();
                await _tipoProcessoService.Update(tipoProcessoDTO);

                _response.Status = true; _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " alterado com sucesso."; _response.Data = tipoProcessoDTO;
                return Ok(_response);
            }
        }

        [HttpPut("{id}/Ativar")]
        public async Task<ActionResult<TipoProcessoDTO>> Activity(int id)
        {
            var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
            if (tipoProcessoDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo Processo não encontrado!"; _response.Data = tipoProcessoDTO;
                return NotFound(_response);
            }

            if (!tipoProcessoDTO.Status)
            {
                tipoProcessoDTO.EnableAllOperations();
                await _tipoProcessoService.Update(tipoProcessoDTO);
            }

            _response.Status = true; _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " ativado com sucesso."; _response.Data = tipoProcessoDTO;
            return Ok(_response);
        }

        [HttpPut("{id}/Desativar")]
        public async Task<ActionResult<TipoProcessoDTO>> Desactivity(int id)
        {
            var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
            if (tipoProcessoDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo Processo não encontrado!"; _response.Data = tipoProcessoDTO;
                return NotFound(_response);
            }

            if (tipoProcessoDTO.Status)
            {
                tipoProcessoDTO.DisableAllOperations();
                await _tipoProcessoService.Update(tipoProcessoDTO);
            }

            _response.Status = true; _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " desativado com sucesso."; _response.Data = tipoProcessoDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoProcessoDTO>> Delete(int id)
        {
            var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
            if (tipoProcessoDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo Processo não encontrado!"; _response.Data = tipoProcessoDTO;
                return NotFound(_response);
            }
            if (!tipoProcessoDTO.Status)
            {
                _response.Status = false; _response.Message = "O Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " está desabilitado para exclusão!"; _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }

            await _tipoProcessoService.Remove(id);

            _response.Status = true; _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " excluído com sucesso."; _response.Data = tipoProcessoDTO;
            return Ok(_response);
        }
    }
}
