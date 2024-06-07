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
        private readonly IEstadoService _estadoService;
        private readonly ICidadeService _cidadeService;
        private readonly Response _response;

        public CidadeController(IEstadoService estadoService, ICidadeService cidadeService)
        {
            _estadoService = estadoService;
            _cidadeService = cidadeService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<CidadeDTO>>> Get()
        {
            try
            {
                var cidadesDTO = await _cidadeService.GetAll();
                _response.SetSuccess();
                _response.Message = cidadesDTO.Any() ?
                    "Lista da(s) Cidade(s) obtida com sucesso." :
                    "Nenhuma Cidade encontrada.";
                _response.Data = cidadesDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista da(s) Cidade(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetCidade")]
        public async Task<ActionResult<CidadeDTO>> Get(int id)
        {
            try
            {
                var cidadeDTO = await _cidadeService.GetById(id);
                if (cidadeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Cidade não encontrada!";
                    _response.Data = cidadeDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Cidade " + cidadeDTO.NomeCidade + " obtida com sucesso.";
                _response.Data = cidadeDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a Cidade informada!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] CidadeDTO cidadeDTO)
        {
            if (cidadeDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = cidadeDTO;
                return BadRequest(_response);
            }
            cidadeDTO.Id = 0;

            try
            {
                var estadoDTO = await _estadoService.GetById(cidadeDTO.IdEstado);
                if (estadoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Estado informado não existe!";
                    _response.Data = new { errorIdEstado = "O Estado informado não existe!" };
                    return NotFound(_response);
                }

                if (await CidadeExists(cidadeDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe a Cidade " + cidadeDTO.NomeCidade + " relacionada ao Estado " + estadoDTO.NomeEstado + "!";
                    _response.Data = new { errorNomeCidade = "Já existe a Cidade " + cidadeDTO.NomeCidade + " relacionada ao Estado " + estadoDTO.NomeEstado + "!" };
                    return BadRequest(_response);
                }

                await _cidadeService.Create(cidadeDTO);

                _response.SetSuccess();
                _response.Message = "Cidade " + cidadeDTO.NomeCidade + " cadastrada com sucesso.";
                _response.Data = cidadeDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar a Cidade!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] CidadeDTO cidadeDTO)
        {
            if (cidadeDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = cidadeDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingCidadeDTO = await _cidadeService.GetById(cidadeDTO.Id);
                if (existingCidadeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "A Cidade informada não existe!";
                    _response.Data = new { errorId = "A Cidade informada não existe!" };
                    return NotFound(_response);
                }

                var estadoDTO = await _estadoService.GetById(cidadeDTO.IdEstado);
                if (estadoDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Estado informado não existe!";
                    _response.Data = new { errorIdEstado = "O Estado informado não existe!" };
                    return NotFound(_response);
                }

                if (await CidadeExists(cidadeDTO))
                {
                    _response.SetConflict();
                    _response.Message = "Já existe a Cidade " + cidadeDTO.NomeCidade + " relacionada ao Estado " + estadoDTO.NomeEstado + "!";
                    _response.Data = new { errorNomeCidade = "Já existe a Cidade " + cidadeDTO.NomeCidade + " relacionada ao Estado " + estadoDTO.NomeEstado + "!" };
                    return BadRequest(_response);
                }

                await _cidadeService.Update(cidadeDTO);

                _response.SetSuccess();
                _response.Message = "Cidade " + cidadeDTO.NomeCidade + " alterada com sucesso.";
                _response.Data = cidadeDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar a Cidade!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<CidadeDTO>> Delete(int id)
        {
            try
            {
                var cidadeDTO = await _cidadeService.GetById(id);
                if (cidadeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Cidade não encontrada!";
                    _response.Data = new { errorId = "Cidade não encontrada!" };
                    return NotFound(_response);
                }

                await _cidadeService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Cidade " + cidadeDTO.NomeCidade + " excluída com sucesso.";
                _response.Data = cidadeDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir a Cidade!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private async Task<bool> CidadeExists(CidadeDTO cidadeDTO)
        {
            var cidadesDTO = await _cidadeService.GetByState(cidadeDTO.IdEstado);
            return cidadesDTO.FirstOrDefault(c => c.Id != cidadeDTO.Id && Operator.CompareString(c.NomeCidade, cidadeDTO.NomeCidade)) is not null;
        }
    }
}