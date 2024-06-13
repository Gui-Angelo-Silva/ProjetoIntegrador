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
    public class FiscalController : Controller
    {

        private readonly IFiscalService _fiscalService;
        private readonly Response _response;

        public FiscalController(IFiscalService fiscalService)
        {
            _fiscalService = fiscalService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<FiscalDTO>>> Get()
        {
            try
            {
                var fiscalsDTO = await _fiscalService.GetAll();
                _response.SetSuccess();
                _response.Message = fiscalsDTO.Any() ?
                    "Lista do(s) Fiscal(s) obtida com sucesso." :
                    "Nenhum Fiscal encontrado.";
                _response.Data = fiscalsDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Fiscal(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetFiscal")]
        public async Task<ActionResult<FiscalDTO>> Get(int id)
        {
            try
            {
                var fiscalDTO = await _fiscalService.GetById(id);
                if (fiscalDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Fiscal não encontrado!";
                    _response.Data = fiscalDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Fiscal " + fiscalDTO.NomePessoa + " obtido com sucesso.";
                _response.Data = fiscalDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Fiscal informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] FiscalDTO fiscalDTO)
        {
            if (fiscalDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = fiscalDTO;
                return BadRequest(_response);
            }
            fiscalDTO.EmailPessoa = fiscalDTO.EmailPessoa.ToLower();

            try
            {
                string email = "";
                string cpfcnpj = "";
                string rgie = "";

                ValidateDocuments(fiscalDTO, ref email, ref cpfcnpj, ref rgie);

                if (!string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(cpfcnpj) || !string.IsNullOrEmpty(rgie))
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email)) error += "e-mail";
                    if (!string.IsNullOrEmpty(cpfcnpj)) error += string.IsNullOrEmpty(error) ? "" : ", " + (fiscalDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
                    if (!string.IsNullOrEmpty(rgie)) error += string.IsNullOrEmpty(error) ? "" : ", " + (fiscalDTO.RgIePessoa.Length == 12 ? "RG" : "IE");

                    _response.SetInvalid();
                    _response.Message = $"O {error} informado(s) está(ão) inválido(s)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }

                var fiscalsDTO = await _fiscalService.GetAll();

                if (fiscalsDTO is not null && fiscalsDTO.Any())
                {
                    CheckDuplicates(fiscalsDTO, fiscalDTO, ref email, ref cpfcnpj, ref rgie);
                }

                if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(cpfcnpj) && string.IsNullOrEmpty(rgie))
                {
                    await _fiscalService.Create(fiscalDTO);

                    _response.SetSuccess();
                    _response.Message = "Fiscal " + fiscalDTO.NomePessoa + " cadastrado com sucesso.";
                    _response.Data = fiscalDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = GenerateErrorMessage(email, cpfcnpj, rgie, fiscalDTO);
                    _response.SetConflict();
                    _response.Message = $"O {error} informado(s) já existe(m)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Fiscal!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] FiscalDTO fiscalDTO)
        {
            if (fiscalDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = fiscalDTO;
                return BadRequest(_response);
            }
            fiscalDTO.EmailPessoa = fiscalDTO.EmailPessoa.ToLower();

            try
            {
                var existingFiscal = await _fiscalService.GetById(fiscalDTO.Id);
                if (existingFiscal is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Fiscal informado não existe!";
                    _response.Data = new { errorId = "O Fiscal informado não existe!" };
                    return NotFound(_response);
                }

                string email = "";
                string cpfcnpj = "";
                string rgie = "";

                ValidateDocuments(fiscalDTO, ref email, ref cpfcnpj, ref rgie);

                if (!string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(cpfcnpj) || !string.IsNullOrEmpty(rgie))
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email)) error += "e-mail";
                    if (!string.IsNullOrEmpty(cpfcnpj)) error += string.IsNullOrEmpty(error) ? "" : ", " + (fiscalDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
                    if (!string.IsNullOrEmpty(rgie)) error += string.IsNullOrEmpty(error) ? "" : ", " + (fiscalDTO.RgIePessoa.Length == 12 ? "RG" : "IE");

                    _response.SetError();
                    _response.Message = $"O {error} informado(s) está(ão) inválido(s)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }

                var fiscalsDTO = await _fiscalService.GetAll();
                fiscalsDTO = fiscalsDTO.Where(u => u.Id != fiscalDTO.Id).ToList();

                if (fiscalsDTO is not null && fiscalsDTO.Any())
                {
                    CheckDuplicates(fiscalsDTO, fiscalDTO, ref email, ref cpfcnpj, ref rgie);
                }

                if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(cpfcnpj) && string.IsNullOrEmpty(rgie))
                {
                    await _fiscalService.Update(fiscalDTO);

                    _response.SetSuccess();
                    _response.Message = "Fiscal " + fiscalDTO.NomePessoa + " alterado com sucesso.";
                    _response.Data = fiscalDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = GenerateErrorMessage(email, cpfcnpj, rgie, fiscalDTO);
                    _response.SetConflict();
                    _response.Message = $"O {error} informado(s) já existe(m)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie };
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Fiscal!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<FiscalDTO>> Delete(int id)
        {
            try
            {
                var fiscalDTO = await _fiscalService.GetById(id);
                if (fiscalDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Fiscal não encontrado!";
                    _response.Data = new { errorId = "Fiscal não encontrado!" };
                    return NotFound(_response);
                }

                await _fiscalService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Fiscal " + fiscalDTO.NomePessoa + " excluído com sucesso.";
                _response.Data = fiscalDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Fiscal!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private void ValidateDocuments(FiscalDTO fiscalDTO, ref string email, ref string cpfcnpj, ref string rgie)
        {
            if (!fiscalDTO.Email())
            {
                email = "E-mail inválido!";
            }
            else if (Operator.CompareString(fiscalDTO.EmailPessoa, "devops@development.com"))
            {
                email = "O e-mail informado já existe!";
            }

            int response = fiscalDTO.CpfCnpj();
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

            response = fiscalDTO.RgIe();
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

        private void CheckDuplicates(IEnumerable<FiscalDTO> fiscalsDTO, FiscalDTO fiscalDTO, ref string email, ref string cpfcnpj, ref string rgie)
        {
            foreach (var fiscal in fiscalsDTO)
            {
                if (Operator.CompareString(fiscalDTO.EmailPessoa, fiscal.EmailPessoa))
                {
                    email = "O e-mail informado já existe!";
                }

                if (Operator.CompareString(fiscalDTO.CpfCnpjPessoa.ExtractNumbers(), fiscal.CpfCnpjPessoa.ExtractNumbers()))
                {
                    cpfcnpj = fiscalDTO.CpfCnpjPessoa.Length == 14 ? "O CPF informado já existe!" : "O CNPJ informado já existe!";
                }

                if (Operator.CompareString(fiscalDTO.RgIePessoa.ExtractNumbers(), fiscal.RgIePessoa.ExtractNumbers()))
                {
                    rgie = fiscalDTO.RgIePessoa.Length == 12 ? "O RG informado já existe!" : "O IE informado já existe!";
                }
            }
        }

        private string GenerateErrorMessage(string email, string cpfcnpj, string rgie, FiscalDTO fiscalDTO)
        {
            string error = "";
            if (!string.IsNullOrEmpty(email)) error += "e-mail";
            if (!string.IsNullOrEmpty(cpfcnpj)) error += (error == "" ? "" : ", ") + (fiscalDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
            if (!string.IsNullOrEmpty(rgie)) error += (error == "" ? "" : ", ") + (fiscalDTO.RgIePessoa.Length == 12 ? "RG" : "IE");
            return error;
        }
    }
}
