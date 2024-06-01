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

        public EngenheiroController(IEngenheiroService engenheiroService, AppDBContext context)
        {
            _engenheiroService = engenheiroService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EngenheiroDTO>>> Get()
        {
            var engenheirosDTO = await _engenheiroService.GetAll();
            _response.Status = true; _response.Data = engenheirosDTO;
            _response.Message = engenheirosDTO.Any() ?
                "Lista do(s) Engenheiro(s) obtida com sucesso." :
                "Nenhum Engenheiro encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetEngenheiro")]
        public async Task<ActionResult<EngenheiroDTO>> Get(int id)
        {
            var engenheiroDTO = await _engenheiroService.GetById(id);
            if (engenheiroDTO == null)
            {
                _response.Status = false; _response.Message = "Engenheiro não encontrado!"; _response.Data = engenheiroDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Engenheiro " + engenheiroDTO.NomePessoa + " obtido com sucesso."; _response.Data = engenheiroDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EngenheiroDTO engenheiroDTO)
        {
            if (engenheiroDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = engenheiroDTO;
                return BadRequest(_response);
            }
            engenheiroDTO.EmailPessoa = engenheiroDTO.EmailPessoa.ToLower();

            var engenheirosDTO = await _engenheiroService.GetAll();

            string email = "";
            string cpfcnpj = "";
            string rgie = "";
            string crea = "";

            int response = engenheiroDTO.CpfCnpj();
            if (response == 0) cpfcnpj = "Documento incompleto!";
            else if (response == -1) cpfcnpj = "CPF inválido!";
            else if (response == -2) cpfcnpj = "CNPJ inválido!";

            response = engenheiroDTO.RgIe();
            if (response == 0) rgie = "Documento incompleto!";
            else if (response == -1) rgie = "RG inválido!";
            else if (response == -2) rgie = "IE inválido!";

            response = engenheiroDTO.Crea();
            if (response == 0) crea = "Documento incompleto!";
            else if (response == -1) crea = "CREA inválido!";

            if (engenheirosDTO is not null)
            {
                string existCpfCnpj = "";
                string existRgIe = "";
                string existCrea = "";

                foreach (var engenheiro in engenheirosDTO)
                {
                    if (engenheiroDTO.EmailPessoa == engenheiro.EmailPessoa) email = "O e-mail informado já existe!";

                    if (engenheiroDTO.CpfCnpjPessoa == engenheiro.CpfCnpjPessoa)
                    {
                        if (engenheiroDTO.CpfCnpjPessoa.Length == 14) existCpfCnpj = "O CPF informado já existe!";
                        else existCpfCnpj = "O CNPJ informado já existe!";
                    };

                    if (engenheiroDTO.RgIePessoa == engenheiro.RgIePessoa)
                    {
                        if (engenheiroDTO.RgIePessoa.Length == 12) existRgIe = "O RG informado já existe!";
                        else existRgIe = "O IE informado já existe!";
                    };

                    if (engenheiroDTO.CreaEngenheiro == engenheiro.CreaEngenheiro) existCrea = "O CREA informado já existe!";
                }

                if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
                if (rgie == "") rgie = existRgIe;
                if (crea == "") crea = existCrea;
            }

            if (email == "" && cpfcnpj == "" && rgie == "" && crea == "")
            {
                await _engenheiroService.Create(engenheiroDTO);

                _response.Status = true; _response.Message = "Engenheiro " + engenheiroDTO.NomePessoa + " cadastrado com sucesso."; _response.Data = engenheiroDTO;
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

                    if (engenheiroDTO.CpfCnpjPessoa.Length == 14) error += "CPF";
                    else error += "CNPJ";
                }
                if (!string.IsNullOrEmpty(rgie))
                {
                    if (!string.IsNullOrEmpty(error)) error += ", ";

                    if (engenheiroDTO.CpfCnpjPessoa.Length == 12) error += "RG";
                    else error += "IE";
                }
                if (!string.IsNullOrEmpty(crea))
                {
                    if (!string.IsNullOrEmpty(error)) error += ", ";
                    error += "CREA";
                }

                _response.Status = true; _response.Message = $"O {error} informado(s) já existe(m)!"; _response.Data = new { email, cpfcnpj, rgie, crea };
                return BadRequest(_response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] EngenheiroDTO engenheiroDTO)
        {
            if (engenheiroDTO is null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = engenheiroDTO;
                return BadRequest(_response);
            }

            var existingEngenheiro = await _engenheiroService.GetById(engenheiroDTO.Id);
            if (existingEngenheiro == null)
            {
                _response.Status = false; _response.Message = "O Engenheiro informado não existe!"; _response.Data = engenheiroDTO;
                return NotFound(_response);
            }

            engenheiroDTO.EmailPessoa = engenheiroDTO.EmailPessoa.ToLower();

            var engenheirosDTO = await _engenheiroService.GetAll();
            engenheirosDTO = engenheirosDTO.Where(u => u.Id != engenheiroDTO.Id);

            string email = "";
            string cpfcnpj = "";
            string rgie = "";
            string crea = "";

            int response = engenheiroDTO.CpfCnpj();
            if (response == 0) cpfcnpj = "Documento incompleto!";
            else if (response == -1) cpfcnpj = "CPF inválido!";
            else if (response == -2) cpfcnpj = "CNPJ inválido!";

            response = engenheiroDTO.RgIe();
            if (response == 0) rgie = "Documento incompleto!";
            else if (response == -1) rgie = "RG inválido!";
            else if (response == -2) rgie = "IE inválido!";

            response = engenheiroDTO.Crea();
            if (response == 0) crea = "Documento incompleto!";
            else if (response == -1) crea = "CREA inválido!";

            if (engenheirosDTO is not null)
            {
                string existCpfCnpj = "";
                string existRgIe = "";
                string existCrea = "";

                foreach (var engenheiro in engenheirosDTO)
                {
                    if (engenheiroDTO.EmailPessoa == engenheiro.EmailPessoa) email = "O e-mail informado já existe!";

                    if (engenheiroDTO.CpfCnpjPessoa == engenheiro.CpfCnpjPessoa)
                    {
                        if (engenheiroDTO.CpfCnpjPessoa.Length == 14) existCpfCnpj = "O CPF informado já existe!";
                        else existCpfCnpj = "O CNPJ informado já existe!";
                    };

                    if (engenheiroDTO.RgIePessoa == engenheiro.RgIePessoa)
                    {
                        if (engenheiroDTO.RgIePessoa.Length == 12) existRgIe = "O RG informado já existe!";
                        else existRgIe = "O IE informado já existe!";
                    };

                    if (engenheiroDTO.CreaEngenheiro == engenheiro.CreaEngenheiro) existCrea = "O CREA informado já existe!";
                }

                if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
                if (rgie == "") rgie = existRgIe;
                if (crea == "") crea = existCrea;
            }

            if (email == "" && cpfcnpj == "" && rgie == "" && crea == "")
            {
                await _engenheiroService.Update(engenheiroDTO);

                _response.Status = true; _response.Message = "Engenheiro " + engenheiroDTO.NomePessoa + " alterado com sucesso."; _response.Data = engenheiroDTO;
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

                    if (engenheiroDTO.CpfCnpjPessoa.Length == 14) error += "CPF";
                    else error += "CNPJ";
                }
                if (!string.IsNullOrEmpty(rgie))
                {
                    if (!string.IsNullOrEmpty(error)) error += ", ";

                    if (engenheiroDTO.CpfCnpjPessoa.Length == 12) error += "RG";
                    else error += "IE";
                }
                if (!string.IsNullOrEmpty(crea))
                {
                    if (!string.IsNullOrEmpty(error)) error += ", ";
                    error += "CREA";
                }

                _response.Status = true; _response.Message = $"O {error} informado(s) já existe(m)!"; _response.Data = new { email, cpfcnpj, rgie, crea };
                return BadRequest(_response);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<EngenheiroDTO>> Delete(int id)
        {
            var engenheiroDTO = await _engenheiroService.GetById(id);
            if (engenheiroDTO == null)
            {
                _response.Status = false; _response.Message = "Engenheiro não encontrado!"; _response.Data = engenheiroDTO;
                return NotFound(_response);
            }

            await _engenheiroService.Remove(id);

            _response.Status = true; _response.Message = "Engenheiro " + engenheiroDTO.NomePessoa + " excluído com sucesso."; _response.Data = engenheiroDTO;
            return Ok(_response);
        }

    }
}
