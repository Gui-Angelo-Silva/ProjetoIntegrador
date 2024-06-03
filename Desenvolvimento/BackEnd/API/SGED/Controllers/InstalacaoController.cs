using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using Google.Protobuf;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class InstalacaoController : Controller
    {
        private readonly IInfraestruturaService _infraestruturaService;
        private readonly IImovelService _imovelService;
        private readonly IEngenheiroService _engenheiroService;
        private readonly IInstalacaoService _instalacaoService;
        private readonly Response _response;

        public InstalacaoController(IInfraestruturaService infraestruturaService, IInstalacaoService instalacaoService)
        {
            _infraestruturaService = infraestruturaService;
            _instalacaoService = instalacaoService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<InstalacaoDTO>>> Get()
        {
            try
            {
                var instalacaosDTO = await _instalacaoService.GetAll();
                _response.SetSuccess(); _response.Data = instalacaosDTO;
                _response.Message = instalacaosDTO.Any() ?
                    "Lista da(s) Instalação(ões) obtida com sucesso." :
                    "Nenhuma Instalacao encontrada.";
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível adquirir a lista da(s) Instalação(ões)!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id}", Name = "GetInstalacao")]
        public async Task<ActionResult<InstalacaoDTO>> Get(int id)
        {
            try
            {
                var instalacaoDTO = await _instalacaoService.GetById(id);
                if (instalacaoDTO is null)
                {
                    _response.SetNotFound(); _response.Message = "Instalação não encontrada!"; _response.Data = instalacaoDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess(); _response.Message = "Instalação obtida com sucesso."; _response.Data = instalacaoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível adquirir a Instalação informada!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] InstalacaoDTO instalacaoDTO)
        {
            if (instalacaoDTO is null)
            {
                _response.SetInvalid(); _response.Message = "Dado(s) inválido(s)!"; _response.Data = instalacaoDTO;
                return BadRequest(_response);
            }

            try
            {
                string message = "";

                var infraestruturaDTO = await _infraestruturaService.GetById(instalacaoDTO.IdInfraestrutura);
                if (infraestruturaDTO is null)
                {
                    message = "A Infraestrutura informada";
                }

                var imovelDTO = await _imovelService.GetById(instalacaoDTO.IdImovel);
                if (imovelDTO is null)
                {
                    if (!string.IsNullOrEmpty(message))
                    {
                        message += ", o Imóvel informado";
                    }
                    else
                    {
                        message = "O Imóvel informado";
                    }
                }

                if (instalacaoDTO.IdEngenheiro != 0)
                {
                    var engenheiroDTO = await _engenheiroService.GetById(instalacaoDTO.IdEngenheiro);
                    if (engenheiroDTO is null)
                    {
                        if (!string.IsNullOrEmpty(message))
                        {
                            message += " e o Engenheiro informado";
                        }
                        else
                        {
                            message = "O Engenheiro informado";
                        }
                    }
                }

                if (!string.IsNullOrEmpty(message))
                {
                    _response.SetNotFound(); _response.Message = message + " não existe(m)!"; _response.Data = instalacaoDTO;
                    return NotFound(_response);
                }

                await _instalacaoService.Create(instalacaoDTO);

                _response.SetSuccess(); _response.Message = "Instalação de " + infraestruturaDTO.NomeInfraestrutura + " do Imóvel " + imovelDTO.InscricaoCadastral + " cadastrada com sucesso."; _response.Data = instalacaoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível cadastrar a Instalação!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] InstalacaoDTO instalacaoDTO)
        {
            if (instalacaoDTO is null)
            {
                _response.SetInvalid(); _response.Message = "Dado(s) inválido(s)!"; _response.Data = instalacaoDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingInstalacaoDTO = await _instalacaoService.GetById(instalacaoDTO.Id);
                if (existingInstalacaoDTO is null)
                {
                    _response.SetNotFound(); _response.Message = "A Instalação informada não existe!"; _response.Data = instalacaoDTO;
                    return NotFound(_response);
                }

                string message = "";

                var infraestruturaDTO = await _infraestruturaService.GetById(instalacaoDTO.IdInfraestrutura);
                if (infraestruturaDTO is null)
                {
                    message = "A Infraestrutura informada";
                }

                var imovelDTO = await _imovelService.GetById(instalacaoDTO.IdImovel);
                if (imovelDTO is null)
                {
                    if (!string.IsNullOrEmpty(message))
                    {
                        message += ", o Imóvel informado";
                    }
                    else
                    {
                        message = "O Imóvel informado";
                    }
                }

                if (instalacaoDTO.IdEngenheiro != 0)
                {
                    var engenheiroDTO = await _engenheiroService.GetById(instalacaoDTO.IdEngenheiro);
                    if (engenheiroDTO is null)
                    {
                        if (!string.IsNullOrEmpty(message))
                        {
                            message += " e o Engenheiro informado";
                        }
                        else
                        {
                            message = "O Engenheiro informado";
                        }
                    }
                }

                if (!string.IsNullOrEmpty(message))
                {
                    _response.SetNotFound(); _response.Message = message + " não existe(m)!"; _response.Data = instalacaoDTO;
                    return NotFound(_response);
                }

                await _instalacaoService.Update(instalacaoDTO);

                _response.SetSuccess(); _response.Message = "Instalação de " + infraestruturaDTO.NomeInfraestrutura + " do Imóvel " + imovelDTO.InscricaoCadastral + " alterada com sucesso."; _response.Data = instalacaoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível alterar a Instalação!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<InstalacaoDTO>> Delete(int id)
        {
            try
            {
                var instalacaoDTO = await _instalacaoService.GetById(id);
                if (instalacaoDTO is null)
                {
                    _response.SetNotFound(); _response.Message = "Instalação não encontrada!"; _response.Data = instalacaoDTO;
                    return NotFound(_response);
                }

                await _instalacaoService.Remove(id);

                _response.SetSuccess(); _response.Message = "Instalação excluída com sucesso."; _response.Data = instalacaoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível excluir a Instalação!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }
    }
}