using Microsoft.EntityFrameworkCore;
using SGED.Context.Builders;
using SGED.Objects.Models.Entities;

namespace SGED.Context;
public class AppDBContext : DbContext
{
	public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

	// Mapeamento Relacional dos Objetos no Bando de Dados

	public DbSet<Configuracao> Configuracao { get; set; }

	// Conjunto: Pessoa
	public DbSet<Municipe> Municipe { get; set; }
	public DbSet<Engenheiro> Engenheiro { get; set; }
	public DbSet<Fiscal> Fiscal { get; set; }
	public DbSet<TipoUsuario> TipoUsuario { get; set; }
	public DbSet<Usuario> Usuario { get; set; }
	public DbSet<Sessao> Sessao { get; set; }

	// Conjunto: Imóvel
	public DbSet<Estado> Estado { get; set; }
	public DbSet<Cidade> Cidade { get; set; }
	public DbSet<Bairro> Bairro { get; set; }
	public DbSet<TipoLogradouro> TipoLogradouro { get; set; }
	public DbSet<Logradouro> Logradouro { get; set; }
	public DbSet<Topografia> Topografia { get; set; }
	public DbSet<Uso> Uso { get; set; }
	public DbSet<OcupacaoAtual> OcupacaoAtual { get; set; }
	public DbSet<TipoInfraestrutura> TipoInfraestrutura { get; set; }
	public DbSet<Infraestrutura> Infraestrutura { get; set; }
	public DbSet<Instalacao> Instalacao { get; set; }
	public DbSet<Imovel> Imovel { get; set; }

	// Conjunto: Processo
	public DbSet<TipoProcesso> TipoProcesso { get; set; }
	public DbSet<Etapa> Etapa { get; set; }
	public DbSet<TipoDocumento> TipoDocumento { get; set; }
	public DbSet<TipoDocumentoEtapa> TipoDocumentoEtapa { get; set; }
	public DbSet<Processo> Processo { get; set; }
	public DbSet<DocumentoProcesso> DocumentoProcesso { get; set; }

	// Fluent API
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		ConfiguracaoBuilder.Build(modelBuilder);

		// Builders: Conjunto Pessoa
		MunicipeBuilder.Build(modelBuilder);
		EngenheiroBuilder.Build(modelBuilder);
		FiscalBuilder.Build(modelBuilder);
		TipoUsuarioBuilder.Build(modelBuilder);
		UsuarioBuilder.Build(modelBuilder);
		SessaoBuilder.Build(modelBuilder);

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

		// Builders: Conjunto Processo
		TipoProcessoBuilder.Build(modelBuilder);
		EtapaBuilder.Build(modelBuilder);
		TipoDocumentoBuilder.Build(modelBuilder);
		TipoDocumentoEtapaBuilder.Build(modelBuilder);
		ProcessoBuilder.Build(modelBuilder);
		DocumentoProcessoBuilder.Build(modelBuilder);
	}
}
