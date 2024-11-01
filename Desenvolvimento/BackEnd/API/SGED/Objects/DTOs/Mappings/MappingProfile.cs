using AutoMapper;
using Newtonsoft.Json;
using SGED.Objects.DTOs.Entities;
using SGED.Objects.Models.Entities;
using SGED.Objects.Utilities;

namespace SGED.Objects.DTOs.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Classes do Sistema:


            // Objetos de Pessoa:

            CreateMap<MunicipeDTO, MunicipeModel>();
            CreateMap<MunicipeModel, MunicipeDTO>().ReverseMap();

            CreateMap<EngenheiroDTO, EngenheiroModel>();
            CreateMap<EngenheiroModel, EngenheiroDTO>().ReverseMap();

            CreateMap<FiscalDTO, FiscalModel>();
            CreateMap<FiscalModel, FiscalDTO>().ReverseMap();

            CreateMap<TipoUsuarioDTO, TipoUsuarioModel>();
            CreateMap<TipoUsuarioModel, TipoUsuarioDTO>().ReverseMap();

            CreateMap<UsuarioDTO, UsuarioModel>();
            CreateMap<UsuarioModel, UsuarioDTO>().ReverseMap();


            // Objetos de Imóvel:

            CreateMap<EstadoDTO, EstadoModel>();
            CreateMap<EstadoModel, EstadoDTO>().ReverseMap();

            CreateMap<CidadeDTO, CidadeModel>();
            CreateMap<CidadeModel, CidadeDTO>().ReverseMap();

            CreateMap<BairroDTO, BairroModel>();
            CreateMap<BairroModel, BairroDTO>().ReverseMap();

            CreateMap<TipoLogradouroDTO, TipoLogradouroModel>();
            CreateMap<TipoLogradouroModel, TipoLogradouroDTO>().ReverseMap();

            CreateMap<LogradouroDTO, LogradouroModel>();
            CreateMap<LogradouroModel, LogradouroDTO>().ReverseMap();

            CreateMap<ImovelDTO, ImovelModel>();
            CreateMap<ImovelModel, ImovelDTO>().ReverseMap();


            // Objetos de Alimentação do Imóvel:

            CreateMap<TopografiaDTO, TopografiaModel>();
            CreateMap<TopografiaModel, TopografiaDTO>().ReverseMap();

            CreateMap<UsoDTO, UsoModel>();
            CreateMap<UsoModel, UsoDTO>().ReverseMap();

            CreateMap<OcupacaoAtualDTO, OcupacaoAtualModel>();
            CreateMap<OcupacaoAtualModel, OcupacaoAtualDTO>().ReverseMap();

            CreateMap<TipoInfraestruturaDTO, TipoInfraestruturaModel>();
            CreateMap<TipoInfraestruturaModel, TipoInfraestruturaDTO>().ReverseMap();

            CreateMap<InfraestruturaDTO, InfraestruturaModel>();
            CreateMap<InfraestruturaModel, InfraestruturaDTO>().ReverseMap();

            CreateMap<InstalacaoDTO, InstalacaoModel>();
            CreateMap<InstalacaoModel, InstalacaoDTO>().ReverseMap();


            // Objetos de Processo:

            CreateMap<TipoProcessoDTO, TipoProcessoModel>();
            CreateMap<TipoProcessoModel, TipoProcessoDTO>().ReverseMap();

            CreateMap<EtapaDTO, EtapaModel>();
            CreateMap<EtapaModel, EtapaDTO>().ReverseMap();

            CreateMap<TipoDocumentoDTO, TipoDocumentoModel>();
            CreateMap<TipoDocumentoModel, TipoDocumentoDTO>().ReverseMap();

            CreateMap<TipoDocumentoEtapaDTO, TipoDocumentoEtapaModel>();
            CreateMap<TipoDocumentoEtapaModel, TipoDocumentoEtapaDTO>().ReverseMap();

            CreateMap<ProcessoDTO, ProcessoModel>();
            CreateMap<ProcessoModel, ProcessoDTO>().ReverseMap();

            // Mapeamento de DocumentoProcessoDTO para DocumentoProcessoModel - converte o objeto Arquivo em JSON
            CreateMap<DocumentoProcessoDTO, DocumentoProcessoModel>()
                .ForMember(dest => dest.Arquivo,
                           opt => opt.MapFrom(src => JsonConvert.SerializeObject(src.Arquivo)));

            // Mapeamento de DocumentoProcessoModel para DocumentoProcessoDTO - converte JSON para o objeto Arquivo
            CreateMap<DocumentoProcessoModel, DocumentoProcessoDTO>()
                .ForMember(dest => dest.Arquivo,
                           opt => opt.MapFrom(src => JsonConvert.DeserializeObject<Archive>(src.Arquivo)))
                .ReverseMap();  // Permite a conversão reversa automática


            // Objetos do Servidor:

            CreateMap<SessaoDTO, SessaoModel>();
            CreateMap<SessaoModel, SessaoDTO>().ReverseMap();

            CreateMap<AuditoriaDTO, AuditoriaModel>();
            CreateMap<AuditoriaModel, AuditoriaDTO>().ReverseMap();

            // Objetos da Configuração

            CreateMap<ConfiguracaoDTO, ConfiguracaoModel>();
            CreateMap<ConfiguracaoModel, ConfiguracaoDTO>().ReverseMap();
        }
    }
}