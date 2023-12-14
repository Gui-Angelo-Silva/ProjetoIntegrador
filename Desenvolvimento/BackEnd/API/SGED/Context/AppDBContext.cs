using SGED.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace SGED.Context;
public class AppDBContext : DbContext
{
	public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

	// Mapeamento Relacional dos Objetos no Bando de Dados
	public DbSet<Estado> Estado { get; set; }
	public DbSet<TipoUsuario> TipoUsuario { get; set; }
	public DbSet<Cidade> Cidade { get; set; }
	public DbSet<Usuario> Usuario { get; set; }
	public DbSet<Municipe> Municipe { get; set; }

	// Fluent API
	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{

		// Builder: Estado
		modelBuilder.Entity<Estado>().HasKey(b => b.Id);
		modelBuilder.Entity<Estado>().Property(b => b.NomeEstado).HasMaxLength(50).IsRequired();
		modelBuilder.Entity<Estado>().Property(b => b.UfEstado).HasMaxLength(2).IsRequired();

		// Builder: TipoUsuario
		modelBuilder.Entity<TipoUsuario>().HasKey(b => b.Id);
		modelBuilder.Entity<TipoUsuario>().Property(b => b.NivelAcesso).HasMaxLength(1).IsRequired();
		modelBuilder.Entity<TipoUsuario>().Property(b => b.NomeTipoUsuario).HasMaxLength(20).IsRequired();
		modelBuilder.Entity<TipoUsuario>().Property(b => b.DescricaoTipoUsuario).HasMaxLength(300).IsRequired();

		// Builder: Cidade
		modelBuilder.Entity<Cidade>().HasKey(b => b.Id);
		modelBuilder.Entity<Cidade>().Property(b => b.NomeCidade).HasMaxLength(100).IsRequired();
		modelBuilder.Entity<Cidade>().HasOne(b => b.Estado).WithMany().HasForeignKey(b => b.IdEstado);

		// Relacionamento: Estado -> Cidade
		modelBuilder.Entity<Estado>().HasMany(p => p.Cidades).WithOne(b => b.Estado).IsRequired().OnDelete(DeleteBehavior.Cascade);

		// Builder: Usuario 
		modelBuilder.Entity<Usuario>().HasKey(b => b.Id);
		modelBuilder.Entity<Usuario>().Property(b => b.NomePessoa).HasMaxLength(70).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.EmailPessoa).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.SenhaUsuario).HasMaxLength(50).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.TelefonePessoa).HasMaxLength(15).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.CpfCNPJPessoa).HasMaxLength(18).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.RgIEPessoa).HasMaxLength(15).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.CargoUsuario).HasMaxLength(50).IsRequired();
		modelBuilder.Entity<Usuario>().Property(b => b.StatusUsuario).IsRequired();
		modelBuilder.Entity<Usuario>().HasOne(b => b.TipoUsuario).WithMany().HasForeignKey(b => b.IdTipoUsuario);

		// Relacionamento: TipoUsuario -> Usuario
		modelBuilder.Entity<TipoUsuario>().HasMany(p => p.Usuarios).WithOne(b => b.TipoUsuario).IsRequired().OnDelete(DeleteBehavior.Cascade);

		// Builder: Municipe
		modelBuilder.Entity<Municipe>().HasKey(b => b.Id);
		modelBuilder.Entity<Municipe>().Property(b => b.NomePessoa).HasMaxLength(70).IsRequired();
		modelBuilder.Entity<Municipe>().Property(b => b.EmailPessoa).IsRequired();
		modelBuilder.Entity<Municipe>().Property(b => b.TelefonePessoa).HasMaxLength(15).IsRequired();
		modelBuilder.Entity<Municipe>().Property(b => b.CpfCNPJPessoa).HasMaxLength(18).IsRequired();
		modelBuilder.Entity<Municipe>().Property(b => b.RgIEPessoa).HasMaxLength(15).IsRequired();

		// Inserções:
		modelBuilder.Entity<Estado>().HasData(
			new Estado { Id = 1, NomeEstado = "Acre", UfEstado = "AC" },
			new Estado { Id = 2, NomeEstado = "Alagoas", UfEstado = "AL" },
			new Estado { Id = 3, NomeEstado = "Amapá", UfEstado = "AP" },
			new Estado { Id = 4, NomeEstado = "Amazonas", UfEstado = "AM" },
			new Estado { Id = 5, NomeEstado = "Bahia", UfEstado = "BA" },
			new Estado { Id = 6, NomeEstado = "Ceará", UfEstado = "CE" },
			new Estado { Id = 7, NomeEstado = "Distrito Federal", UfEstado = "DF" },
			new Estado { Id = 8, NomeEstado = "Espírito Santo", UfEstado = "ES" },
			new Estado { Id = 9, NomeEstado = "Goiás", UfEstado = "GO" },
			new Estado { Id = 10, NomeEstado = "Maranhão", UfEstado = "MA" },
			new Estado { Id = 11, NomeEstado = "Mato Grosso", UfEstado = "MT" },
			new Estado { Id = 12, NomeEstado = "Mato Grosso do Sul", UfEstado = "MS" },
			new Estado { Id = 13, NomeEstado = "Minas Gerais", UfEstado = "MG" },
			new Estado { Id = 14, NomeEstado = "Pará", UfEstado = "PA" },
			new Estado { Id = 15, NomeEstado = "Paraíba", UfEstado = "PB" },
			new Estado { Id = 16, NomeEstado = "Paraná", UfEstado = "PR" },
			new Estado { Id = 17, NomeEstado = "Pernambuco", UfEstado = "PE" },
			new Estado { Id = 18, NomeEstado = "Piauí", UfEstado = "PI" },
			new Estado { Id = 19, NomeEstado = "Rio de Janeiro", UfEstado = "RJ" },
			new Estado { Id = 20, NomeEstado = "Rio Grande do Norte", UfEstado = "RN" },
			new Estado { Id = 21, NomeEstado = "Rio Grande do Sul", UfEstado = "RS" },
			new Estado { Id = 22, NomeEstado = "Rondônia", UfEstado = "RO" },
			new Estado { Id = 23, NomeEstado = "Roraima", UfEstado = "RR" },
			new Estado { Id = 24, NomeEstado = "Santa Catarina", UfEstado = "SC" },
			new Estado { Id = 25, NomeEstado = "São Paulo", UfEstado = "SP" },
			new Estado { Id = 26, NomeEstado = "Sergipe", UfEstado = "SE" },
			new Estado { Id = 27, NomeEstado = "Tocantins", UfEstado = "TO" }
		);

		modelBuilder.Entity<Cidade>().HasData(
			new Cidade { Id = 1, NomeCidade = "Jales", IdEstado = 25 },
			new Cidade { Id = 2, NomeCidade = "Santa Fé do Sul", IdEstado = 25 },
			new Cidade { Id = 3, NomeCidade = "Aparecida d'Oeste", IdEstado = 25 },
			new Cidade { Id = 4, NomeCidade = "São Francisco", IdEstado = 25 },
			new Cidade { Id = 5, NomeCidade = "Urânia", IdEstado = 25 },
			new Cidade { Id = 6, NomeCidade = "Palmeira d'Oeste", IdEstado = 25 },
			new Cidade { Id = 7, NomeCidade = "Santa Clara d'Oeste", IdEstado = 25 },
			new Cidade { Id = 8, NomeCidade = "Paranapuã", IdEstado = 25 },
			new Cidade { Id = 9, NomeCidade = "Rubineia", IdEstado = 25 },
			new Cidade { Id = 10, NomeCidade = "São João das Duas Pontes", IdEstado = 25 }
		);

		modelBuilder.Entity<TipoUsuario>().HasData(
			new TipoUsuario { Id = 1, NomeTipoUsuario = "Desenvolvedor", NivelAcesso = "A", DescricaoTipoUsuario = "Entidade voltada ao time de desenvolvimento para uso da plataforma durante testes." },
			new TipoUsuario { Id = 2, NomeTipoUsuario = "Administrador", NivelAcesso = "A", DescricaoTipoUsuario = "Entidade administrativa do orgão da Secretária." },
			new TipoUsuario { Id = 3, NomeTipoUsuario = "Funcionário", NivelAcesso = "B", DescricaoTipoUsuario = "Entidade de suporte para a comunidade local." },
			new TipoUsuario { Id = 4, NomeTipoUsuario = "Jurídico", NivelAcesso = "C", DescricaoTipoUsuario = "Entidade que representa empresas, instituições ou qualquer entidade jurídica perante a lei." },
			new TipoUsuario { Id = 5, NomeTipoUsuario = "Físico", NivelAcesso = "D", DescricaoTipoUsuario = "Entidade que representa todos os munícipes da cidade." }
		);

		modelBuilder.Entity<Usuario>().HasData(
			new Usuario { Id = 1, NomePessoa = "Dev", EmailPessoa = "devops@development.com", SenhaUsuario = "123456", TelefonePessoa = "(00) 00000-0000", CpfCNPJPessoa = "000.000.000-00", RgIEPessoa = "00.000.000-0", CargoUsuario = "Desenvolvimento", StatusUsuario = true, IdTipoUsuario = 1 },
			new Usuario { Id = 2, NomePessoa = "Secretário Geral", EmailPessoa = "admin@gmail.com", SenhaUsuario = "987654", TelefonePessoa = "(00) 00000-0000", CpfCNPJPessoa = "000.000.000-00", RgIEPessoa = "00.000.000-0", CargoUsuario = "Secretário Geral", StatusUsuario = true, IdTipoUsuario = 2 }
		);
	}
}
