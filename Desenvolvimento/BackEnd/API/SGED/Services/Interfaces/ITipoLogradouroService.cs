﻿using SGED.Objects.DTOs.Entities;

namespace SGED.Services.Interfaces
{
    public interface ITipoLogradouroService
	{
		Task<IEnumerable<TipoLogradouroDTO>> GetAll();
		Task<TipoLogradouroDTO> GetById(int id);
		Task Create(TipoLogradouroDTO tipoLogradouroDTO);
		Task Update(TipoLogradouroDTO tipoLogradouroDTO);
		Task Remove(int id);
	}
}
