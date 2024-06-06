using Microsoft.AspNetCore.Mvc;
using SGED.Context;
using SGED.Objects.Interfaces.Pessoa;
using SGED.Objects.DTO.Entities;
using SGED.Services.Interfaces;
using SGED.Objects.Utilities;
using SGED.Services.Entities;

namespace SGED.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MunicipeController : Controller
    {

        private readonly IMunicipeService _municipeService;
        private readonly Response _response;

        public MunicipeController(IMunicipeService municipeService)
        {
            _municipeService = municipeService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<MunicipeDTO>>> Get()
        {
            try
            {
                var municipesDTO = await _municipeService.GetAll();
                _response.SetSuccess();
                _response.Message = municipesDTO.Any() ?
                    "Lista do(s) Munícipe(s) obtida com sucesso." :
                    "Nenhum Municipe encontrado.";
                _response.Data = municipesDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Munícipe(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetMunicipe")]
        public async Task<ActionResult<MunicipeDTO>> Get(int id)
        {
            try
            {
                var municipeDTO = await _municipeService.GetById(id);
                if (municipeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Munícipe não encontrado!";
                    _response.Data = municipeDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Munícipe " + municipeDTO.NomePessoa + " obtido com sucesso.";
                _response.Data = municipeDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Munícipe informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] MunicipeDTO municipeDTO)
        {
            if (municipeDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = municipeDTO;
                return BadRequest(_response);
            }
            municipeDTO.EmailPessoa = municipeDTO.EmailPessoa.ToLower();

            try
            {
                string email = "";
                string cpfcnpj = "";
                string rgie = "";

                ValidateDocuments(municipeDTO, ref email, ref cpfcnpj, ref rgie);

                if (!string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(cpfcnpj) || !string.IsNullOrEmpty(rgie))
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email)) error += "e-mail";
                    if (!string.IsNullOrEmpty(cpfcnpj)) error += string.IsNullOrEmpty(error) ? "" : ", " + (municipeDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
                    if (!string.IsNullOrEmpty(rgie)) error += string.IsNullOrEmpty(error) ? "" : ", " + (municipeDTO.RgIePessoa.Length == 12 ? "RG" : "IE");

                    _response.SetInvalid();
                    _response.Message = $"O {error} informado(s) está(ão) inválido(s)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }

                var municipesDTO = await _municipeService.GetAll();

                if (municipesDTO is not null && municipesDTO.Any())
                {
                    CheckDuplicates(municipesDTO, municipeDTO, ref email, ref cpfcnpj, ref rgie);
                }

                if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(cpfcnpj) && string.IsNullOrEmpty(rgie))
                {
                    await _municipeService.Create(municipeDTO);

                    _response.SetSuccess();
                    _response.Message = "Munícipe " + municipeDTO.NomePessoa + " cadastrado com sucesso.";
                    _response.Data = municipeDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = GenerateErrorMessage(email, cpfcnpj, rgie, municipeDTO);
                    _response.SetConflict();
                    _response.Message = $"O {error} informado(s) já existe(m)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Munícipe!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] MunicipeDTO municipeDTO)
        {
            if (municipeDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = municipeDTO;
                return BadRequest(_response);
            }
            municipeDTO.EmailPessoa = municipeDTO.EmailPessoa.ToLower();

            try
            {
                var existingMunicipe = await _municipeService.GetById(municipeDTO.Id);
                if (existingMunicipe is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Munícipe informado não existe!";
                    _response.Data = new { errorId = "O Munícipe informado não existe!" };
                    return NotFound(_response);
                }

                string email = "";
                string cpfcnpj = "";
                string rgie = "";

                ValidateDocuments(municipeDTO, ref email, ref cpfcnpj, ref rgie);

                if (!string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(cpfcnpj) || !string.IsNullOrEmpty(rgie))
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email)) error += "e-mail";
                    if (!string.IsNullOrEmpty(cpfcnpj)) error += string.IsNullOrEmpty(error) ? "" : ", " + (municipeDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
                    if (!string.IsNullOrEmpty(rgie)) error += string.IsNullOrEmpty(error) ? "" : ", " + (municipeDTO.RgIePessoa.Length == 12 ? "RG" : "IE");

                    _response.SetError();
                    _response.Message = $"O {error} informado(s) está(ão) inválido(s)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }

                var municipesDTO = await _municipeService.GetAll();
                municipesDTO = municipesDTO.Where(u => u.Id != municipeDTO.Id).ToList();

                if (municipesDTO is not null && municipesDTO.Any())
                {
                    CheckDuplicates(municipesDTO, municipeDTO, ref email, ref cpfcnpj, ref rgie);
                }

                if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(cpfcnpj) && string.IsNullOrEmpty(rgie))
                {
                    await _municipeService.Update(municipeDTO);

                    _response.SetSuccess();
                    _response.Message = "Munícipe " + municipeDTO.NomePessoa + " alterado com sucesso.";
                    _response.Data = municipeDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = GenerateErrorMessage(email, cpfcnpj, rgie, municipeDTO);
                    _response.SetConflict();
                    _response.Message = $"O {error} informado(s) já existe(m)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Munícipe!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<MunicipeDTO>> Delete(int id)
        {
            try
            {
                var municipeDTO = await _municipeService.GetById(id);
                if (municipeDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Munícipe não encontrado!";
                    _response.Data = new { errorId = "Municipe não encontrado!" };
                    return NotFound(_response);
                }

                await _municipeService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Munícipe " + municipeDTO.NomePessoa + " excluído com sucesso.";
                _response.Data = municipeDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Munícipe!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private void ValidateDocuments(MunicipeDTO municipeDTO, ref string email, ref string cpfcnpj, ref string rgie)
        {
            if (!municipeDTO.Email())
            {
                email = "E-mail inválido!";
            }
            else if (Operator.CompareString(municipeDTO.EmailPessoa, "devops@development.com"))
            {
                email = "O e-mail informado já existe!";
            }

            int response = municipeDTO.CpfCnpj();
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

            response = municipeDTO.RgIe();
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

        private void CheckDuplicates(IEnumerable<MunicipeDTO> municipesDTO, MunicipeDTO municipeDTO, ref string email, ref string cpfcnpj, ref string rgie)
        {
            foreach (var municipe in municipesDTO)
            {
                if (Operator.CompareString(municipeDTO.EmailPessoa, municipe.EmailPessoa))
                {
                    email = "O e-mail informado já existe!";
                }

                if (Operator.CompareString(municipeDTO.CpfCnpjPessoa.ExtractNumbers(), municipe.CpfCnpjPessoa.ExtractNumbers()))
                {
                    cpfcnpj = municipeDTO.CpfCnpjPessoa.Length == 14 ? "O CPF informado já existe!" : "O CNPJ informado já existe!";
                }

                if (Operator.CompareString(municipeDTO.RgIePessoa.ExtractNumbers(), municipe.RgIePessoa.ExtractNumbers()))
                {
                    rgie = municipeDTO.RgIePessoa.Length == 12 ? "O RG informado já existe!" : "O IE informado já existe!";
                }
            }
        }

        private string GenerateErrorMessage(string email, string cpfcnpj, string rgie, MunicipeDTO municipeDTO)
        {
            string error = "";
            if (!string.IsNullOrEmpty(email)) error += "e-mail";
            if (!string.IsNullOrEmpty(cpfcnpj)) error += (error == "" ? "" : ", ") + (municipeDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
            if (!string.IsNullOrEmpty(rgie)) error += (error == "" ? "" : ", ") + (municipeDTO.RgIePessoa.Length == 12 ? "RG" : "IE");
            return error;
        }
    }
}
