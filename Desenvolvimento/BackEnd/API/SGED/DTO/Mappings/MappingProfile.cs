using AutoMapper;
using SGED.DTO.Entities;
using SGED.Models.Entities;

namespace SGED.DTO.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Classes do Sistema:

            CreateMap<EstadoDTO, Estado>();
            CreateMap<Estado, EstadoDTO>().ReverseMap();

			CreateMap<EngenheiroDTO, Engenheiro>();
			CreateMap<Engenheiro, EngenheiroDTO>().ReverseMap();

			CreateMap<TipoUsuarioDTO, TipoUsuario>();
            CreateMap<TipoUsuario, TipoUsuarioDTO>().ReverseMap();

            CreateMap<PessoaDTO, Pessoa>();
            CreateMap<Pessoa, PessoaDTO>().ReverseMap();

            CreateMap<FiscalDTO, Fiscal>();
            CreateMap<Fiscal, FiscalDTO>().ReverseMap();

            CreateMap<CidadeDTO, Cidade>();
            CreateMap<Cidade, CidadeDTO>().ReverseMap();

            CreateMap<UsuarioDTO, Usuario>();
            CreateMap<Usuario, UsuarioDTO>().ReverseMap();

            CreateMap<MunicipeDTO, Municipe>();
            CreateMap<Municipe, MunicipeDTO>().ReverseMap();

            CreateMap<TipoLogradouroDTO, TipoLogradouro>();
            CreateMap<TipoLogradouro, TipoLogradouroDTO>().ReverseMap();

            CreateMap<BairroDTO, Bairro>();
            CreateMap<Bairro, BairroDTO>().ReverseMap();

            CreateMap<TipoProcessoDTO, TipoProcesso>();
            CreateMap<TipoProcesso, TipoProcessoDTO>().ReverseMap();

            CreateMap<LogradouroDTO, Logradouro>();
            CreateMap<Logradouro, LogradouroDTO>().ReverseMap();

            CreateMap<TipoDocumentoDTO, TipoDocumento>();   
            CreateMap<TipoDocumento, TipoDocumentoDTO>().ReverseMap();

            CreateMap<EtapaDTO, Etapa>();
            CreateMap<Etapa, EtapaDTO>().ReverseMap();  

            CreateMap<ImovelDTO, Imovel>(); 
            CreateMap<Imovel, ImovelDTO>().ReverseMap();


            // Objetos do Servidor:

            CreateMap<LoginDTO, Login>();
            CreateMap<Login, LoginDTO>().ReverseMap();

            CreateMap<SessaoDTO, Sessao>();
            CreateMap<Sessao, SessaoDTO>().ReverseMap();
        }
    }
}