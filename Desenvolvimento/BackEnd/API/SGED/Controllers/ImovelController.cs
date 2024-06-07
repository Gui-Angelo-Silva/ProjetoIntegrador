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
        private readonly IMunicipeService _municipeService;
        private readonly ILogradouroService _logradouroService;
        private readonly IImovelService _imovelService;
        private readonly Response _response;

        public ImovelController(IMunicipeService municipeService, ILogradouroService logradouroService, IImovelService imovelService)
        {
            _municipeService = municipeService;
            _logradouroService = logradouroService;
            _imovelService = imovelService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<ImovelDTO>>> Get()
        {
            try
            {
                var imovelsDTO = await _imovelService.GetAll();
                _response.SetSuccess();
                _response.Message = imovelsDTO.Any() ?
                    "Lista do(s) Imóvel(is) obtida com sucesso." :
                    "Nenhum Imovel encontrado.";
                _response.Data = imovelsDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Imóvel(is)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetImovel")]
        public async Task<ActionResult<ImovelDTO>> Get(int id)
        {
            try
            {
                var imovelDTO = await _imovelService.GetById(id);
                if (imovelDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Imóvel não encontrado!";
                    _response.Data = imovelDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Imóvel " + imovelDTO.InscricaoCadastral + " obtido com sucesso.";
                _response.Data = imovelDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Imóvel informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] ImovelDTO imovelDTO)
        {
            if (imovelDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = imovelDTO;
                return BadRequest(_response);
            }
            imovelDTO.Id = 0;

            try
            {
                var municipeDTO = await _municipeService.GetById(imovelDTO.IdProprietario);
                if (municipeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Munícipe proprietário informado não existe!";
                    _response.Data = new { errorIdProprietario = "O Munícipe proprietário informado não existe!" };
                    return NotFound(_response);
                }

                municipeDTO = await _municipeService.GetById(imovelDTO.IdContribuinte);
                if (municipeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Municipe contribuinte informado não existe!";
                    _response.Data = new { errorIdContribuinte = "O Municipe contribuinte informado não existe!" };
                    return NotFound(_response);
                }

                var logradouroDTO = await _logradouroService.GetById(imovelDTO.IdLogradouro);
                if (logradouroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Logradouro informado não existe!";
                    _response.Data = new { errorIdLogradouro = "O Logradouro informado não existe!" };
                    return NotFound(_response);
                }

                if (await ImovelExists(imovelDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Imóvel " + imovelDTO.InscricaoCadastral + "!";
                    _response.Data = new { errorInscricaoCadastral = "Já existe o Imóvel " + imovelDTO.InscricaoCadastral + "!" };
                    return BadRequest(_response);
                }

                await _imovelService.Create(imovelDTO);

                _response.SetSuccess();
                _response.Message = "Imovel " + imovelDTO.InscricaoCadastral + " cadastrado com sucesso.";
                _response.Data = imovelDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Imóvel!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] ImovelDTO imovelDTO)
        {
            if (imovelDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = imovelDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingImovelDTO = await _imovelService.GetById(imovelDTO.Id);
                if (existingImovelDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Imóvel informado não existe!";
                    _response.Data = new { errorId = "O Imóvel informado não existe!" };
                    return NotFound(_response);
                }

                var municipeDTO = await _municipeService.GetById(imovelDTO.IdProprietario);
                if (municipeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Munícipe proprietário informado não existe!";
                    _response.Data = new { errorIdProprietario = "O Munícipe proprietário informado não existe!" };
                    return NotFound(_response);
                }

                municipeDTO = await _municipeService.GetById(imovelDTO.IdContribuinte);
                if (municipeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Municipe contribuinte informado não existe!";
                    _response.Data = new { errorIdContribuinte = "O Municipe contribuinte informado não existe!" };
                    return NotFound(_response);
                }

                var logradouroDTO = await _logradouroService.GetById(imovelDTO.IdLogradouro);
                if (logradouroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Logradouro informado não existe!";
                    _response.Data = new { errorIdLogradouro = "O Logradouro informado não existe!" };
                    return NotFound(_response);
                }

                if (await ImovelExists(imovelDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Imóvel " + imovelDTO.InscricaoCadastral + "!";
                    _response.Data = new { errorInscricaoCadastral = "Já existe o Imóvel " + imovelDTO.InscricaoCadastral + "!" };
                    return BadRequest(_response);
                }

                await _imovelService.Update(imovelDTO);

                _response.SetSuccess();
                _response.Message = "Imóvel " + imovelDTO.InscricaoCadastral + " alterado com sucesso.";
                _response.Data = imovelDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Imóvel!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<ImovelDTO>> Delete(int id)
        {
            try
            {
                var imovelDTO = await _imovelService.GetById(id);
                if (imovelDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Imóvel não encontrado!";
                    _response.Data = new { errorId = "Imóvel não encontrado!" };
                    return NotFound(_response);
                }

                await _imovelService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Imóvel " + imovelDTO.InscricaoCadastral + " excluído com sucesso.";
                _response.Data = imovelDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Imóvel!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> ImovelExists(ImovelDTO imovelDTO)
        {
            var imovelsDTO = await _imovelService.GetAll();
            return imovelsDTO.FirstOrDefault(i => i.Id != imovelDTO.Id && Operator.CompareString(i.InscricaoCadastral, imovelDTO.InscricaoCadastral)) is not null;
        }
    }
}