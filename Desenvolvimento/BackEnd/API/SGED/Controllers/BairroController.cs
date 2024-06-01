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
    public class BairroController : Controller
    {
        private readonly IBairroService _bairroService;
        private readonly Response _response;

        public BairroController(IBairroService bairroService)
        {
            _bairroService = bairroService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BairroDTO>>> Get()
        {
            var bairrosDTO = await _bairroService.GetAll();
            _response.Status = true; _response.Data = bairrosDTO;
            _response.Message = bairrosDTO.Any() ?
                "Lista do(s) Bairro(s) obtida com sucesso." :
                "Nenhum Bairro encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetBairro")]
        public async Task<ActionResult<BairroDTO>> Get(int id)
        {
            var bairroDTO = await _bairroService.GetById(id);
            if (bairroDTO == null)
            {
                _response.Status = false; _response.Message = "Bairro não encontrado!"; _response.Data = bairroDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Bairro " + bairroDTO.NomeBairro + " obtido com sucesso."; _response.Data = bairroDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] BairroDTO bairroDTO)
        {
            if (bairroDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = bairroDTO;
                return BadRequest(_response);
            }

            await _bairroService.Create(bairroDTO);

            _response.Status = true; _response.Message = "Bairro " + bairroDTO.NomeBairro + " cadastrado com sucesso."; _response.Data = bairroDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] BairroDTO bairroDTO)
        {
            if (bairroDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = bairroDTO;
                return BadRequest(_response);
            }

            var existingBairro = await _bairroService.GetById(bairroDTO.Id);
            if (existingBairro == null)
            {
                _response.Status = false; _response.Message = "O Bairro informado não existe!"; _response.Data = bairroDTO;
                return NotFound(_response);
            }

            await _bairroService.Update(bairroDTO);

            _response.Status = true; _response.Message = "Bairro " + bairroDTO.NomeBairro + " alterado com sucesso."; _response.Data = bairroDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BairroDTO>> Delete(int id)
        {
            var bairroDTO = await _bairroService.GetById(id);
            if (bairroDTO == null)
            {
                _response.Status = false; _response.Message = "Bairro não encontrado!"; _response.Data = bairroDTO;
                return NotFound(_response);
            }

            await _bairroService.Remove(id);

            _response.Status = true; _response.Message = "Bairro " + bairroDTO.NomeBairro + " excluído com sucesso."; _response.Data = bairroDTO;
            return Ok(_response);
        }
    }
}