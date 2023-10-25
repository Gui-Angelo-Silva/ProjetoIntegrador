using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.DTO.Mappings
{
    public class MappingUsuario : Profile
    {
        public MappingUsuario()
        {
            CreateMap<UsuarioDTO, Usuario>();

            CreateMap<Usuario, UsuarioDTO>().ForMember(
                p => p.IdTipoUsuario,
                options => options.MapFrom(
                        src => src.TipoUsuario.Id
                    )
                );
        }
    }
}
