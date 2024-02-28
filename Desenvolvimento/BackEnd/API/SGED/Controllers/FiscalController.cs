using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SGED.DTO.Entities;
using SGED.Services.Interfaces;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    //[Authorize("ApiScope")]
    public class FiscalController : Controller
    {

        private readonly IFiscalService _fiscalService;

        public FiscalController(IFiscalService fiscalService)
        {
            _fiscalService = fiscalService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FiscalDTO>>> Get()
        {
            var fiscaisDTO = await _fiscalService.GetAll();
            if (fiscaisDTO == null) return NotFound("Fiscais não encontradas!");
            return Ok(fiscaisDTO);
        }

        [HttpGet("{id}", Name = "GetFiscal")]
        public async Task<ActionResult<FiscalDTO>> Get(int id)
        {
            var fiscalDTO = await _fiscalService.GetById(id);
            if (fiscalDTO == null) return NotFound("Fiscais não encontrados!");
            return Ok(fiscalDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] FiscalDTO fiscalDTO)
        {
            if (fiscalDTO is null) return BadRequest("Dado inválido!");

            int response = fiscalDTO.CpfCnpj(fiscalDTO.CpfCnpjPessoa);
            if (response == 0) return BadRequest("Documento incorreto!");
            else if (response == -1) return BadRequest("CPF inválido!");
            else if (response == -2) return BadRequest("CNPJ inválido!");
            else if (response == -3) return BadRequest("Documento incompleto!");

            response = fiscalDTO.RgIe(fiscalDTO.RgIePessoa);
            if (response == 0) return BadRequest("Documento incorreto!");
            else if (response == -1) return BadRequest("RG inválido!");
            else if (response == -2) return BadRequest("IE inválido!");
            else if (response == -3) return BadRequest("Documento incompleto!");

            await _fiscalService.Create(fiscalDTO);
            return new CreatedAtRouteResult("GetMunicipe", new { id = fiscalDTO.Id }, fiscalDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] FiscalDTO fiscalDTO)
        {
            if (fiscalDTO is null) return BadRequest("Dado inválido!");

            int response = fiscalDTO.CpfCnpj(fiscalDTO.CpfCnpjPessoa);
            if (response == 0) return BadRequest("Documento incorreto!");
            else if (response == -1) return BadRequest("CPF inválido!");
            else if (response == -2) return BadRequest("CNPJ inválido!");
            else if (response == -3) return BadRequest("Documento incompleto!");

            response = fiscalDTO.RgIe(fiscalDTO.RgIePessoa);
            if (response == 0) return BadRequest("Documento incorreto!");
            else if (response == -1) return BadRequest("RG inválido!");
            else if (response == -2) return BadRequest("IE inválido!");
            else if (response == -3) return BadRequest("Documento incompleto!");

            await _fiscalService.Update(fiscalDTO);
            return Ok(fiscalDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MunicipeDTO>> Delete(int id)
        {
            var fiscalDTO = await _fiscalService.GetById(id);
            if (fiscalDTO == null) return NotFound("Fiscal não encontrado!");
            await _fiscalService.Remove(id);
            return Ok(fiscalDTO);
        }

    }
}
