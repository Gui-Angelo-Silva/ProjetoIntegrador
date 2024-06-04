using Microsoft.AspNetCore.Mvc;
using SGED.Services.Interfaces;
using SGED.Objects.Interfaces;
using SGED.Objects.Models.Entities;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Utilities;
using SGED.Services.Entities;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoProcessoController : Controller
    {
        private readonly ITipoProcessoService _tipoProcessoService;
        private readonly Response _response;

        public TipoProcessoController(ITipoProcessoService tipoProcessoService)
        {
            _tipoProcessoService = tipoProcessoService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoProcessoDTO>>> GetAll()
        {
            try
            {
                var tipoProcessos = await _tipoProcessoService.GetAll();
                _response.SetSuccess(); _response.Data = tipoProcessos;
                _response.Message = tipoProcessos.Any() ?
                    "Lista do(s) Tipo(s) Processo obtida com sucesso." :
                    "Nenhum Tipo Processo encontrado.";
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível alterar o Uso!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id}", Name = "GetTipoProcesso")]
        public async Task<ActionResult<TipoProcessoDTO>> GetById(int id)
        {
            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
                if (tipoProcessoDTO == null)
                {
                    _response.SetNotFound(); _response.Message = "Tipo Processo não encontrado!"; _response.Data = tipoProcessoDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess(); _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " obtido com sucesso."; _response.Data = tipoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível alterar o Uso!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoProcessoDTO tipoProcessoDTO)
        {
            if (tipoProcessoDTO == null)
            {
                _response.SetInvalid(); _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }

            try
            {
                var tipoProcessos = await _tipoProcessoService.GetAll();

                if (tipoProcessos.FirstOrDefault(tipoprocesso => tipoprocesso.NomeTipoProcesso == tipoProcessoDTO.NomeTipoProcesso) != null)
                {
                    _response.SetConflict(); _response.Message = "Já existe o Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!"; _response.Data = tipoProcessoDTO;
                    return BadRequest(_response);
                }
                else
                {
                    tipoProcessoDTO.EnableAllOperations();
                    await _tipoProcessoService.Create(tipoProcessoDTO);

                    _response.SetSuccess(); _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " cadastrado com sucesso."; _response.Data = tipoProcessoDTO;
                    return Ok(_response);

                    //return CreatedAtRoute("GetTipoProcesso", new { id = tipoProcessoDTO.Id }, tipoProcessoDTO);
                }
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível alterar o Uso!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoProcessoDTO tipoProcessoDTO)
        {
            if (tipoProcessoDTO == null)
            {
                _response.SetInvalid(); _response.Message = "Dado(s) inválido(s)!"; _response.Data = tipoProcessoDTO;
                return BadRequest(_response);
            }

            try
            {
                var existingTipoProcesso = await _tipoProcessoService.GetById(tipoProcessoDTO.Id);
                if (existingTipoProcesso == null)
                {
                    _response.SetNotFound(); _response.Message = "Não existe o Tipo Processo informado!"; _response.Data = tipoProcessoDTO;
                    return BadRequest(_response);
                }
                else if (!existingTipoProcesso.CanEdit())
                {
                    _response.SetConflict(); _response.Message = "Não é possível alterar o Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " pois está " + tipoProcessoDTO.GetState().ToLower() + "!"; _response.Data = tipoProcessoDTO;
                    return BadRequest(_response);
                }

                var tipoProcessos = await _tipoProcessoService.GetAll();
                tipoProcessos = tipoProcessos.Where(tp => tp.Id != tipoProcessoDTO.Id);

                if (tipoProcessos.FirstOrDefault(tp => tp.NomeTipoProcesso == tipoProcessoDTO.NomeTipoProcesso) != null)
                {
                    _response.SetConflict(); _response.Message = "Já existe o Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + "!"; _response.Data = tipoProcessoDTO;
                    return BadRequest(_response);
                }
                else
                {
                    tipoProcessoDTO.EnableAllOperations();
                    await _tipoProcessoService.Update(tipoProcessoDTO);

                    _response.SetSuccess(); _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " alterado com sucesso."; _response.Data = tipoProcessoDTO;
                    return Ok(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível alterar o uso!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id}/Ativar")]
        public async Task<ActionResult<TipoProcessoDTO>> Activity(int id)
        {
            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
                if (tipoProcessoDTO == null)
                {
                    _response.SetNotFound(); _response.Message = "Tipo Processo não encontrado!"; _response.Data = tipoProcessoDTO;
                    return NotFound(_response);
                }

                if (tipoProcessoDTO.Status != )
                {
                    tipoProcessoDTO.EnableAllOperations();
                    await _tipoProcessoService.Update(tipoProcessoDTO);
                }

                _response.SetSuccess(); _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " ativado com sucesso."; _response.Data = tipoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível alterar o Uso!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut("{id}/Desativar")]
        public async Task<ActionResult<TipoProcessoDTO>> Desactivity(int id)
        {
            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
                if (tipoProcessoDTO == null)
                {
                    _response.SetNotFound(); _response.Message = "Tipo Processo não encontrado!"; _response.Data = tipoProcessoDTO;
                    return NotFound(_response);
                }

                if (tipoProcessoDTO.Status)
                {
                    tipoProcessoDTO.DisableAllOperations();
                    await _tipoProcessoService.Update(tipoProcessoDTO);
                }

                _response.SetSuccess(); _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " desativado com sucesso."; _response.Data = tipoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível alterar o Uso!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoProcessoDTO>> Delete(int id)
        {
            try
            {
                var tipoProcessoDTO = await _tipoProcessoService.GetById(id);
                if (tipoProcessoDTO == null)
                {
                    _response.SetNotFound(); _response.Message = "Tipo Processo não encontrado!"; _response.Data = tipoProcessoDTO;
                    return NotFound(_response);
                }
                if (!tipoProcessoDTO.Status)
                {
                    _response.SetConflict(); _response.Message = "O Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " está desabilitado para exclusão!"; _response.Data = tipoProcessoDTO;
                    return BadRequest(_response);
                }

                await _tipoProcessoService.Remove(id);

                _response.SetSuccess(); _response.Message = "Tipo Processo " + tipoProcessoDTO.NomeTipoProcesso + " excluído com sucesso."; _response.Data = tipoProcessoDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível alterar o Uso!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }
    }
}
