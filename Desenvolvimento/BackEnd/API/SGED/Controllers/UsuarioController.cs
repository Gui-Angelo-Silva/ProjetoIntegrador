using Microsoft.AspNetCore.Mvc;
using SGED.Context;
using SGED.Objects.DTO.Entities;
using SGED.Services.Interfaces;
using SGED.Objects.Utilities;
using SGED.Services.Entities;

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

        [HttpGet("{id:int}", Name = "GetUsuario")]
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
                var tipoUsuarioDTO = await _tipoUsuarioService.GetById(usuarioDTO.IdTipoUsuario);
                if (tipoUsuarioDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo Usuário informado não existe!";
                    _response.Data = new { errorIdTipoUsuario = "O Tipo Usuário informado não existe!" };
                    return NotFound(_response);
                }

                string email = "";
                string cpfcnpj = "";
                string rgie = "";

                ValidateDocuments(usuarioDTO, ref email, ref cpfcnpj, ref rgie);

                if (!string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(cpfcnpj) || !string.IsNullOrEmpty(rgie))
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email)) error += "e-mail";
                    if (!string.IsNullOrEmpty(cpfcnpj)) error += string.IsNullOrEmpty(error) ? "" : ", " + (usuarioDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
                    if (!string.IsNullOrEmpty(rgie)) error += string.IsNullOrEmpty(error) ? "" : ", " + (usuarioDTO.RgIePessoa.Length == 12 ? "RG" : "IE");

                    _response.SetInvalid();
                    _response.Message = $"O {error} informado(s) está(ão) inválido(s)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }

                var usuariosDTO = await _usuarioService.GetAll();
                CheckDuplicates(usuariosDTO, usuarioDTO, ref email, ref cpfcnpj, ref rgie);

                if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(cpfcnpj) && string.IsNullOrEmpty(rgie))
                {
                    await _usuarioService.Create(usuarioDTO);

                    _response.SetSuccess();
                    _response.Message = "Usuário " + usuarioDTO.NomePessoa + " cadastrado com sucesso.";
                    _response.Data = usuarioDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = GenerateErrorMessage(email, cpfcnpj, rgie, usuarioDTO);

                    _response.SetConflict();
                    _response.Message = $"O {error} informado(s) já existe(m)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
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
                    _response.Message = "O Usuário informado não existe!";
                    _response.Data = new { errorId = "O Usuário informado não existe!" };
                    return NotFound(_response);
                }

                var tipoUsuarioDTO = await _tipoUsuarioService.GetById(usuarioDTO.IdTipoUsuario);
                if (tipoUsuarioDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Tipo Usuário informado não existe!";
                    _response.Data = new { errorIdTipoUsuario = "O Tipo Usuário informado não existe!" };
                    return NotFound(_response);
                }

                string email = "";
                string cpfcnpj = "";
                string rgie = "";

                ValidateDocuments(usuarioDTO, ref email, ref cpfcnpj, ref rgie);

                if (!string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(cpfcnpj) || !string.IsNullOrEmpty(rgie))
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email)) error += "e-mail";
                    if (!string.IsNullOrEmpty(cpfcnpj)) error += string.IsNullOrEmpty(error) ? "" : ", " + (usuarioDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
                    if (!string.IsNullOrEmpty(rgie)) error += string.IsNullOrEmpty(error) ? "" : ", " + (usuarioDTO.RgIePessoa.Length == 12 ? "RG" : "IE");

                    _response.SetInvalid();
                    _response.Message = $"O {error} informado(s) está(ão) inválido(s)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }

                var usuariosDTO = await _usuarioService.GetAll();
                CheckDuplicates(usuariosDTO, usuarioDTO, ref email, ref cpfcnpj, ref rgie);

                if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(cpfcnpj) && string.IsNullOrEmpty(rgie))
                {
                    await _usuarioService.Update(usuarioDTO);

                    _response.SetSuccess();
                    _response.Message = "Usuário " + usuarioDTO.NomePessoa + " alterado com sucesso.";
                    _response.Data = usuarioDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = GenerateErrorMessage(email, cpfcnpj, rgie, usuarioDTO);

                    _response.SetConflict();
                    _response.Message = $"O {error} informado(s) já existe(m)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
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

        private void ValidateDocuments(UsuarioDTO usuarioDTO, ref string email, ref string cpfcnpj, ref string rgie)
        {
            if (!usuarioDTO.Email())
            {
                email = "E-mail inválido!";
            }
            else if (Operator.CompareString(usuarioDTO.EmailPessoa, "devops@development.com"))
            {
                email = "O e-mail informado já existe!";
            }

            int response = usuarioDTO.CpfCnpj();
            switch (response)
            {
                case 0:
                    cpfcnpj = "Documento incompleto!";
                    break;
                case -1:
                    cpfcnpj = "CPF inválido!";
                    break;
                case -2:
                    cpfcnpj = "CNPJ inválido!";
                    break;
            }

            response = usuarioDTO.RgIe();
            switch (response)
            {
                case 0:
                    rgie = "Documento incompleto!";
                    break;
                case -1:
                    rgie = "RG inválido!";
                    break;
                case -2:
                    rgie = "IE inválido!";
                    break;
            }
        }

        private void CheckDuplicates(IEnumerable<UsuarioDTO> usuariosDTO, UsuarioDTO usuarioDTO, ref string email, ref string cpfcnpj, ref string rgie)
        {
            foreach (var usuario in usuariosDTO)
            {
                if (usuario.Id == usuarioDTO.Id)
                {
                    continue;
                }

                if (Operator.CompareString(usuarioDTO.EmailPessoa, usuario.EmailPessoa))
                {
                    email = "O e-mail informado já existe!";
                }

                if (Operator.CompareString(usuarioDTO.CpfCnpjPessoa.ExtractNumbers(), usuario.CpfCnpjPessoa.ExtractNumbers()))
                {
                    cpfcnpj = usuarioDTO.CpfCnpjPessoa.Length == 14 ? "O CPF informado já existe!" : "O CNPJ informado já existe!";
                }

                if (Operator.CompareString(usuarioDTO.RgIePessoa.ExtractNumbers(), usuario.RgIePessoa.ExtractNumbers()))
                {
                    rgie = usuarioDTO.RgIePessoa.Length == 12 ? "O RG informado já existe!" : "O IE informado já existe!";
                }
            }
        }

        private string GenerateErrorMessage(string email, string cpfcnpj, string rgie, UsuarioDTO usuarioDTO)
        {
            string error = "";
            if (!string.IsNullOrEmpty(email)) error += "e-mail";
            if (!string.IsNullOrEmpty(cpfcnpj)) error += (error == "" ? "" : ", ") + (usuarioDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
            if (!string.IsNullOrEmpty(rgie)) error += (error == "" ? "" : ", ") + (usuarioDTO.RgIePessoa.Length == 12 ? "RG" : "IE");
            return error;
        }
    }
}
