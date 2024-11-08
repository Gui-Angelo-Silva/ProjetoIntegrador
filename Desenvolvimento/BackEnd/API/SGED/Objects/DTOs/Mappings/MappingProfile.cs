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

            CreateMap<DocumentoProcessoDTO, DocumentoProcessoModel>()
                .ForMember(dest => dest.Arquivo,
                    opt => opt.MapFrom(src => src.Arquivo != null && !IsObjectDefault(src.Arquivo)
                                        ? JsonConvert.SerializeObject(src.Arquivo)
                                        : null));  // Condicional para verificar se o objeto Arquivo tem valor

            CreateMap<DocumentoProcessoModel, DocumentoProcessoDTO>()
                .ForMember(dest => dest.Arquivo,
                    opt => opt.MapFrom(src => !string.IsNullOrEmpty(src.Arquivo) && IsValidJson(src.Arquivo)
                                        ? JsonConvert.DeserializeObject<Archive>(src.Arquivo)
                                        : null));  // Verifica se a string JSON é válida


            // Objetos do Servidor:

            CreateMap<SessaoDTO, SessaoModel>();
            CreateMap<SessaoModel, SessaoDTO>().ReverseMap();

            CreateMap<AuditoriaDTO, AuditoriaModel>();
            CreateMap<AuditoriaModel, AuditoriaDTO>().ReverseMap();

            // Objetos da Configuração

            CreateMap<ConfiguracaoDTO, ConfiguracaoModel>();
            CreateMap<ConfiguracaoModel, ConfiguracaoDTO>().ReverseMap();
        }

        // Função para verificar se o objeto é o valor padrão (new)
        private bool IsObjectDefault(Archive arquivo)
        {
            return arquivo == null || (arquivo.Hash == null && arquivo.Bytes == null && arquivo.FileName == null && arquivo.MimeType == null);
        }



        // Função para verificar se a string JSON é válida
        private bool IsValidJson(string str)
        {
            str = str.Trim();
            return str.StartsWith("{") && str.EndsWith("}") // Simples verificação para checar se é um objeto JSON válido
                   || str.StartsWith("[") && str.EndsWith("]"); // Caso também seja um array JSON
        }
    }
}