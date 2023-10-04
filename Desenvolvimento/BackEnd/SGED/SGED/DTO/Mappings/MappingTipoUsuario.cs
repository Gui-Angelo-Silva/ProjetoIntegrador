using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.DTO.Mappings
{
    public class MappingTipoUsuario : Profile
    {
        public MappingTipoUsuario()
        {
            CreateMap<TipoUsuario, TipoUsuarioDTO>();
        }
    }
}