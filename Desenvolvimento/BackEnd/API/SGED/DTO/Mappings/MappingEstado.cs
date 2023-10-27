using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.DTO.Mappings
{
    public class MappingEstado : Profile
    {
        public MappingEstado()
        {
            /*
            CreateMap<EstadoDTO, Estado>();
            CreateMap<Estado, EstadoDTO>().ReverseMap();
            */

            // Estudo de Mapping
            CreateMap<Estado, EstadoDTO>()
            .ForMember(dest => dest.CidadesDTO, opt => opt.MapFrom(src => src.Cidades));
            CreateMap<EstadoDTO, Estado>()
                .ForMember(dest => dest.Cidades, opt => opt.MapFrom(src => src.CidadesDTO));
        }
    }
}