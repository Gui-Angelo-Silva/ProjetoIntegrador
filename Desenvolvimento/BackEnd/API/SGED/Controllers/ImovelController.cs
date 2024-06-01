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
    public class ImovelController : Controller
    {

        private readonly IImovelService _imovelService;
        private readonly Response _response;

        public ImovelController(IImovelService imovelService)
        {
            _imovelService = imovelService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImovelDTO>>> Get()
        {
            var imovelsDTO = await _imovelService.GetAll();
            _response.Status = true; _response.Data = imovelsDTO;
            _response.Message = imovelsDTO.Any() ?
                "Lista do(s) Imóvel(is) obtida com sucesso." :
                "Nenhum Imóvel encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetImovel")]
        public async Task<ActionResult<ImovelDTO>> Get(int id)
        {
            var imovelDTO = await _imovelService.GetById(id);
            if (imovelDTO == null)
            {
                _response.Status = false; _response.Message = "Imóvel não encontrado!"; _response.Data = imovelDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Imóvel " + imovelDTO.InscricaoCadastral + " obtido com sucesso."; _response.Data = imovelDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ImovelDTO imovelDTO)
        {
            if (imovelDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = imovelDTO;
                return BadRequest(_response);
            }

            await _imovelService.Create(imovelDTO);

            _response.Status = true; _response.Message = "Imóvel " + imovelDTO.InscricaoCadastral + " cadastrado com sucesso."; _response.Data = imovelDTO;
            return Ok(_response);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] ImovelDTO imovelDTO)
        {
            if (imovelDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = imovelDTO;
                return BadRequest(_response);
            }

            var existingImovel = await _imovelService.GetById(imovelDTO.Id);
            if (existingImovel == null)
            {
                _response.Status = false; _response.Message = "O Imóvel informado não existe!"; _response.Data = imovelDTO;
                return NotFound(_response);
            }

            await _imovelService.Update(imovelDTO);

            _response.Status = true; _response.Message = "Imóvel " + imovelDTO.InscricaoCadastral + " alterado com sucesso."; _response.Data = imovelDTO;
            return Ok(_response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ImovelDTO>> Delete(int id)
        {
            var imovelDTO = await _imovelService.GetById(id);
            if (imovelDTO == null)
            {
                _response.Status = false; _response.Message = "Imóvel não encontrado!"; _response.Data = imovelDTO;
                return NotFound(_response);
            }

            await _imovelService.Remove(id);

            _response.Status = true; _response.Message = "Imóvel " + imovelDTO.InscricaoCadastral + " excluído com sucesso."; _response.Data = imovelDTO;
            return Ok(_response);
        }
    }
}