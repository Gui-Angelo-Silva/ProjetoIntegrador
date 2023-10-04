using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.DTO.Mappings
{
    public class MappingEstado : Profile
    {
        public MappingEstado()
        {
            CreateMap<EstadoDTO, Estado>();
        }
    }
}