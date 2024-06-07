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
        private readonly ICidadeService _cidadeService;
        private readonly IBairroService _bairroService;
        private readonly Response _response;

        public BairroController(ICidadeService cidadeService, IBairroService bairroService)
        {
            _cidadeService = cidadeService;
            _bairroService = bairroService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<BairroDTO>>> Get()
        {
            try
            {
                var bairrosDTO = await _bairroService.GetAll();
                _response.SetSuccess();
                _response.Message = bairrosDTO.Any() ?
                    "Lista do(s) Bairro(s) obtida com sucesso." :
                    "Nenhum Bairro encontrado.";
                _response.Data = bairrosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Bairro(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetBairro")]
        public async Task<ActionResult<BairroDTO>> Get(int id)
        {
            try
            {
                var bairroDTO = await _bairroService.GetById(id);
                if (bairroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Bairro não encontrado!";
                    _response.Data = bairroDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Bairro " + bairroDTO.NomeBairro + " obtido com sucesso.";
                _response.Data = bairroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Bairro informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] BairroDTO bairroDTO)
        {
            if (bairroDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = bairroDTO;
                return BadRequest(_response);
            }
            bairroDTO.Id = 0;

            try
            {
                var cidadeDTO = await _cidadeService.GetById(bairroDTO.IdCidade);
                if (cidadeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Cidade informada não existe!";
                    _response.Data = new { errorIdCidade = "A Cidade informada não existe!" };
                    return NotFound(_response);
                }
                else if (await BairroExists(bairroDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Bairro " + bairroDTO.NomeBairro + " relacionado a Cidade " + cidadeDTO.NomeCidade + "!";
                    _response.Data = new { errorNomeBairro = "Já existe o Bairro " + bairroDTO.NomeBairro + " relacionado a Cidade " + cidadeDTO.NomeCidade + "!" };
                    return BadRequest(_response);
                }

                await _bairroService.Create(bairroDTO);

                _response.SetSuccess();
                _response.Message = "Bairro " + bairroDTO.NomeBairro + " cadastrado com sucesso.";
                _response.Data = bairroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Bairro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] BairroDTO bairroDTO)
        {
            if (bairroDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = bairroDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingBairroDTO = await _bairroService.GetById(bairroDTO.Id);
                if (existingBairroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Bairro informado não existe!";
                    _response.Data = new { errorId = "O Bairro informado não existe!" };
                    return NotFound(_response);
                }

                var cidadeDTO = await _cidadeService.GetById(bairroDTO.IdCidade);
                if (cidadeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Cidade informada não existe!";
                    _response.Data = new { errorIdCidade = "A Cidade informada não existe!" };
                    return NotFound(_response);
                }
                else if (await BairroExists(bairroDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe o Bairro " + bairroDTO.NomeBairro + " relacionado a Cidade " + cidadeDTO.NomeCidade + "!";
                    _response.Data = new { errorNomeBairro = "Já existe o Bairro " + bairroDTO.NomeBairro + " relacionado a Cidade " + cidadeDTO.NomeCidade + "!" };
                    return BadRequest(_response);
                }

                await _bairroService.Update(bairroDTO);

                _response.SetSuccess();
                _response.Message = "Bairro " + bairroDTO.NomeBairro + " alterado com sucesso.";
                _response.Data = bairroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Bairro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<BairroDTO>> Delete(int id)
        {
            try
            {
                var bairroDTO = await _bairroService.GetById(id);
                if (bairroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Bairro não encontrado!";
                    _response.Data = new { errorId = "Bairro não encontrado!" };
                    return NotFound(_response);
                }

                await _bairroService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Bairro " + bairroDTO.NomeBairro + " excluído com sucesso.";
                _response.Data = bairroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Bairro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> BairroExists(BairroDTO bairroDTO)
        {
            var bairrosDTO = await _bairroService.GetByCity(bairroDTO.IdCidade);
            return bairrosDTO.FirstOrDefault(b => b.Id != bairroDTO.Id && Operator.CompareString(b.NomeBairro, bairroDTO.NomeBairro)) is not null;
        }
    }
}