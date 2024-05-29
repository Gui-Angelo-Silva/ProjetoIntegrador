using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGED.Objects.DTO.Entities;
using SGED.Objects.Interfaces.Pessoa;
using SGED.Services.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class EngenheiroController : Controller
    {

        private readonly IEngenheiroService _engenheiroService;

        public EngenheiroController(IEngenheiroService engenheiroService)
        {
            _engenheiroService = engenheiroService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EngenheiroDTO>>> Get()
        {
            var engenheirosDTO = await _engenheiroService.GetAll();
            return Ok(engenheirosDTO);
        }

        [HttpGet("{id}", Name = "GetEngenheiro")]
        public async Task<ActionResult<EngenheiroDTO>> Get(int id)
        {
            var engenheiroDTO = await _engenheiroService.GetById(id);
            if (engenheiroDTO == null) return NotFound("Engenheiro não encontradas!");
            return Ok(engenheiroDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EngenheiroDTO engenheiroDTO)
        {
            if (engenheiroDTO is null) return BadRequest("Dado(s) inválido(s)!");
            engenheiroDTO.EmailPessoa = engenheiroDTO.EmailPessoa.ToLower();

            var engenheirosDTO = await _engenheiroService.GetAll();

            string email = "";
            string cpfcnpj = "";
            string rgie = "";

            int response = engenheiroDTO.CpfCnpj();
            if (response == 0) cpfcnpj = "Documento incompleto!";
            else if (response == -1) cpfcnpj = "CPF inválido!";
            else if (response == -2) cpfcnpj = "CNPJ inválido!";

            response = engenheiroDTO.RgIe();
            if (response == 0) rgie = "Documento incompleto!";
            else if (response == -1) rgie = "RG inválido!";
            else if (response == -2) rgie = "IE inválido!";

            if (engenheirosDTO is not null)
            {
                string existCpfCnpj = "";
                string existRgIe = "";

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
                }

                if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
                if (rgie == "") rgie = existRgIe;
            }

            if (engenheiroDTO.EmailPessoa == "devops@development.com") email = "O e-mail informado já existe!";

            if (email == "" && cpfcnpj == "" && rgie == "")
            {
                await _engenheiroService.Create(engenheiroDTO);
                if (engenheiroDTO.Id != 0) return Ok(engenheiroDTO);
                else return new CreatedAtRouteResult("GetEngenheiro", new { id = engenheiroDTO.Id }, engenheiroDTO);
            }

            return BadRequest(new { email, cpfcnpj, rgie });
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] EngenheiroDTO engenheiroDTO)
        {
            if (engenheiroDTO is null) return BadRequest("Dado(s) inválido(s)!");
            engenheiroDTO.EmailPessoa = engenheiroDTO.EmailPessoa.ToLower();

            var engenheirosDTO = await _engenheiroService.GetAll();
            engenheirosDTO = engenheirosDTO.Where(u => u.Id != engenheiroDTO.Id);

            string email = "";
            string cpfcnpj = "";
            string rgie = "";

            int response = engenheiroDTO.CpfCnpj();
            if (response == 0) cpfcnpj = "Documento incompleto!";
            else if (response == -1) cpfcnpj = "CPF inválido!";
            else if (response == -2) cpfcnpj = "CNPJ inválido!";

            response = engenheiroDTO.RgIe();
            if (response == 0) rgie = "Documento incompleto!";
            else if (response == -1) rgie = "RG inválido!";
            else if (response == -2) rgie = "IE inválido!";

            if (engenheirosDTO is not null)
            {
                string existCpfCnpj = "";
                string existRgIe = "";

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
                }

                if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
                if (rgie == "") rgie = existRgIe;
            }

            if (engenheiroDTO.EmailPessoa == "devops@development.com") email = "O e-mail informado já existe!";

            if (email == "" && cpfcnpj == "" && rgie == "")
            {
                await _engenheiroService.Update(engenheiroDTO);
                return Ok(engenheiroDTO);
            }

            return BadRequest(new { email, cpfcnpj, rgie });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<EngenheiroDTO>> Delete(int id)
        {
            var engenheiroDTO = await _engenheiroService.GetById(id);
            if (engenheiroDTO == null) return NotFound("Engenheiro não encontrada!");
            await _engenheiroService.Remove(id);
            return Ok(engenheiroDTO);
        }

    }
}
