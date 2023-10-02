using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.DTO.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EstadoDTO, Estado>().ReverseMap();
            CreateMap<TipoUsuarioDTO, TipoUsuario>().ReverseMap();
        }
    }
}