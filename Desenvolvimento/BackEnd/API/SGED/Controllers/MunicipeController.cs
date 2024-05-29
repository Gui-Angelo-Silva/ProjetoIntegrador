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
    public class MunicipeController : Controller
    {

        private readonly IMunicipeService _municipeService;

        public MunicipeController(IMunicipeService municipeService)
        {
            _municipeService = municipeService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MunicipeDTO>>> Get()
        {
            var municipesDTO = await _municipeService.GetAll();
            return Ok(municipesDTO);
        }

        [HttpGet("{id}", Name = "GetMunicipe")]
        public async Task<ActionResult<MunicipeDTO>> Get(int id)
        {
            var municipeDTO = await _municipeService.GetById(id);
            if (municipeDTO == null) return NotFound("Municipe não encontradas!");
            return Ok(municipeDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] MunicipeDTO municipeDTO)
        {
            if (municipeDTO is null) return BadRequest("Dado(s) inválido(s)!");
            municipeDTO.EmailPessoa = municipeDTO.EmailPessoa.ToLower();

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

            if (municipeDTO.EmailPessoa == "devops@development.com") email = "O e-mail informado já existe!";

            if (email == "" && cpfcnpj == "" && rgie == "")
            {
                await _municipeService.Create(municipeDTO);
                if (municipeDTO.Id != 0) return Ok(municipeDTO);
                else return new CreatedAtRouteResult("GetMunicipe", new { id = municipeDTO.Id }, municipeDTO);
            }

            return BadRequest(new { email, cpfcnpj, rgie });
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] MunicipeDTO municipeDTO)
        {
            if (municipeDTO is null) return BadRequest("Dado(s) inválido(s)!");
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

            if (municipeDTO.EmailPessoa == "devops@development.com") email = "O e-mail informado já existe!";

            if (email == "" && cpfcnpj == "" && rgie == "")
            {
                await _municipeService.Update(municipeDTO);
                return Ok(municipeDTO);
            }

            return BadRequest(new { email, cpfcnpj, rgie });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MunicipeDTO>> Delete(int id)
        {
            var municipeDTO = await _municipeService.GetById(id);
            if (municipeDTO == null) return NotFound("Municipe não encontrada!");
            await _municipeService.Remove(id);
            return Ok(municipeDTO);
        }

    }
}
