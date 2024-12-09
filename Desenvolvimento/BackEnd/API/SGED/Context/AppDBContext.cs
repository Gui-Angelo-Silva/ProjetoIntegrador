using Microsoft.EntityFrameworkCore;
using SGED.Context.Builders;
using SGED.Objects.Models.Entities;

namespace SGED.Context;
public class AppDBContext : DbContext
{
	public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

    // Mapeamento Relacional dos Objetos no Bando de Dados

    // Conjunto: Configuração
    public DbSet<ConfiguracaoModel> Configuracao { get; set; }

    // Conjunto: Servidor
    public DbSet<SessaoModel> Sessao { get; set; }
    public DbSet<AuditoriaModel> Auditoria { get; set; }

    // Conjunto: Pessoa
    public DbSet<MunicipeModel> Municipe { get; set; }
	public DbSet<EngenheiroModel> Engenheiro { get; set; }
	public DbSet<FiscalModel> Fiscal { get; set; }
	public DbSet<TipoUsuarioModel> TipoUsuario { get; set; }
	public DbSet<UsuarioModel> Usuario { get; set; }

    // Conjunto: Imóvel
    public DbSet<EstadoModel> Estado { get; set; }
	public DbSet<CidadeModel> Cidade { get; set; }
	public DbSet<BairroModel> Bairro { get; set; }
	public DbSet<TipoLogradouroModel> TipoLogradouro { get; set; }
	public DbSet<LogradouroModel> Logradouro { get; set; }
	public DbSet<TopografiaModel> Topografia { get; set; }
	public DbSet<UsoModel> Uso { get; set; }
	public DbSet<OcupacaoAtualModel> OcupacaoAtual { get; set; }
	public DbSet<TipoInfraestruturaModel> TipoInfraestrutura { get; set; }
	public DbSet<InfraestruturaModel> Infraestrutura { get; set; }
	public DbSet<InstalacaoModel> Instalacao { get; set; }
	public DbSet<ImovelModel> Imovel { get; set; }
    public DbSet<CondicaoSolo> CondicaoSolo { get; set; }

    // Conjunto: Processo
    public DbSet<TipoProcessoModel> TipoProcesso { get; set; }
	public DbSet<EtapaModel> Etapa { get; set; }
	public DbSet<TipoDocumentoModel> TipoDocumento { get; set; }
	public DbSet<TipoDocumentoEtapaModel> TipoDocumentoEtapa { get; set; }
	public DbSet<ProcessoModel> Processo { get; set; }
	public DbSet<DocumentoProcessoModel> DocumentoProcesso { get; set; }

	// Fluent API
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		// Builders: Conjunto Configuração
		ConfiguracaoBuilder.Build(modelBuilder);

        // Builders: Conjunto Servidor
        SessaoBuilder.Build(modelBuilder);
        AuditoriaBuilder.Build(modelBuilder);

        // Builders: Conjunto Pessoa
        MunicipeBuilder.Build(modelBuilder);
		EngenheiroBuilder.Build(modelBuilder);
		FiscalBuilder.Build(modelBuilder);
		TipoUsuarioBuilder.Build(modelBuilder);
		UsuarioBuilder.Build(modelBuilder);

        // Builders: Conjunto Imóvel
        EstadoBuilder.Build(modelBuilder);
		CidadeBuilder.Build(modelBuilder);
		BairroBuilder.Build(modelBuilder);
		TipoLogradouroBuilder.Build(modelBuilder);
		LogradouroBuilder.Build(modelBuilder);
		TopografiaBuilder.Build(modelBuilder);
		UsoBuilder.Build(modelBuilder);
		OcupacaoAtualBuilder.Build(modelBuilder);
		TipoInfraestruturaBuilder.Build(modelBuilder);
		InfraestruturaBuilder.Build(modelBuilder);
		InstalacaoBuilder.Build(modelBuilder);
		ImovelBuilder.Build(modelBuilder);
		CondicaoSoloBuilder.Build(modelBuilder);

		// Builders: Conjunto Processo
		TipoProcessoBuilder.Build(modelBuilder);
		EtapaBuilder.Build(modelBuilder);
		TipoDocumentoBuilder.Build(modelBuilder);
		TipoDocumentoEtapaBuilder.Build(modelBuilder);
		ProcessoBuilder.Build(modelBuilder);
		DocumentoProcessoBuilder.Build(modelBuilder);
	}
}
