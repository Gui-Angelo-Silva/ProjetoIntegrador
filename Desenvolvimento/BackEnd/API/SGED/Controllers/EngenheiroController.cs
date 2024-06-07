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
    public class EngenheiroController : Controller
    {

        private readonly IEngenheiroService _engenheiroService;
        private readonly Response _response;

        public EngenheiroController(IEngenheiroService engenheiroService)
        {
            _engenheiroService = engenheiroService;

            _response = new Response();
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<EngenheiroDTO>>> Get()
        {
            try
            {
                var engenheirosDTO = await _engenheiroService.GetAll();
                _response.SetSuccess();
                _response.Message = engenheirosDTO.Any() ?
                    "Lista do(s) Engenheiro(s) obtida com sucesso." :
                    "Nenhum Engenheiro encontrado.";
                _response.Data = engenheirosDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir a lista do(s) Engenheiro(s)!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpGet("{id:int}", Name = "GetEngenheiro")]
        public async Task<ActionResult<EngenheiroDTO>> Get(int id)
        {
            try
            {
                var engenheiroDTO = await _engenheiroService.GetById(id);
                if (engenheiroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Engenheiro não encontrado!";
                    _response.Data = engenheiroDTO;
                    return NotFound(_response);
                };

                _response.SetSuccess();
                _response.Message = "Engenheiro " + engenheiroDTO.NomePessoa + " obtido com sucesso.";
                _response.Data = engenheiroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível adquirir o Engenheiro informado!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPost()]
        public async Task<ActionResult> Post([FromBody] EngenheiroDTO engenheiroDTO)
        {
            if (engenheiroDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = engenheiroDTO;
                return BadRequest(_response);
            }
            engenheiroDTO.EmailPessoa = engenheiroDTO.EmailPessoa.ToLower();

            try
            {
                string email = "";
                string cpfcnpj = "";
                string rgie = "";
                string crea = "";

                ValidateDocuments(engenheiroDTO, ref email, ref cpfcnpj, ref rgie, ref crea);

                if (!string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(cpfcnpj) || !string.IsNullOrEmpty(rgie) || !string.IsNullOrEmpty(crea))
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email)) error += "e-mail";
                    if (!string.IsNullOrEmpty(cpfcnpj)) error += string.IsNullOrEmpty(error) ? "" : ", " + (engenheiroDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
                    if (!string.IsNullOrEmpty(rgie)) error += string.IsNullOrEmpty(error) ? "" : ", " + (engenheiroDTO.RgIePessoa.Length == 12 ? "RG" : "IE");
                    if (!string.IsNullOrEmpty(crea)) error += string.IsNullOrEmpty(error) ? "" : ", " + ("CREA");

                    _response.SetInvalid();
                    _response.Message = $"O {error} informado(s) está(ão) inválido(s)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie, errorCreaEngenheiro = crea };
                    return BadRequest(_response);
                }

                var engenheirosDTO = await _engenheiroService.GetAll();

                if (engenheirosDTO is not null && engenheirosDTO.Any())
                {
                    CheckDuplicates(engenheirosDTO, engenheiroDTO, ref email, ref cpfcnpj, ref rgie, ref crea);
                }

                if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(cpfcnpj) && string.IsNullOrEmpty(rgie) && string.IsNullOrEmpty(crea))
                {
                    await _engenheiroService.Create(engenheiroDTO);

                    _response.SetSuccess();
                    _response.Message = "Engenheiro " + engenheiroDTO.NomePessoa + " cadastrado com sucesso.";
                    _response.Data = engenheiroDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = GenerateErrorMessage(email, cpfcnpj, rgie, crea, engenheiroDTO);
                    _response.SetConflict();
                    _response.Message = $"O {error} informado(s) já existe(m)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie, errorCreaEngenheiro = crea };
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível cadastrar o Engenheiro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] EngenheiroDTO engenheiroDTO)
        {
            if (engenheiroDTO is null)
            {
                _response.SetInvalid();
                _response.Message = "Dado(s) inválido(s)!";
                _response.Data = engenheiroDTO;
                return BadRequest(_response);
            }
            engenheiroDTO.EmailPessoa = engenheiroDTO.EmailPessoa.ToLower();

            try
            {
                var existingEngenheiro = await _engenheiroService.GetById(engenheiroDTO.Id);
                if (existingEngenheiro is null)
                {
                    _response.SetNotFound();
                    _response.Message = "O Engenheiro informado não existe!";
                    _response.Data = new { errorId = "O Engenheiro informado não existe!" };
                    return NotFound(_response);
                }

                string email = "";
                string cpfcnpj = "";
                string rgie = "";
                string crea = "";

                ValidateDocuments(engenheiroDTO, ref email, ref cpfcnpj, ref rgie, ref crea);

                if (!string.IsNullOrEmpty(email) || !string.IsNullOrEmpty(cpfcnpj) || !string.IsNullOrEmpty(rgie) || !string.IsNullOrEmpty(crea))
                {
                    string error = "";
                    if (!string.IsNullOrEmpty(email)) error += "e-mail";
                    if (!string.IsNullOrEmpty(cpfcnpj)) error += string.IsNullOrEmpty(error) ? "" : ", " + (engenheiroDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
                    if (!string.IsNullOrEmpty(rgie)) error += string.IsNullOrEmpty(error) ? "" : ", " + (engenheiroDTO.RgIePessoa.Length == 12 ? "RG" : "IE");
                    if (!string.IsNullOrEmpty(crea)) error += string.IsNullOrEmpty(error) ? "" : ", " + ("CREA");

                    _response.SetError();
                    _response.Message = $"O {error} informado(s) está(ão) inválido(s)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie, errorCreaEngenheiro = crea };
                    return BadRequest(_response);
                }

                var engenheirosDTO = await _engenheiroService.GetAll();
                engenheirosDTO = engenheirosDTO.Where(u => u.Id != engenheiroDTO.Id).ToList();

                if (engenheirosDTO is not null && engenheirosDTO.Any())
                {
                    CheckDuplicates(engenheirosDTO, engenheiroDTO, ref email, ref cpfcnpj, ref rgie, ref crea);
                }

                if (string.IsNullOrEmpty(email) && string.IsNullOrEmpty(cpfcnpj) && string.IsNullOrEmpty(rgie) && string.IsNullOrEmpty(crea))
                {
                    await _engenheiroService.Update(engenheiroDTO);

                    _response.SetSuccess();
                    _response.Message = "Engenheiro " + engenheiroDTO.NomePessoa + " alterado com sucesso.";
                    _response.Data = engenheiroDTO;
                    return Ok(_response);
                }
                else
                {
                    string error = GenerateErrorMessage(email, cpfcnpj, rgie, crea, engenheiroDTO);
                    _response.SetConflict();
                    _response.Message = $"O {error} informado(s) já existe(m)!";
                    _response.Data = new { errorEmailPessoa = email, errorCpfCnpjPessoa = cpfcnpj, errorRgIePessoa = rgie, errorCreaEngenheiro = crea };
                    return BadRequest(_response);
                }
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível alterar o Engenheiro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult<EngenheiroDTO>> Delete(int id)
        {
            try
            {
                var engenheiroDTO = await _engenheiroService.GetById(id);
                if (engenheiroDTO is null)
                {
                    _response.SetNotFound();
                    _response.Message = "Engenheiro não encontrado!";
                    _response.Data = new { errorId = "Engenheiro não encontrado!" };
                    return NotFound(_response);
                }

                await _engenheiroService.Remove(id);

                _response.SetSuccess();
                _response.Message = "Engenheiro " + engenheiroDTO.NomePessoa + " excluído com sucesso.";
                _response.Data = engenheiroDTO;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.SetError();
                _response.Message = "Não foi possível excluir o Engenheiro!";
                _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
                return StatusCode(StatusCodes.Status500InternalServerError, _response);
            }
        }

        private void ValidateDocuments(EngenheiroDTO engenheiroDTO, ref string email, ref string cpfcnpj, ref string rgie, ref string crea)
        {
            if (!engenheiroDTO.Email())
            {
                email = "E-mail inválido!";
            }
            else if (Operator.CompareString(engenheiroDTO.EmailPessoa, "devops@development.com"))
            {
                email = "O e-mail informado já existe!";
            }

            int response = engenheiroDTO.CpfCnpj();
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

            response = engenheiroDTO.RgIe();
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

            response = engenheiroDTO.Crea();
            switch (response)
            {
                case 0:
                    crea = "Documento incompleto!";
                    break;
                case -1:
                    crea = "CREA inválido!";
                    break;
            }
        }

        private void CheckDuplicates(IEnumerable<EngenheiroDTO> engenheirosDTO, EngenheiroDTO engenheiroDTO, ref string email, ref string cpfcnpj, ref string rgie, ref string crea)
        {
            foreach (var engenheiro in engenheirosDTO)
            {
                if (Operator.CompareString(engenheiroDTO.EmailPessoa, engenheiro.EmailPessoa))
                {
                    email = "O e-mail informado já existe!";
                }

                if (Operator.CompareString(engenheiroDTO.CpfCnpjPessoa.ExtractNumbers(), engenheiro.CpfCnpjPessoa.ExtractNumbers()))
                {
                    cpfcnpj = engenheiroDTO.CpfCnpjPessoa.Length == 14 ? "O CPF informado já existe!" : "O CNPJ informado já existe!";
                }

                if (Operator.CompareString(engenheiroDTO.RgIePessoa.ExtractNumbers(), engenheiro.RgIePessoa.ExtractNumbers()))
                {
                    rgie = engenheiroDTO.RgIePessoa.Length == 12 ? "O RG informado já existe!" : "O IE informado já existe!";
                }

                if (Operator.CompareString(engenheiroDTO.CreaEngenheiro.ExtractNumbers(), engenheiro.CreaEngenheiro.ExtractNumbers()))
                {
                    crea = "O CREA informado já existe!";
                }
            }
        }

        private string GenerateErrorMessage(string email, string cpfcnpj, string rgie, string crea, EngenheiroDTO engenheiroDTO)
        {
            string error = "";
            if (!string.IsNullOrEmpty(email)) error += "e-mail";
            if (!string.IsNullOrEmpty(cpfcnpj)) error += (error == "" ? "" : ", ") + (engenheiroDTO.CpfCnpjPessoa.Length == 14 ? "CPF" : "CNPJ");
            if (!string.IsNullOrEmpty(rgie)) error += (error == "" ? "" : ", ") + (engenheiroDTO.RgIePessoa.Length == 12 ? "RG" : "IE");
            if (!string.IsNullOrEmpty(crea)) error += string.IsNullOrEmpty(error) ? "" : ", " + ("CREA");
            return error;
        }
    }
}
