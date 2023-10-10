using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.DTO.Mappings
{
    public class MappingCidade : Profile
    {
        public MappingCidade()
        {
            CreateMap<CidadeDTO, Cidade>();

            CreateMap<Cidade, CidadeDTO>().ForMember(
                p => p.EstadoDTO,
                options => options.MapFrom(
                        src => src.Estado.Id
                    )
                );
        }
    }
}