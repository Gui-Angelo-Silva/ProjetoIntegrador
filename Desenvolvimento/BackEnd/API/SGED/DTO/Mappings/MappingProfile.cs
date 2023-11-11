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

            CreateMap<EstadoCidadeDTO, Estado>();
            CreateMap<Estado, EstadoCidadeDTO>().ReverseMap();

            CreateMap<TipoUsuarioDTO, TipoUsuario>();
            CreateMap<TipoUsuario, TipoUsuarioDTO>().ReverseMap();

            CreateMap<PessoaDTO, Pessoa>();
            CreateMap<Pessoa, PessoaDTO>().ReverseMap();

            CreateMap<CidadeDTO, Cidade>();
            CreateMap<Cidade, CidadeDTO>().ReverseMap();

            CreateMap<CidadeEstadoDTO, Cidade>();
            CreateMap<Cidade, CidadeEstadoDTO>().ReverseMap();

            CreateMap<UsuarioDTO, Usuario>();
            CreateMap<Usuario, UsuarioDTO>().ReverseMap();

            CreateMap<LoginDTO, Login>();
            CreateMap<Login, LoginDTO>().ReverseMap();

            CreateMap<MunicipeDTO, Municipe>();
            CreateMap<Municipe, MunicipeDTO>().ReverseMap();
        }
    }
}