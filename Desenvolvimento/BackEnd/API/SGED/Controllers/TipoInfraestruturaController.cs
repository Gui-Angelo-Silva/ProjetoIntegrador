using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class TipoInfraestruturaController : Controller
    {

        private readonly ITipoInfraestruturaService _tipoInfraestruturaService;
        private readonly Response _response;

        public TipoInfraestruturaController(ITipoInfraestruturaService tipoInfraestruturaService)
        {
            _tipoInfraestruturaService = tipoInfraestruturaService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoInfraestruturaDTO>>> Get()
        {
            var tipoInfraestruturasDTO = await _tipoInfraestruturaService.GetAll();
            _response.Status = true; _response.Data = tipoInfraestruturasDTO;
            _response.Message = tipoInfraestruturasDTO.Any() ?
                "Lista do(s) Tipo(s) de Infraestrutura obtida com sucesso." :
                "Nenhum Tipo de Infraestrutura encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetTipoInfraestrutura")]
        public async Task<ActionResult<TipoInfraestruturaDTO>> Get(int id)
        {
            var tipoInfraestruturaDTO = await _tipoInfraestruturaService.GetById(id);
            if (tipoInfraestruturaDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo de Infraestrutura não encontrado!"; _response.Data = tipoInfraestruturaDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Tipo de Infraestrutura " + tipoInfraestruturaDTO.NomeTipoInfraestrutura + " obtido com sucesso."; _response.Data = tipoInfraestruturaDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoInfraestruturaDTO tipoInfraestruturaDTO)
        {
            if (tipoInfraestruturaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoInfraestruturaDTO;
                return BadRequest(_response);
            }

            await _tipoInfraestruturaService.Create(tipoInfraestruturaDTO);

            _response.Status = true; _response.Message = "Tipo de Infraestrutura " + tipoInfraestruturaDTO.NomeTipoInfraestrutura + " cadastrado com sucesso."; _response.Data = tipoInfraestruturaDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoInfraestruturaDTO tipoInfraestruturaDTO)
        {
            if (tipoInfraestruturaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoInfraestruturaDTO;
                return BadRequest(_response);
            }

            var existingTipoInfraestrutura = await _tipoInfraestruturaService.GetById(tipoInfraestruturaDTO.Id);
            if (existingTipoInfraestrutura == null)
            {
                _response.Status = false; _response.Message = "O Tipo de Infraestrutura informado não existe!"; _response.Data = tipoInfraestruturaDTO;
                return NotFound(_response);
            }

            await _tipoInfraestruturaService.Update(tipoInfraestruturaDTO);

            _response.Status = true; _response.Message = "Tipo de Infraestrutura " + tipoInfraestruturaDTO.NomeTipoInfraestrutura + " alterado com sucesso."; _response.Data = tipoInfraestruturaDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoInfraestruturaDTO>> Delete(int id)
        {
            var tipoInfraestruturaDTO = await _tipoInfraestruturaService.GetById(id);
            if (tipoInfraestruturaDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo de Infraestrutura não encontrado!"; _response.Data = tipoInfraestruturaDTO;
                return NotFound(_response);
            }

            await _tipoInfraestruturaService.Remove(id);

            _response.Status = true; _response.Message = "Tipo de Infraestrutura " + tipoInfraestruturaDTO.NomeTipoInfraestrutura + " excluído com sucesso."; _response.Data = tipoInfraestruturaDTO;
            return Ok(_response);
        }
    }
}