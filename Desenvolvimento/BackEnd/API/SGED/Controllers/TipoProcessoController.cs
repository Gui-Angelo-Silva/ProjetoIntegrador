//using SGED.DTO.Entities;
//using SGED.Services.Entities;
//using SGED.Services.Interfaces;
//using Microsoft.AspNetCore.Mvc;
//using System.Reflection.Metadata.Ecma335;
//using Microsoft.AspNetCore.Authorization;

//namespace SGED.Controllers
//{

//    [Route("api/[controller]")]
//    [ApiController]
//    //[Authorize("ApiScope")]
//    public class TipoProcessoController : Controller
//    {

//        private readonly ITipoProcessoService _TipoProcessoService;

//        public TipoProcessoController(ITipoProcessoService TipoProcessoService)
//        {
//            _TipoProcessoService = TipoProcessoService;
//        }

//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<TipoProcessoDTO>>> Get()
//        {
//            var TipoProcessosDTO = await _TipoProcessoService.GetAll();
//            if (!TipoProcessosDTO.Any()) return NotFound("TipoProcessos não encontradas!");
//            return Ok(TipoProcessosDTO);
//        }

//        [HttpGet("{id}", Name = "GetTipoProcesso")]
//        public async Task<ActionResult<TipoProcessoDTO>> Get(int id)
//        {
//            var TipoProcessoDTO = await _TipoProcessoService.GetById(id);
//            if (TipoProcessoDTO == null) return NotFound("TipoProcesso não encontrada");
//            return Ok(TipoProcessoDTO);
//        }

//        [HttpPost]
//        public async Task<ActionResult> Post([FromBody] TipoProcessoDTO TipoProcessoDTO)
//        {
//            if (TipoProcessoDTO is null) return BadRequest("Dado inválido!");
//            await _TipoProcessoService.Create(TipoProcessoDTO);
//            return new CreatedAtRouteResult("GetTipoProcesso", new { id = TipoProcessoDTO.Id }, TipoProcessoDTO);
//        }

//        [HttpPut()]
//        public async Task<ActionResult> Put([FromBody] TipoProcessoDTO TipoProcessoDTO)
//        {
//            if (TipoProcessoDTO is null) return BadRequest("Dado invalido!");
//            await _TipoProcessoService.Update(TipoProcessoDTO);
//            return Ok(TipoProcessoDTO);
//        }

//        [HttpDelete("{id}")]
//        public async Task<ActionResult<TipoProcessoDTO>> Delete(int id)
//        {
//            var TipoProcessoDTO = await _TipoProcessoService.GetById(id);
//            if (TipoProcessoDTO == null) return NotFound("TipoProcesso não econtrado!");
//            await _TipoProcessoService.Remove(id);
//            return Ok(TipoProcessoDTO);
//        }
//    }
//}