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
    public class LogradouroController : Controller
    {

        private readonly ILogradouroService _logradouroService;
        private readonly Response _response;

        public LogradouroController(ILogradouroService logradouroService)
        {
            _logradouroService = logradouroService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LogradouroDTO>>> Get()
        {
            var logradourosDTO = await _logradouroService.GetAll();
            _response.Status = true; _response.Data = logradourosDTO;
            _response.Message = logradourosDTO.Any() ?
                "Lista do(s) Logradouro(s) obtida com sucesso." :
                "Nenhum Logradouro encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetLogradouro")]
        public async Task<ActionResult<LogradouroDTO>> Get(int id)
        {
            var logradouroDTO = await _logradouroService.GetById(id);
            if (logradouroDTO == null)
            {
                _response.Status = false; _response.Message = "Logradouro não encontrado!"; _response.Data = logradouroDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Logradouro " + logradouroDTO.Cep + " obtido com sucesso."; _response.Data = logradouroDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] LogradouroDTO logradouroDTO)
        {
            if (logradouroDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = logradouroDTO;
                return BadRequest(_response);
            }

            await _logradouroService.Create(logradouroDTO);

            _response.Status = true; _response.Message = "Logradouro " + logradouroDTO.Cep + " cadastrado com sucesso."; _response.Data = logradouroDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] LogradouroDTO logradouroDTO)
        {
            if (logradouroDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = logradouroDTO;
                return BadRequest(_response);
            }

            var existingLogradouro = await _logradouroService.GetById(logradouroDTO.Id);
            if (existingLogradouro == null)
            {
                _response.Status = false; _response.Message = "O Logradouro informado não existe!"; _response.Data = logradouroDTO;
                return NotFound(_response);
            }

            await _logradouroService.Update(logradouroDTO);

            _response.Status = true; _response.Message = "Logradouro " + logradouroDTO.Cep + " alterado com sucesso."; _response.Data = logradouroDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<LogradouroDTO>> Delete(int id)
        {
            var logradouroDTO = await _logradouroService.GetById(id);
            if (logradouroDTO == null)
            {
                _response.Status = false; _response.Message = "Logradouro não encontrado!"; _response.Data = logradouroDTO;
                return NotFound(_response);
            }

            await _logradouroService.Remove(id);

            _response.Status = true; _response.Message = "Logradouro " + logradouroDTO.Cep + " excluído com sucesso."; _response.Data = logradouroDTO;
            return Ok(_response);
        }
    }
}