using AutoMapper;
using SGED.Objects.DTO.Entities;
using SGED.Objects.DTO.Searchs;
using SGED.Objects.Models.Entities;

namespace SGED.Objects.DTO.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Classes do Sistema:


            // Objetos de Pessoa:

            CreateMap<MunicipeDTO, Municipe>();
            CreateMap<Municipe, MunicipeDTO>().ReverseMap();

            CreateMap<EngenheiroDTO, Engenheiro>();
            CreateMap<Engenheiro, EngenheiroDTO>().ReverseMap();

            CreateMap<FiscalDTO, Fiscal>();
            CreateMap<Fiscal, FiscalDTO>().ReverseMap();

            CreateMap<TipoUsuarioDTO, TipoUsuario>();
            CreateMap<TipoUsuario, TipoUsuarioDTO>().ReverseMap();

            CreateMap<UsuarioDTO, Usuario>();
            CreateMap<Usuario, UsuarioDTO>().ReverseMap();


            // Objetos de Imóvel:

            CreateMap<EstadoDTO, Estado>();
            CreateMap<Estado, EstadoDTO>().ReverseMap();

            CreateMap<CidadeDTO, Cidade>();
            CreateMap<Cidade, CidadeDTO>().ReverseMap();

            CreateMap<BairroDTO, Bairro>();
            CreateMap<Bairro, BairroDTO>().ReverseMap();

            CreateMap<TipoLogradouroDTO, TipoLogradouro>();
            CreateMap<TipoLogradouro, TipoLogradouroDTO>().ReverseMap();

            CreateMap<LogradouroDTO, Logradouro>();
            CreateMap<Logradouro, LogradouroDTO>().ReverseMap();

            CreateMap<ImovelDTO, Imovel>();
            CreateMap<Imovel, ImovelDTO>().ReverseMap();


            // Objetos de Alimentação do Imóvel:

            CreateMap<TopografiaDTO, Topografia>();
            CreateMap<Topografia, TopografiaDTO>().ReverseMap();

            CreateMap<UsoDTO, Uso>();
            CreateMap<Uso, UsoDTO>().ReverseMap();

            CreateMap<OcupacaoAtualDTO, OcupacaoAtual>();
            CreateMap<OcupacaoAtual, OcupacaoAtualDTO>().ReverseMap();

            CreateMap<TipoInfraestruturaDTO, TipoInfraestrutura>();
            CreateMap<TipoInfraestrutura, TipoInfraestruturaDTO>().ReverseMap();

            CreateMap<InfraestruturaDTO, Infraestrutura>();
            CreateMap<Infraestrutura, InfraestruturaDTO>().ReverseMap();

            CreateMap<InstalacaoDTO, Instalacao>();
            CreateMap<Instalacao, InstalacaoDTO>().ReverseMap();


            // Objetos de Processo:

            CreateMap<TipoProcessoDTO, TipoProcesso>();
            CreateMap<TipoProcesso, TipoProcessoDTO>().ReverseMap();

            CreateMap<EtapaDTO, Etapa>();
            CreateMap<Etapa, EtapaDTO>().ReverseMap();

            CreateMap<TipoDocumentoDTO, TipoDocumento>();
            CreateMap<TipoDocumento, TipoDocumentoDTO>().ReverseMap();

            CreateMap<TipoDocumentoEtapaDTO, TipoDocumentoEtapa>();
            CreateMap<TipoDocumentoEtapa, TipoDocumentoEtapaDTO>().ReverseMap();

            CreateMap<ProcessoDTO, Processo>();
            CreateMap<Processo, ProcessoDTO>().ReverseMap();

            CreateMap<DocumentoProcessoDTO, DocumentoProcesso>();
			CreateMap<DocumentoProcesso, DocumentoProcessoDTO>().ReverseMap();


			// Objetos do Servidor:

			CreateMap<LoginDTO, Login>();
            CreateMap<Login, LoginDTO>().ReverseMap();

            CreateMap<SessaoDTO, Sessao>();
            CreateMap<Sessao, SessaoDTO>().ReverseMap();

            // Objetos da Configuração

            CreateMap<ConfiguracaoDTO, Configuracao>();
            CreateMap<Configuracao, ConfiguracaoDTO>().ReverseMap();


            // Objetos de Pesquisa

            CreateMap<LogradouroSearch, Logradouro>();
            CreateMap<Logradouro, LogradouroSearch>().ReverseMap();

            CreateMap<BairroSearch, Bairro>();
            CreateMap<Bairro, BairroSearch>().ReverseMap();

            CreateMap<CidadeSearch, Cidade>();
            CreateMap<Cidade, CidadeSearch>().ReverseMap();

            CreateMap<EstadoSearch, Estado>();
            CreateMap<Estado, EstadoSearch>().ReverseMap();
        }
    }
}