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
    public class UsuarioController : Controller
    {

        private readonly IUsuarioService _usuarioService;
        private readonly Response _response;

        public UsuarioController(IUsuarioService usuarioService, AppDBContext context)
        {
            _usuarioService = usuarioService;

            _response = new Response();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> Get()
        {
            var usuariosDTO = await _usuarioService.GetAll();
            _response.Status = true; _response.Data = usuariosDTO;
            _response.Message = usuariosDTO.Any() ?
                "Lista do(s) Usuário(s) obtida com sucesso." :
                "Nenhum Usuário encontrado.";
            return Ok(_response);
        }

        [HttpGet("{id}", Name = "GetUsuario")]
        public async Task<ActionResult<UsuarioDTO>> Get(int id)
        {
            var usuarioDTO = await _usuarioService.GetById(id);
            if (usuarioDTO == null)
            {
                _response.Status = false; _response.Message = "Usuário não encontrado!"; _response.Data = usuarioDTO;
                return NotFound(_response);
            };

            _response.Status = true; _response.Message = "Usuário " + usuarioDTO.NomePessoa + " obtido com sucesso."; _response.Data = usuarioDTO;
            return Ok(_response);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] UsuarioDTO usuarioDTO)
        {
            if (usuarioDTO == null)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = usuarioDTO;
                return BadRequest(_response);
            } 
            usuarioDTO.EmailPessoa = usuarioDTO.EmailPessoa.ToLower();

            var usuariosDTO = await _usuarioService.GetAll();

            string email = "";
            string cpfcnpj = "";
            string rgie = "";

            int response = usuarioDTO.CpfCnpj();
            if (response == 0) cpfcnpj = "Documento incompleto!";
            else if (response == -1) cpfcnpj = "CPF inválido!";
            else if (response == -2) cpfcnpj = "CNPJ inválido!";

            response = usuarioDTO.RgIe();
            if (response == 0) rgie = "Documento incompleto!";
            else if (response == -1) rgie = "RG inválido!";
            else if (response == -2) rgie = "IE inválido!";

            if (usuariosDTO is not null)
            {
                string existCpfCnpj = "";
                string existRgIe = "";

                foreach (var usuario in usuariosDTO)
                {
                    if (usuarioDTO.EmailPessoa == usuario.EmailPessoa) email = "O e-mail informado já existe!";

                    if (usuarioDTO.CpfCnpjPessoa == usuario.CpfCnpjPessoa)
                    {
                        if (usuarioDTO.CpfCnpjPessoa.Length == 14) existCpfCnpj = "O CPF informado já existe!";
                        else existCpfCnpj = "O CNPJ informado já existe!";
                    };

                    if (usuarioDTO.RgIePessoa == usuario.RgIePessoa)
                    {
                        if (usuarioDTO.RgIePessoa.Length == 12) existRgIe = "O RG informado já existe!";
                        else existRgIe = "O IE informado já existe!";
                    };
                }

                if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
                if (rgie == "") rgie = existRgIe;
            }

            if (usuarioDTO.EmailPessoa == "devops@development.com") email = "O e-mail informado já existe!";

            if (email == "" && cpfcnpj == "" && rgie == "")
            {
                await _usuarioService.Create(usuarioDTO);

                _response.Status = true; _response.Message = "Usuário " + usuarioDTO.NomePessoa + " cadastrado com sucesso."; _response.Data = usuarioDTO;
                return Ok(_response);
            } else
            {
                string error = "";
                if (!string.IsNullOrEmpty(email))
                {
                    error = "e-mail";
                }
                if (!string.IsNullOrEmpty(cpfcnpj))
                {
                    if (!string.IsNullOrEmpty(error)) error += ", ";

                    if (usuarioDTO.CpfCnpjPessoa.Length == 14) error += "CPF";
                    else error += "CNPJ";
                }
                if (!string.IsNullOrEmpty(rgie))
                {
                    if (!string.IsNullOrEmpty(error)) error += ", ";

                    if (usuarioDTO.CpfCnpjPessoa.Length == 12) error += "RG";
                    else error += "IE";
                }

                _response.Status = true; _response.Message = $"O {error} informado(s) já existe(m)!"; _response.Data = new { email, cpfcnpj, rgie };
                return BadRequest(_response);
            }
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] UsuarioDTO usuarioDTO)
        {
            if (usuarioDTO is null || usuarioDTO.Id == 1)
            {
                _response.Status = false; _response.Message = "Dado(s) inválido(s)!"; _response.Data = usuarioDTO;
                return BadRequest(_response);
            }

            var existingUsuario = await _usuarioService.GetById(usuarioDTO.Id);
            if (existingUsuario == null)
            {
                _response.Status = false; _response.Message = "O Usuario informado não existe!"; _response.Data = usuarioDTO;
                return NotFound(_response);
            }

            usuarioDTO.EmailPessoa = usuarioDTO.EmailPessoa.ToLower();

            var usuariosDTO = await _usuarioService.GetAll();
            usuariosDTO = usuariosDTO.Where(u => u.Id != usuarioDTO.Id);

            string email = "";
            string cpfcnpj = "";
            string rgie = "";

            int response = usuarioDTO.CpfCnpj();
            if (response == 0) cpfcnpj = "Documento incompleto!";
            else if (response == -1) cpfcnpj = "CPF inválido!";
            else if (response == -2) cpfcnpj = "CNPJ inválido!";

            response = usuarioDTO.RgIe();
            if (response == 0) rgie = "Documento incompleto!";
            else if (response == -1) rgie = "RG inválido!";
            else if (response == -2) rgie = "IE inválido!";

            if (usuariosDTO is not null)
            {
                string existCpfCnpj = "";
                string existRgIe = "";

                foreach (var usuario in usuariosDTO)
                {
                    if (usuarioDTO.EmailPessoa == usuario.EmailPessoa) email = "O e-mail informado já existe!";

                    if (usuarioDTO.CpfCnpjPessoa == usuario.CpfCnpjPessoa)
                    {
                        if (usuarioDTO.CpfCnpjPessoa.Length == 14) existCpfCnpj = "O CPF informado já existe!";
                        else existCpfCnpj = "O CNPJ informado já existe!";
                    };

                    if (usuarioDTO.RgIePessoa == usuario.RgIePessoa)
                    {
                        if (usuarioDTO.RgIePessoa.Length == 12) existRgIe = "O RG informado já existe!";
                        else existRgIe = "O IE informado já existe!";
                    };
                }

                if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
                if (rgie == "") rgie = existRgIe;
            }

            if (usuarioDTO.EmailPessoa == "devops@development.com") email = "O e-mail informado já existe!";

            if (email == "" && cpfcnpj == "" && rgie == "")
            {
                await _usuarioService.Create(usuarioDTO);

                _response.Status = true; _response.Message = "Usuário " + usuarioDTO.NomePessoa + " alterado com sucesso."; _response.Data = usuarioDTO;
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

                    if (usuarioDTO.CpfCnpjPessoa.Length == 14) error += "CPF";
                    else error += "CNPJ";
                }
                if (!string.IsNullOrEmpty(rgie))
                {
                    if (!string.IsNullOrEmpty(error)) error += ", ";

                    if (usuarioDTO.CpfCnpjPessoa.Length == 12) error += "RG";
                    else error += "IE";
                }

                _response.Status = true; _response.Message = $"O {error} informado(s) já existe(m)!"; _response.Data = new { email, cpfcnpj, rgie };
                return BadRequest(_response);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<UsuarioDTO>> Delete(int id)
        {
            var usuarioDTO = await _usuarioService.GetById(id);
            if (usuarioDTO == null)
            {
                _response.Status = false; _response.Message = "Usuário não encontrado!"; _response.Data = usuarioDTO;
                return NotFound(_response);
            }

            await _usuarioService.Remove(id);

            _response.Status = true; _response.Message = "Usuário " + usuarioDTO.NomePessoa + " excluído com sucesso."; _response.Data = usuarioDTO;
            return Ok(_response);
        }

    }
}
