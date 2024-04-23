using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using SGED.Models.Entities;
using SGED.Services.Interfaces;
using SGED.Objects.Helpers;
using SGED.Objects.Interfaces;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoProcessoController : Controller
    {
        private readonly ITipoProcessoService _tipoProcessoService;
        private Response _response;

        public TipoProcessoController(ITipoProcessoService tipoProcessoService)
        {
            _tipoProcessoService = tipoProcessoService;
            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoProcesso>>> Get()
        {
            var tipoProcessos = await _tipoProcessoService.GetAll();
            _response.Status = true; _response.Message = tipoProcessos;
            return Ok(tipoProcessos);
        }

        [HttpGet("{id}", Name = "GetTipoProcesso")]
        public async Task<ActionResult<TipoProcesso>> Get(int id)
        {
            var tipoProcesso = await _tipoProcessoService.GetById(id);
            if (tipoProcesso == null)
            {
                _response.Status = false; _response.Message = "Tipo Processo não encontrado!";
                return NotFound(_response);
            };
            return Ok(tipoProcesso);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoProcessoDTO tipoProcesso)
        {
            if (tipoProcesso == null)
            {
                _response.Status = false; _response.Message = "Dado inválido!";
                return BadRequest(_response);
            }

            var tipoProcessos = await _tipoProcessoService.GetAll();

            if (tipoProcessos.FirstOrDefault(tp => tp.NomeTipoProcesso == tipoProcesso.NomeTipoProcesso) != null) 
            {
                _response.Status = false; _response.Message = "Já existe o Tipo Processo "+tipoProcesso.NomeTipoProcesso+"!";
                return BadRequest(_response);
            } else
            {
                StatusExtensions.Ativar(tipoProcesso);
                await _tipoProcessoService.Create(tipoProcesso);

                return CreatedAtRoute("GetTipoProcesso", new { id = tipoProcesso.Id }, tipoProcesso);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoProcessoDTO tipoProcesso)
        {
            if (tipoProcesso == null)
            {
                _response.Status = false; _response.Message = "Dado inválido!";
                return BadRequest(_response);
            }

            var existingTipoProcesso = await _tipoProcessoService.GetById(tipoProcesso.Id);
            if (existingTipoProcesso == null)
            {
                _response.Status = false; _response.Message = "Não existe o Tipo Processo informado!";
                return BadRequest(_response);
            }

            if (existingTipoProcesso.Status)
            {
                _response.Status = false; _response.Message = "O Tipo Processo informado não está ativo para esta operação!";
                return BadRequest(_response);
            }

            var tipoProcessos = await _tipoProcessoService.GetAll();
            tipoProcessos = tipoProcessos.Where(tp => tp.Id != tipoProcesso.Id);

            if (tipoProcessos.FirstOrDefault(tp => tp.NomeTipoProcesso == tipoProcesso.NomeTipoProcesso) != null)
            {
                _response.Status = false; _response.Message = "Já existe o Tipo Processo " + tipoProcesso.NomeTipoProcesso + "!";
                return BadRequest(_response);
            }
            else
            {
                StatusExtensions.Ativar(tipoProcesso);
                await _tipoProcessoService.Update(tipoProcesso);

                _response.Status = true; _response.Message = tipoProcesso;
                return Ok(_response);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoProcesso>> Delete(int id)
        {
            var tipoProcesso = await _tipoProcessoService.GetById(id);
            if (tipoProcesso == null)
            {
                _response.Status = false; _response.Message = "Tipo Processo não encontrado!";
                return NotFound(_response);
            }
            else if (tipoProcesso.Status)
            {
                _response.Status = false; _response.Message = "O Tipo Processo informado não está ativo para está operação!";
                return BadRequest(_response);
            }

            await _tipoProcessoService.Delete(id);

            _response.Status = true; _response.Message = tipoProcesso;
            return Ok(_response);
        }

        [HttpPut("{id}/Ativar")]
        public async Task<ActionResult<TipoProcesso>> Activity(int id)
        {
            var tipoProcesso = await _tipoProcessoService.GetById(id);
            if (tipoProcesso == null) return NotFound("TipoProcesso não encontrado!");

            StatusExtensions.Ativar(tipoProcesso);
            await _tipoProcessoService.Update(tipoProcesso);
            return Ok(tipoProcesso);
        }

        [HttpPut("{id}/Desativar")]
        public async Task<ActionResult<TipoProcesso>> Desactivity(int id)
        {
            var tipoProcesso = await _tipoProcessoService.GetById(id);
            if (tipoProcesso == null) return NotFound("TipoProcesso não encontrado!");

            StatusExtensions.Inativar(tipoProcesso);
            await _tipoProcessoService.Update(tipoProcesso);
            return Ok(tipoProcesso);
        }
    }
}
