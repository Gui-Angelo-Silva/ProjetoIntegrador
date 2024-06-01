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
    public class InfraestruturaController : Controller
    {

        private readonly IInfraestruturaService _infraestruturaService;
        private readonly Response _response;

        public InfraestruturaController(IInfraestruturaService infraestruturaService)
        {
            _infraestruturaService = infraestruturaService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InfraestruturaDTO>>> Get()
        {
            var infraestruturasDTO = await _infraestruturaService.GetAll();
            _response.Status = true; _response.Data = infraestruturasDTO;
            _response.Message = infraestruturasDTO.Any() ?
                "Lista da(s) Infraestrutura(s) obtida com sucesso." :
                "Nenhum Infraestrutura encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetInfraestrutura")]
        public async Task<ActionResult<InfraestruturaDTO>> Get(int id)
        {
            var infraestruturaDTO = await _infraestruturaService.GetById(id);
            if (infraestruturaDTO == null)
            {
                _response.Status = false; _response.Message = "Infraestrutura não encontrada!"; _response.Data = infraestruturaDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Infraestrutura " + infraestruturaDTO.NomeInfraestrutura + " obtida com sucesso."; _response.Data = infraestruturaDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] InfraestruturaDTO infraestruturaDTO)
        {
            if (infraestruturaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = infraestruturaDTO;
                return BadRequest(_response);
            }

            await _infraestruturaService.Create(infraestruturaDTO);

            _response.Status = true; _response.Message = "Infraestrutura " + infraestruturaDTO.NomeInfraestrutura + " cadastrada com sucesso."; _response.Data = infraestruturaDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] InfraestruturaDTO infraestruturaDTO)
        {
            if (infraestruturaDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = infraestruturaDTO;
                return BadRequest(_response);
            }

            var existingInfraestrutura = await _infraestruturaService.GetById(infraestruturaDTO.Id);
            if (existingInfraestrutura == null)
            {
                _response.Status = false; _response.Message = "A Infraestrutura informada não existe!"; _response.Data = infraestruturaDTO;
                return NotFound(_response);
            }

            await _infraestruturaService.Update(infraestruturaDTO);

            _response.Status = true; _response.Message = "Infraestrutura " + infraestruturaDTO.NomeInfraestrutura + " alterada com sucesso."; _response.Data = infraestruturaDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<InfraestruturaDTO>> Delete(int id)
        {
            var infraestruturaDTO = await _infraestruturaService.GetById(id);
            if (infraestruturaDTO == null)
            {
                _response.Status = false; _response.Message = "Infraestrutura não encontrada!"; _response.Data = infraestruturaDTO;
                return NotFound(_response);
            }

            await _infraestruturaService.Remove(id);

            _response.Status = true; _response.Message = "Infraestrutura " + infraestruturaDTO.NomeInfraestrutura + " excluída com sucesso."; _response.Data = infraestruturaDTO;
            return Ok(_response);
        }
    }
}