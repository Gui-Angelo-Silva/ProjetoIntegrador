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
    public class TipoLogradouroController : Controller
    {

        private readonly ITipoLogradouroService _tipoLogradouroService;
        private readonly Response _response;

        public TipoLogradouroController(ITipoLogradouroService tipoLogradouroService)
        {
            _tipoLogradouroService = tipoLogradouroService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoLogradouroDTO>>> Get()
        {
            var tipoLogradourosDTO = await _tipoLogradouroService.GetAll();
            _response.Status = true; _response.Data = tipoLogradourosDTO;
            _response.Message = tipoLogradourosDTO.Any() ?
                "Lista do(s) Tipo(s) de Logradouro obtida com sucesso." :
                "Nenhum Tipo de Logradouro encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetTipoLogradouro")]
        public async Task<ActionResult<TipoLogradouroDTO>> Get(int id)
        {
            var tipoLogradouroDTO = await _tipoLogradouroService.GetById(id);
            if (tipoLogradouroDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo de Logradouro não encontrado!"; _response.Data = tipoLogradouroDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + " obtido com sucesso."; _response.Data = tipoLogradouroDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoLogradouroDTO tipoLogradouroDTO)
        {
            if (tipoLogradouroDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoLogradouroDTO;
                return BadRequest(_response);
            }

            await _tipoLogradouroService.Create(tipoLogradouroDTO);

            _response.Status = true; _response.Message = "Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + " cadastrado com sucesso."; _response.Data = tipoLogradouroDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoLogradouroDTO tipoLogradouroDTO)
        {
            if (tipoLogradouroDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoLogradouroDTO;
                return BadRequest(_response);
            }

            var existingTipoLogradouro = await _tipoLogradouroService.GetById(tipoLogradouroDTO.Id);
            if (existingTipoLogradouro == null)
            {
                _response.Status = false; _response.Message = "O Tipo de Logradouro informado não existe!"; _response.Data = tipoLogradouroDTO;
                return NotFound(_response);
            }

            await _tipoLogradouroService.Update(tipoLogradouroDTO);

            _response.Status = true; _response.Message = "Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + " alterado com sucesso."; _response.Data = tipoLogradouroDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoLogradouroDTO>> Delete(int id)
        {
            var tipoLogradouroDTO = await _tipoLogradouroService.GetById(id);
            if (tipoLogradouroDTO == null)
            {
                _response.Status = false; _response.Message = "Tipo de Logradouro não encontrado!"; _response.Data = tipoLogradouroDTO;
                return NotFound(_response);
            }

            await _tipoLogradouroService.Remove(id);

            _response.Status = true; _response.Message = "Tipo de Logradouro " + tipoLogradouroDTO.CodigoInformativo + " excluído com sucesso."; _response.Data = tipoLogradouroDTO;
            return Ok(_response);
        }
    }
}