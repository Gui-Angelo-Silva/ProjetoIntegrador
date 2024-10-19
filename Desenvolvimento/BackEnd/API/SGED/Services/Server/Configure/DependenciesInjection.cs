using SGED.Objects.Models.Entities;
using SGED.Repositories.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Entities;
using SGED.Services.Interfaces;
using SGED.Services.Server.Tasks;

namespace SGED.Services.Server
{
    public static class DependenciesInjection
    {
        // Método de extensão para registrar as dependências relacionadas a usuários.
        public static void InjectDependencies(this IServiceCollection services)
        {
            // Conjunto: Configuração

            // Dependência: Configuração
            services.AddScoped<IConfiguracaoRepository, ConfiguracaoRepository>();
            services.AddScoped<IConfiguracaoService, ConfiguracaoService>();


            // Conjunto: Servidor

            // Dependência: Sessão
            services.AddScoped<ISessaoRepository, SessaoRepository>();
            services.AddScoped<ISessaoService, SessaoService>();

            // Dependência: Auditoria
            services.AddScoped<IAuditoriaRepository, AuditoriaRepository>();
            services.AddScoped<IAuditoriaService, AuditoriaService>();


            // Conjunto: Pessoa

            // Dependência: Municipe
            services.AddScoped<IMunicipeRepository, MunicipeRepository>();
            services.AddScoped<IMunicipeService, MunicipeService>();

            // Dependência: Fiscal
            services.AddScoped<IFiscalRepository, FiscalRepository>();
            services.AddScoped<IFiscalService, FiscalService>();

            // Dependência: Engenheiro
            services.AddScoped<IEngenheiroRepository, EngenheiroRepository>();
            services.AddScoped<IEngenheiroService, EngenheiroService>();

            // Dependência: Tipo Usuário
            services.AddScoped<ITipoUsuarioRepository, TipoUsuarioRepository>();
            services.AddScoped<ITipoUsuarioService, TipoUsuarioService>();

            // Dependência: Usuário
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();
            services.AddScoped<IUsuarioService, UsuarioService>();


            // Conjunto: Imóvel

            // Dependência: Estado
            services.AddScoped<IEstadoRepository, EstadoRepository>();
            services.AddScoped<IEstadoService, EstadoService>();

            // Dependência: Cidade
            services.AddScoped<ICidadeRepository, CidadeRepository>();
            services.AddScoped<ICidadeService, CidadeService>();

            // Dependência: Bairro
            services.AddScoped<IBairroRepository, BairroRepository>();
            services.AddScoped<IBairroService, BairroService>();

            // Dependência: TipoLogradouro
            services.AddScoped<ITipoLogradouroRepository, TipoLogradouroRepository>();
            services.AddScoped<ITipoLogradouroService, TipoLogradouroService>();

            // Dependência: Logradouro
            services.AddScoped<ILogradouroRepository, LogradouroRepository>();
            services.AddScoped<ILogradouroService, LogradouroService>();

            // Dependência: Imóvel
            services.AddScoped<IImovelRepository, ImovelRepository>();
            services.AddScoped<IImovelService, ImovelService>();


            // Conjunto: Aliemntação do Imóvel

            // Dependência: Topografia
            services.AddScoped<ITopografiaRepository, TopografiaRepository>();
            services.AddScoped<ITopografiaService, TopografiaService>();

            // Dependência: Tipo Uso
            services.AddScoped<IUsoRepository, UsoRepository>();
            services.AddScoped<IUsoService, UsoService>();

            // Dependência: Ocupação Atual
            services.AddScoped<IOcupacaoAtualRepository, OcupacaoAtualRepository>();
            services.AddScoped<IOcupacaoAtualService, OcupacaoAtualService>();

            // Dependência: Tipo Infraestrutura
            services.AddScoped<ITipoInfraestruturaRepository, TipoInfraestruturaRepository>();
            services.AddScoped<ITipoInfraestruturaService, TipoInfraestruturaService>();

            // Dependência: Infraestrutura
            services.AddScoped<IInfraestruturaRepository, InfraestruturaRepository>();
            services.AddScoped<IInfraestruturaService, InfraestruturaService>();

            // Dependência: Instalaçao
            services.AddScoped<IInstalacaoRepository, InstalacaoRepository>();
            services.AddScoped<IInstalacaoService, InstalacaoService>();


            // Conjunto: Processo

            // Dependência: TipoProcesso
            services.AddScoped<ITipoProcessoRepository, TipoProcessoRepository>();
            services.AddScoped<ITipoProcessoService, TipoProcessoService>();

            // Dependência: Etapa
            services.AddScoped<IEtapaRepository, EtapaRepository>();
            services.AddScoped<IEtapaService, EtapaService>();

            // Dependência: Tipo Documento
            services.AddScoped<ITipoDocumentoRepository, TipoDocumentoRepository>();
            services.AddScoped<ITipoDocumentoService, TipoDocumentoService>();

            // Dependência: Processo
            services.AddScoped<IProcessoRepository, ProcessoRepository>();
            services.AddScoped<IProcessoService, ProcessoService>();

            // Dependência: Tipo Documento Etapa
            services.AddScoped<ITipoDocumentoEtapaRepository, TipoDocumentoEtapaRepository>();
            services.AddScoped<ITipoDocumentoEtapaService, TipoDocumentoEtapaService>();

            // Dependência: Documento Processo
            services.AddScoped<IDocumentoProcessoRepository, DocumentoProcessoRepository>();
            services.AddScoped<IDocumentoProcessoService, DocumentoProcessoService>();



            // Conjunto: Servidor

            // Task: Fechar Sessão
            services.AddHostedService<SessionCleanupService>();

            // Task: Remover Sessões
            // services.AddHostedService<RemoveSessionService>();
        }
    }
}