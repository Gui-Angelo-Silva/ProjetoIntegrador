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
    public class OcupacaoAtualController : Controller
    {

        private readonly IOcupacaoAtualService _ocupacaoAtualService;
        private readonly Response _response;

        public OcupacaoAtualController(IOcupacaoAtualService ocupacaoAtualService)
        {
            _ocupacaoAtualService = ocupacaoAtualService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<OcupacaoAtualDTO>>> Get()
        {
            var ocupacaoAtualsDTO = await _ocupacaoAtualService.GetAll();
            _response.Status = true; _response.Data = ocupacaoAtualsDTO;
            _response.Message = ocupacaoAtualsDTO.Any() ?
                "Lista da(s) Ocupação(ões) Atual(is) obtida com sucesso." :
                "Nenhuma Ocupação Atual encontrada.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetOcupacaoAtual")]
        public async Task<ActionResult<OcupacaoAtualDTO>> Get(int id)
        {
            var ocupacaoAtualDTO = await _ocupacaoAtualService.GetById(id);
            if (ocupacaoAtualDTO == null)
            {
                _response.Status = false; _response.Message = "Ocupação Atual não encontrada!"; _response.Data = ocupacaoAtualDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Ocupação Atual " + ocupacaoAtualDTO.NomeOcupacaoAtual + " obtida com sucesso."; _response.Data = ocupacaoAtualDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] OcupacaoAtualDTO ocupacaoAtualDTO)
        {
            if (ocupacaoAtualDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = ocupacaoAtualDTO;
                return BadRequest(_response);
            }

            await _ocupacaoAtualService.Create(ocupacaoAtualDTO);

            _response.Status = true; _response.Message = "Ocupação Atual " + ocupacaoAtualDTO.NomeOcupacaoAtual + " cadastrada com sucesso."; _response.Data = ocupacaoAtualDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] OcupacaoAtualDTO ocupacaoAtualDTO)
        {
            if (ocupacaoAtualDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = ocupacaoAtualDTO;
                return BadRequest(_response);
            }

            var existingOcupacaoAtual = await _ocupacaoAtualService.GetById(ocupacaoAtualDTO.Id);
            if (existingOcupacaoAtual == null)
            {
                _response.Status = false; _response.Message = "O Ocupação Atual informada não existe!"; _response.Data = ocupacaoAtualDTO;
                return NotFound(_response);
            }

            await _ocupacaoAtualService.Update(ocupacaoAtualDTO);

            _response.Status = true; _response.Message = "Ocupação Atual " + ocupacaoAtualDTO.NomeOcupacaoAtual + " alterada com sucesso."; _response.Data = ocupacaoAtualDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<OcupacaoAtualDTO>> Delete(int id)
        {
            var ocupacaoAtualDTO = await _ocupacaoAtualService.GetById(id);
            if (ocupacaoAtualDTO == null)
            {
                _response.Status = false; _response.Message = "Ocupação Atual não encontrada!"; _response.Data = ocupacaoAtualDTO;
                return NotFound(_response);
            }

            await _ocupacaoAtualService.Remove(id);

            _response.Status = true; _response.Message = "Ocupação Atual " + ocupacaoAtualDTO.NomeOcupacaoAtual + " excluída com sucesso."; _response.Data = ocupacaoAtualDTO;
            return Ok(_response);
        }
    }
}