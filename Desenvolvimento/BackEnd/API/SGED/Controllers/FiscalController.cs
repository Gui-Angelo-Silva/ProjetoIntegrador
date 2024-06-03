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

		public FiscalController(IFiscalService fiscalService, AppDBContext context)
		{
			_fiscalService = fiscalService;

			_response = new Response();
		}

		[HttpGet]
		public async Task<ActionResult<IEnumerable<FiscalDTO>>> Get()
		{
			try
			{
				var fiscalsDTO = await _fiscalService.GetAll();
				_response.SetSuccess(); _response.Data = fiscalsDTO;
				_response.Message = fiscalsDTO.Any() ?
					"Lista do(s) Fiscal(s) obtida com sucesso." :
					"Nenhum Fiscal encontrado.";
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError(); _response.Message = "Não foi possível alterar o Fiscal!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpGet("{id}", Name = "GetFiscal")]
		public async Task<ActionResult<FiscalDTO>> Get(int id)
		{
			try
			{
				var fiscalDTO = await _fiscalService.GetById(id);
				if (fiscalDTO == null)
				{
					_response.SetNotFound(); _response.Message = "Fiscal não encontrado!"; _response.Data = fiscalDTO;
					return NotFound(_response);
				};

				_response.SetSuccess(); _response.Message = "Fiscal " + fiscalDTO.NomePessoa + " obtido com sucesso."; _response.Data = fiscalDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError(); _response.Message = "Não foi possível alterar o Fiscal!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpPost]
		public async Task<ActionResult> Post([FromBody] FiscalDTO fiscalDTO)
		{
			if (fiscalDTO == null)
			{
				_response.SetInvalid(); _response.Message = "Dado(s) inválido(s)!"; _response.Data = fiscalDTO;
				return BadRequest(_response);
			}
			fiscalDTO.EmailPessoa = fiscalDTO.EmailPessoa.ToLower();

			try
			{
				var fiscalsDTO = await _fiscalService.GetAll();

				string email = "";
				string cpfcnpj = "";
				string rgie = "";

				int response = fiscalDTO.CpfCnpj();
				if (response == 0) cpfcnpj = "Documento incompleto!";
				else if (response == -1) cpfcnpj = "CPF inválido!";
				else if (response == -2) cpfcnpj = "CNPJ inválido!";

				response = fiscalDTO.RgIe();
				if (response == 0) rgie = "Documento incompleto!";
				else if (response == -1) rgie = "RG inválido!";
				else if (response == -2) rgie = "IE inválido!";

				if (fiscalsDTO is not null)
				{
					string existCpfCnpj = "";
					string existRgIe = "";

					foreach (var fiscal in fiscalsDTO)
					{
						if (fiscalDTO.EmailPessoa == fiscal.EmailPessoa) email = "O e-mail informado já existe!";

						if (fiscalDTO.CpfCnpjPessoa == fiscal.CpfCnpjPessoa)
						{
							if (fiscalDTO.CpfCnpjPessoa.Length == 14) existCpfCnpj = "O CPF informado já existe!";
							else existCpfCnpj = "O CNPJ informado já existe!";
						};

						if (fiscalDTO.RgIePessoa == fiscal.RgIePessoa)
						{
							if (fiscalDTO.RgIePessoa.Length == 12) existRgIe = "O RG informado já existe!";
							else existRgIe = "O IE informado já existe!";
						};
					}

					if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
					if (rgie == "") rgie = existRgIe;
				}

				if (email == "" && cpfcnpj == "" && rgie == "")
				{
					await _fiscalService.Create(fiscalDTO);

					_response.SetSuccess(); _response.Message = "Fiscal " + fiscalDTO.NomePessoa + " cadastrado com sucesso."; _response.Data = fiscalDTO;
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

						if (fiscalDTO.CpfCnpjPessoa.Length == 14) error += "CPF";
						else error += "CNPJ";
					}
					if (!string.IsNullOrEmpty(rgie))
					{
						if (!string.IsNullOrEmpty(error)) error += ", ";

						if (fiscalDTO.CpfCnpjPessoa.Length == 12) error += "RG";
						else error += "IE";
					}

					_response.SetConflict(); _response.Message = $"O {error} informado(s) já existe(m)!"; _response.Data = new { email, cpfcnpj, rgie };
					return BadRequest(_response);
				}
			}
			catch (Exception ex)
			{
				_response.SetError(); _response.Message = "Não foi possível alterar o Fiscal!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpPut()]
		public async Task<ActionResult> Put([FromBody] FiscalDTO fiscalDTO)
		{
			if (fiscalDTO is null)
			{
				_response.SetInvalid(); _response.Message = "Dado(s) inválido(s)!"; _response.Data = fiscalDTO;
				return BadRequest(_response);
			}
			fiscalDTO.EmailPessoa = fiscalDTO.EmailPessoa.ToLower();

			try
			{
				var existingFiscal = await _fiscalService.GetById(fiscalDTO.Id);
				if (existingFiscal == null)
				{
					_response.SetNotFound(); _response.Message = "O Fiscal informado não existe!"; _response.Data = fiscalDTO;
					return NotFound(_response);
				}

				fiscalDTO.EmailPessoa = fiscalDTO.EmailPessoa.ToLower();

				var fiscalsDTO = await _fiscalService.GetAll();
				fiscalsDTO = fiscalsDTO.Where(u => u.Id != fiscalDTO.Id);

				string email = "";
				string cpfcnpj = "";
				string rgie = "";

				int response = fiscalDTO.CpfCnpj();
				if (response == 0) cpfcnpj = "Documento incompleto!";
				else if (response == -1) cpfcnpj = "CPF inválido!";
				else if (response == -2) cpfcnpj = "CNPJ inválido!";

				response = fiscalDTO.RgIe();
				if (response == 0) rgie = "Documento incompleto!";
				else if (response == -1) rgie = "RG inválido!";
				else if (response == -2) rgie = "IE inválido!";

				if (fiscalsDTO is not null)
				{
					string existCpfCnpj = "";
					string existRgIe = "";

					foreach (var fiscal in fiscalsDTO)
					{
						if (fiscalDTO.EmailPessoa == fiscal.EmailPessoa) email = "O e-mail informado já existe!";

						if (fiscalDTO.CpfCnpjPessoa == fiscal.CpfCnpjPessoa)
						{
							if (fiscalDTO.CpfCnpjPessoa.Length == 14) existCpfCnpj = "O CPF informado já existe!";
							else existCpfCnpj = "O CNPJ informado já existe!";
						};

						if (fiscalDTO.RgIePessoa == fiscal.RgIePessoa)
						{
							if (fiscalDTO.RgIePessoa.Length == 12) existRgIe = "O RG informado já existe!";
							else existRgIe = "O IE informado já existe!";
						};
					}

					if (cpfcnpj == "") cpfcnpj = existCpfCnpj;
					if (rgie == "") rgie = existRgIe;
				}

				if (email == "" && cpfcnpj == "" && rgie == "")
				{
					await _fiscalService.Create(fiscalDTO);

					_response.SetSuccess(); _response.Message = "Fiscal " + fiscalDTO.NomePessoa + " alterado com sucesso."; _response.Data = fiscalDTO;
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

						if (fiscalDTO.CpfCnpjPessoa.Length == 14) error += "CPF";
						else error += "CNPJ";
					}
					if (!string.IsNullOrEmpty(rgie))
					{
						if (!string.IsNullOrEmpty(error)) error += ", ";

						if (fiscalDTO.CpfCnpjPessoa.Length == 12) error += "RG";
						else error += "IE";
					}

					_response.SetConflict(); _response.Message = $"O {error} informado(s) já existe(m)!"; _response.Data = new { email, cpfcnpj, rgie };
					return BadRequest(_response);
				}
			}
			catch (Exception ex)
			{
				_response.SetError(); _response.Message = "Não foi possível alterar o Fiscal!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

		[HttpDelete("{id}")]
		public async Task<ActionResult<FiscalDTO>> Delete(int id)
		{
			try
			{
				var fiscalDTO = await _fiscalService.GetById(id);
				if (fiscalDTO == null)
				{
					_response.SetNotFound(); _response.Message = "Fiscal não encontrado!"; _response.Data = fiscalDTO;
					return NotFound(_response);
				}

				await _fiscalService.Remove(id);

				_response.SetSuccess(); _response.Message = "Fiscal " + fiscalDTO.NomePessoa + " excluído com sucesso."; _response.Data = fiscalDTO;
				return Ok(_response);
			}
			catch (Exception ex)
			{
				_response.SetError(); _response.Message = "Não foi possível alterar o Fiscal!"; _response.Data = new { ErrorMessage = ex.Message, StackTrace = ex.StackTrace ?? "No stack trace available!" };
				return StatusCode(StatusCodes.Status500InternalServerError, _response);
			}
		}

	}
}
