﻿using SGED.DTO.Entities;
using SGED.Services.Entities;
using SGED.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using Microsoft.AspNetCore.Authorization;

namespace SGED.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    //[Authorize("ApiScope")]
    public class TipoProcessoEtapa : Controller
    {

        private readonly ITipoProcessoEtapaService _TipoProcessoEtapaService;

        public TipoProcessoEtapa(ITipoProcessoEtapaService TipoProcessoEtapaService)
        {
			_TipoProcessoEtapaService = TipoProcessoEtapaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoProcessoEtapaDTO>>> Get()
        {
            var tipoProcessoEtapaDTO = await _TipoProcessoEtapaService.GetAll();
            return Ok(tipoProcessoEtapasDTO);
        }

        [HttpGet("{id}", Name = "GetBairro")]
        public async Task<ActionResult<BairroDTO>> Get(int id)
        {
            var TipoProcessoEtapaDTO = await _TipoProcessoEtapaService.GetById(id);
            if (TipoProcessoEtapaDTO == null) return NotFound("TipoProcessoEtapa não encontrado");
            return Ok(TipoProcessoEtapaDTO);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TipoProcessoEtapaDTO TipoProcessoEtapaDTO)
        {
            if (TipoProcessoEtapaDTO is null) return BadRequest("Dado inválido!");
            await _TipoProcessoEtapaService.Create(TipoProcessoEtapaDTO);
            return new CreatedAtRouteResult("GetTipoProcessoEtapa", new { id = TipoProcessoEtapaDTO.Id }, TipoProcessoEtapaDTO);
        }

        [HttpPut()]
        public async Task<ActionResult> Put([FromBody] TipoProcessoEtapaDTO TipoProcessoEtapaDTO)
        {
            if (BairroDTO is null) return BadRequest("Dado invalido!");
            await _BairroService.Update(BairroDTO);
            return Ok(BairroDTO);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TipoProcessoEtapaDTO>> Delete(int id)
        {
            var TipoProcessoEtapaDTO = await _TipoProcessoEtapaService.GetById(id);
            if (TipoProcessoEtapaDTO == null) return NotFound("TipoProcessoEtapa não econtrado!");
            await _TipoProcessoEtapaService.Remove(id);
            return Ok(TipoProcessoEtapaDTO);
        }
    }
}