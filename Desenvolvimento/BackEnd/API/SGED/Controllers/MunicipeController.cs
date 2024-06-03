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

        public MunicipeController(IMunicipeService municipeService, AppDBContext context)
        {
            _municipeService = municipeService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MunicipeDTO>>> Get()
        {
            try
            {
                var municipesDTO = await _municipeService.GetAll();
                _response.SetSuccess(); _response.Data = municipesDTO;
                _response.Message = municipesDTO.Any() ?
                    "Lista do(s) Munícipe(s) obtida com sucesso." :
                    "Nenhum Munícipe encontrado.";
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível cadastrar a Logradouro!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id}", Name = "GetMunicipe")]
        public async Task<ActionResult<MunicipeDTO>> Get(int id)
        {
            try
            {
                var municipeDTO = await _municipeService.GetById(id);
                if (municipeDTO == null)
                {
                    _response.SetNotFound(); _response.Message = "Munícipe não encontrado!"; _response.Data = municipeDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess(); _response.Message = "Munícipe " + municipeDTO.NomePessoa + " obtido com sucesso."; _response.Data = municipeDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível cadastrar a Logradouro!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] MunicipeDTO municipeDTO)
        {
            if (municipeDTO == null)
            {
                _response.SetInvalid(); _response.Message = "Dado(s) inválido(s)!"; _response.Data = municipeDTO;
                return BadRequest(_response);
            }
            municipeDTO.EmailPessoa = municipeDTO.EmailPessoa.ToLower();

            try
            {
                var municipesDTO = await _municipeService.GetAll();

                string email = "";
                string cpfcnpj = "";
                string rgie = "";

                int response = municipeDTO.CpfCnpj();
                if (response == 0) cpfcnpj = "Documento incompleto!";
                else if (response == -1) cpfcnpj = "CPF inválido!";
                else if (response == -2) cpfcnpj = "CNPJ inválido!";

                response = municipeDTO.RgIe();
                if (response == 0) rgie = "Documento incompleto!";
                else if (response == -1) rgie = "RG inválido!";
                else if (response == -2) rgie = "IE inválido!";

                if (municipesDTO is not null)
                {
                    string existCpfCnpj = "";
                    string existRgIe = "";

                    foreach (var municipe in municipesDTO)
                    {
                        if (municipeDTO.EmailPessoa == municipe.EmailPessoa) email = "O e-mail informado já existe!";

                        if (municipeDTO.CpfCnpjPessoa == municipe.CpfCnpjPessoa)
                        {
                            if (municipeDTO.CpfCnpjPessoa.Length == 14) existCpfCnpj = "O CPF informado já existe!";
                            else existCpfCnpj = "O CNPJ informado já existe!";
                        };

                        if (municipeDTO.RgIePessoa == municipe.RgIePessoa)
                        {
                            if (municipeDTO.RgIePessoa.Length == 12) existRgIe = "O RG informado já existe!";
                            else existRgIe = "O IE informado já existe!";
                        };
                    }

                    if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
                    if (rgie == "") rgie = existRgIe;
                }

                if (email == "" && cpfcnpj == "" && rgie == "")
                {
                    await _municipeService.Create(municipeDTO);

                    _response.SetSuccess(); _response.Message = "Munícipe " + municipeDTO.NomePessoa + " cadastrado com sucesso."; _response.Data = municipeDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email))
                    {
                        error = "e-mail";
                    }
                    if (!string.IsNullOrEmpty(cpfcnpj))
                    {
                        if (!string.IsNullOrEmpty(error)) error += ", ";

                        if (municipeDTO.CpfCnpjPessoa.Length == 14) error += "CPF";
                        else error += "CNPJ";
                    }
                    if (!string.IsNullOrEmpty(rgie))
                    {
                        if (!string.IsNullOrEmpty(error)) error += ", ";

                        if (municipeDTO.CpfCnpjPessoa.Length == 12) error += "RG";
                        else error += "IE";
                    }

                    _response.SetConflict(); _response.Message = $"O {error} informado(s) já existe(m)!"; _response.Data = new { email, cpfcnpj, rgie };
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível cadastrar a Logradouro!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] MunicipeDTO municipeDTO)
        {
            if (municipeDTO is null)
            {
                _response.SetInvalid(); _response.Message = "Dado(s) inválido(s)!"; _response.Data = municipeDTO;
                return BadRequest(_response);
            }
            municipeDTO.EmailPessoa = municipeDTO.EmailPessoa.ToLower();

            try
            {
                var existingMunicipe = await _municipeService.GetById(municipeDTO.Id);
                if (existingMunicipe == null)
                {
                    _response.SetNotFound(); _response.Message = "O Munícipe informado não existe!"; _response.Data = municipeDTO;
                    return NotFound(_response);
                }

                municipeDTO.EmailPessoa = municipeDTO.EmailPessoa.ToLower();

                var municipesDTO = await _municipeService.GetAll();
                municipesDTO = municipesDTO.Where(u => u.Id != municipeDTO.Id);

                string email = "";
                string cpfcnpj = "";
                string rgie = "";

                int response = municipeDTO.CpfCnpj();
                if (response == 0) cpfcnpj = "Documento incompleto!";
                else if (response == -1) cpfcnpj = "CPF inválido!";
                else if (response == -2) cpfcnpj = "CNPJ inválido!";

                response = municipeDTO.RgIe();
                if (response == 0) rgie = "Documento incompleto!";
                else if (response == -1) rgie = "RG inválido!";
                else if (response == -2) rgie = "IE inválido!";

                if (municipesDTO is not null)
                {
                    string existCpfCnpj = "";
                    string existRgIe = "";

                    foreach (var municipe in municipesDTO)
                    {
                        if (municipeDTO.EmailPessoa == municipe.EmailPessoa) email = "O e-mail informado já existe!";

                        if (municipeDTO.CpfCnpjPessoa == municipe.CpfCnpjPessoa)
                        {
                            if (municipeDTO.CpfCnpjPessoa.Length == 14) existCpfCnpj = "O CPF informado já existe!";
                            else existCpfCnpj = "O CNPJ informado já existe!";
                        };

                        if (municipeDTO.RgIePessoa == municipe.RgIePessoa)
                        {
                            if (municipeDTO.RgIePessoa.Length == 12) existRgIe = "O RG informado já existe!";
                            else existRgIe = "O IE informado já existe!";
                        };
                    }

                    if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
                    if (rgie == "") rgie = existRgIe;
                }

                if (email == "" && cpfcnpj == "" && rgie == "")
                {
                    await _municipeService.Create(municipeDTO);

                    _response.SetSuccess(); _response.Message = "Munícipe " + municipeDTO.NomePessoa + " alterado com sucesso."; _response.Data = municipeDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email))
                    {
                        error = "e-mail";
                    }
                    if (!string.IsNullOrEmpty(cpfcnpj))
                    {
                        if (!string.IsNullOrEmpty(error)) error += ", ";

                        if (municipeDTO.CpfCnpjPessoa.Length == 14) error += "CPF";
                        else error += "CNPJ";
                    }
                    if (!string.IsNullOrEmpty(rgie))
                    {
                        if (!string.IsNullOrEmpty(error)) error += ", ";

                        if (municipeDTO.CpfCnpjPessoa.Length == 12) error += "RG";
                        else error += "IE";
                    }

                    _response.SetConflict(); _response.Message = $"O {error} informado(s) já existe(m)!"; _response.Data = new { email, cpfcnpj, rgie };
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível cadastrar a Logradouro!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MunicipeDTO>> Delete(int id)
        {
            try
            {
                var municipeDTO = await _municipeService.GetById(id);
                if (municipeDTO == null)
                {
                    _response.SetNotFound(); _response.Message = "Munícipe não encontrado!"; _response.Data = municipeDTO;
                    return NotFound(_response);
                }

                await _municipeService.Remove(id);

                _response.SetSuccess(); _response.Message = "Munícipe " + municipeDTO.NomePessoa + " excluído com sucesso."; _response.Data = municipeDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError(); _response.Message = "Não foi possível cadastrar a Logradouro!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

    }
}
