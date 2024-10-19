using Microsoft.AspNetCore.Mvc;
using SGED.Context;
using SGED.Objects.DTOs.Entities;
using SGED.Services.Interfaces;
using SGED.Objects.Utilities;
using SGED.Services.Entities;
using System.Dynamic;
using SGED.Objects.Models.Entities;
using SGED.Services.Server.Attributes;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class UsuarioController : Controller
    {
        private readonly ITipoUsuarioService _tipoUsuarioService;
        private readonly IUsuarioService _usuarioService;
        private readonly Response _response;

        public UsuarioController(ITipoUsuarioService tipoUsuarioService, IUsuarioService usuarioService)
        {
            _tipoUsuarioService = tipoUsuarioService;
            _usuarioService = usuarioService;

            _response = new Response();
        }

        [HttpGet()]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> Get()
        {
            try
            {
                var usuariosDTO = await _usuarioService.GetAll();
                _response.SetSuccess();
                _response.Message = usuariosDTO.Any() ?
                    "Lista do(s) Usuário(s) obtida com sucesso." :
                    "Nenhum Usuário encontrado.";
                _response.Data = usuariosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Uso(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("GetAllNames")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetAllNames()
        {
            try
            {
                var usuariosDTO = await _usuarioService.GetAll();
                var registrationNumbers = usuariosDTO.Select(u => new { u.Id, u.NomePessoa }).ToList();

                _response.SetSuccess();
                _response.Message = registrationNumbers.Any() ?
                    "Lista dos Nomes de Usuário obtida com sucesso." :
                    "Nenhum Usuário encontrado.";
                _response.Data = registrationNumbers;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista dos Nomes de Usuário!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetUsuario")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<UsuarioDTO>> Get(int id)
        {
            try
            {
                var usuarioDTO = await _usuarioService.GetById(id);
                if (usuarioDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Usuário não encontrado!";
                    _response.Data = usuarioDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Usuário " + usuarioDTO.NomePessoa + " obtido com sucesso.";
                _response.Data = usuarioDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Usuário informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Post([FromBody] UsuarioDTO usuarioDTO)
        {
            if (usuarioDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = usuarioDTO;
                return BadRequest(_response);
            }
            usuarioDTO.Id = 0;
            usuarioDTO.EmailPessoa = usuarioDTO.EmailPessoa.ToLower();

            try
            {
                var result = await CheckExistRelationalData(usuarioDTO);
                dynamic errors = result.errors;
                bool hasErrors = result.hasErrors;

                if (!hasErrors)
                {
                    _response.SetNotFound();
                    _response.Message = "Dado(s) com conflito!";
                    _response.Data = errors;
                    return NotFound(_response);
                }

                ValidateDocuments(usuarioDTO, ref errors, ref hasErrors);

                if (!hasErrors)
                {
                    _response.SetInvalid();
                    _response.Message = "Dado(s) inválido(s)!";
                    _response.Data = errors;
                    return BadRequest(_response);
                }

                var usuariosDTO = await _usuarioService.GetAll();
                CheckDuplicates(usuariosDTO, usuarioDTO, ref errors, ref hasErrors);

                if (hasErrors)
                {
                    await _usuarioService.Create(usuarioDTO);

                    _response.SetSuccess();
                    _response.Message = "Usuário " + usuarioDTO.NomePessoa + " cadastrado com sucesso.";
                    _response.Data = usuarioDTO;
                    return Ok(_response);
                }
                else
                {
                    _response.SetConflict();
                    _response.Message = "Dado(s) com conflito!";
                    _response.Data = errors;
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Usuário!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult> Put([FromBody] UsuarioDTO usuarioDTO)
        {
            if (usuarioDTO is null || usuarioDTO.Id == 1)
            {
                _response.SetNotFound();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = usuarioDTO;
                return BadRequest(_response);
            }
            usuarioDTO.EmailPessoa = usuarioDTO.EmailPessoa.ToLower();

            try
            {
                var existingUsuario = await _usuarioService.GetById(usuarioDTO.Id);
                if (existingUsuario is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Dado(s) com conflito!";
                    _response.Data = new { errorId = "O Usuário informado não existe!" };
                    return NotFound(_response);
                }

                var result = await CheckExistRelationalData(usuarioDTO);
                dynamic errors = result.errors;
                bool hasErrors = result.hasErrors;

                if (!hasErrors)
                {
                    _response.SetNotFound();
                    _response.Message = "Dado(s) com conflito!";
                    _response.Data = errors;
                    return NotFound(_response);
                }

                ValidateDocuments(usuarioDTO, ref errors, ref hasErrors);

                if (!hasErrors)
                {
                    _response.SetInvalid();
                    _response.Message = "Dado(s) inválido(s)!";
                    _response.Data = errors;
                    return BadRequest(_response);
                }

                var usuariosDTO = await _usuarioService.GetAll();
                CheckDuplicates(usuariosDTO, usuarioDTO, ref errors, ref hasErrors);

                if (hasErrors)
                {
                    await _usuarioService.Update(usuarioDTO);

                    _response.SetSuccess();
                    _response.Message = "Usuário " + usuarioDTO.NomePessoa + " alterado com sucesso.";
                    _response.Data = usuarioDTO;
                    return Ok(_response);
                }
                else
                {
                    _response.SetConflict();
                    _response.Message = "Dado(s) com conflito!";
                    _response.Data = errors;
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Usuário!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        [AccessPermission("A", "B", "C")]
        public async Task<ActionResult<UsuarioDTO>> Delete(int id)
        {
            try
            {
                var usuarioDTO = await _usuarioService.GetById(id);
                if (usuarioDTO is null || usuarioDTO.Id == 1)
                {
                    _response.SetNotFound();
                    _response.Message = "Usuário não encontrado!";
                    _response.Data = new { errorId = "Usuário não encontrado!" };
                    return NotFound(_response);
                }

                await _usuarioService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Usuário " + usuarioDTO.NomePessoa + " excluído com sucesso.";
                _response.Data = usuarioDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Usuário!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private static void ValidateDocuments(UsuarioDTO usuarioDTO, ref dynamic errors, ref bool hasErrors)
        {
            if (!usuarioDTO.Email())
            {
                errors.errorEmailPessoa = "E-mail inválido!";
                hasErrors = true;
            }

            int response = usuarioDTO.CpfCnpj();
            switch (response)
            {
                case 0:
                    errors.errorCpfCnpjPessoa = "Documento incompleto!";
                    hasErrors = true;
                    break;
                case -1:
                    errors.errorCpfCnpjPessoa = "CPF inválido!";
                    hasErrors = true;
                    break;
                case -2:
                    errors.errorCpfCnpjPessoa = "CNPJ inválido!";
                    hasErrors = true;
                    break;
            }

            response = usuarioDTO.RgIe();
            switch (response)
            {
                case 0:
                    errors.errorRgIePessoa = "Documento incompleto!";
                    hasErrors = true;
                    break;
                case -1:
                    errors.errorRgIePessoa = "RG inválido!";
                    hasErrors = true;
                    break;
                case -2:
                    errors.errorRgIePessoa = "IE inválido!";
                    hasErrors = true;
                    break;
            }
        }

        private static void CheckDuplicates(IEnumerable<UsuarioDTO> usuariosDTO, UsuarioDTO usuarioDTO, ref dynamic errors, ref bool hasErrors)
        {
            foreach (var usuario in usuariosDTO)
            {
                if (usuario.Id == usuarioDTO.Id)
                {
                    continue;
                }

                if (Operator.CompareString(usuarioDTO.EmailPessoa, usuario.EmailPessoa))
                {
                    errors.errorEmailPessoa = "O e-mail informado já existe!";
                    hasErrors = true;
                }

                if (Operator.CompareString(usuarioDTO.CpfCnpjPessoa.ExtractNumbers(), usuario.CpfCnpjPessoa.ExtractNumbers()))
                {
                    errors.errorCpfCnpjPessoa = usuarioDTO.CpfCnpjPessoa.Length == 14 ? "O CPF informado já existe!" : "O CNPJ informado já existe!";
                    hasErrors = true;
                }

                if (Operator.CompareString(usuarioDTO.RgIePessoa.ExtractNumbers(), usuario.RgIePessoa.ExtractNumbers()))
                {
                    errors.errorRgIePessoa = usuarioDTO.RgIePessoa.Length == 12 ? "O RG informado já existe!" : "O IE informado já existe!";
                    hasErrors = true;
                }
            }

            if (Operator.CompareString(usuarioDTO.EmailPessoa, "devops@development.com"))
            {
                errors.errorEmailPessoa = "O e-mail informado já existe!";
                hasErrors = true;
            }
        }

        private async Task<dynamic> CheckExistRelationalData(UsuarioDTO usuarioDTO)
        {
            dynamic errors = new ExpandoObject();
            bool hasErrors = false;

            if (await _tipoUsuarioService.GetById(usuarioDTO.IdTipoUsuario) is not null)
            {
                errors.errorIdTipoUsuario = "O Tipo Usuário informado não existe!";
                hasErrors = true;
            }

            return new { errors = errors, hasErrors = hasErrors };
        }
    }
}
