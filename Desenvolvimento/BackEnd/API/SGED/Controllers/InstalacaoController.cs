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
    public class InstalacaoController : Controller
    {

        private readonly IInstalacaoService _instalacaoService;
        private readonly Response _response;

        public InstalacaoController(IInstalacaoService instalacaoService)
        {
            _instalacaoService = instalacaoService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<InstalacaoDTO>>> Get()
        {
            var instalacaosDTO = await _instalacaoService.GetAll();
            _response.Status = true; _response.Data = instalacaosDTO;
            _response.Message = instalacaosDTO.Any() ?
                "Lista da(s) Instalação(ões) obtida com sucesso." :
                "Nenhuma Instalação encontrada.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetInstalacao")]
        public async Task<ActionResult<InstalacaoDTO>> Get(int id)
        {
            var instalacaoDTO = await _instalacaoService.GetById(id);
            if (instalacaoDTO == null)
            {
                _response.Status = false; _response.Message = "Instalação não encontrado!"; _response.Data = instalacaoDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Instalação obtida com sucesso."; _response.Data = instalacaoDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] InstalacaoDTO instalacaoDTO)
        {
            if (instalacaoDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = instalacaoDTO;
                return BadRequest(_response);
            }

            await _instalacaoService.Create(instalacaoDTO);

            _response.Status = true; _response.Message = "Instalação cadastrada com sucesso."; _response.Data = instalacaoDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] InstalacaoDTO instalacaoDTO)
        {
            if (instalacaoDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = instalacaoDTO;
                return BadRequest(_response);
            }

            var existingInstalacao = await _instalacaoService.GetById(instalacaoDTO.Id);
            if (existingInstalacao == null)
            {
                _response.Status = false; _response.Message = "A Instalação informada não existe!"; _response.Data = instalacaoDTO;
                return NotFound(_response);
            }

            await _instalacaoService.Update(instalacaoDTO);

            _response.Status = true; _response.Message = "Instalação alterada com sucesso."; _response.Data = instalacaoDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<InstalacaoDTO>> Delete(int id)
        {
            var instalacaoDTO = await _instalacaoService.GetById(id);
            if (instalacaoDTO == null)
            {
                _response.Status = false; _response.Message = "Instalação não encontrada!"; _response.Data = instalacaoDTO;
                return NotFound(_response);
            }

            await _instalacaoService.Remove(id);

            _response.Status = true; _response.Message = "Instalação excluída com sucesso."; _response.Data = instalacaoDTO;
            return Ok(_response);
        }
    }
}