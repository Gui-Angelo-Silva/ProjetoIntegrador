using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.DTO.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<EstadoDTO, Estado>();
            CreateMap<Estado, EstadoDTO>().ReverseMap();

            CreateMap<TipoUsuarioDTO, TipoUsuario>();
            CreateMap<TipoUsuario, TipoUsuarioDTO>().ReverseMap();

            CreateMap<CidadeDTO, Cidade>();
            CreateMap<Cidade, CidadeDTO>().ReverseMap();

            CreateMap<UsuarioDTO, Usuario>();
            CreateMap<Usuario, UsuarioDTO>().ReverseMap();
        }
    }
}