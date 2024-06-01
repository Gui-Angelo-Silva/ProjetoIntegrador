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
    public class CidadeController : Controller
    {

        private readonly ICidadeService _cidadeService;
        private readonly Response _response;

        public CidadeController(ICidadeService cidadeService)
        {
            _cidadeService = cidadeService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CidadeDTO>>> Get()
        {
            var cidadesDTO = await _cidadeService.GetAll();
            _response.Status = true; _response.Data = cidadesDTO;
            _response.Message = cidadesDTO.Any() ?
                "Lista da(s) Cidade(s) obtida com sucesso." :
                "Nenhuma Cidade encontrada.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetCidade")]
        public async Task<ActionResult<CidadeDTO>> Get(int id)
        {
            var cidadeDTO = await _cidadeService.GetById(id);
            if (cidadeDTO == null)
            {
                _response.Status = false; _response.Message = "Cidade não encontrada!"; _response.Data = cidadeDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Cidade " + cidadeDTO.NomeCidade + " obtida com sucesso."; _response.Data = cidadeDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] CidadeDTO cidadeDTO)
        {
            if (cidadeDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = cidadeDTO;
                return BadRequest(_response);
            }

            await _cidadeService.Create(cidadeDTO);

            _response.Status = true; _response.Message = "Cidade " + cidadeDTO.NomeCidade + " cadastrada com sucesso."; _response.Data = cidadeDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] CidadeDTO cidadeDTO)
        {
            if (cidadeDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = cidadeDTO;
                return BadRequest(_response);
            }

            var existingCidade = await _cidadeService.GetById(cidadeDTO.Id);
            if (existingCidade == null)
            {
                _response.Status = false; _response.Message = "A Cidade informada não existe!"; _response.Data = cidadeDTO;
                return NotFound(_response);
            }
            await _cidadeService.Update(cidadeDTO);

            _response.Status = true; _response.Message = "Cidade " + cidadeDTO.NomeCidade + " alterada com sucesso."; _response.Data = cidadeDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CidadeDTO>> Delete(int id)
        {
            var cidadeDTO = await _cidadeService.GetById(id);
            if (cidadeDTO == null)
            {
                _response.Status = false; _response.Message = "Cidade não encontrada!"; _response.Data = cidadeDTO;
                return NotFound(_response);
            }

            await _cidadeService.Remove(id);

            _response.Status = true; _response.Message = "Cidade " + cidadeDTO.NomeCidade + " excluída com sucesso."; _response.Data = cidadeDTO;
            return Ok(_response);
        }
    }
}