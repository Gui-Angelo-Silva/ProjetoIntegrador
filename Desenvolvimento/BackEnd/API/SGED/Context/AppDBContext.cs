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
            new Estado { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" }
        );

        modelBuilder.Entity<Cidade>().HasData(
            new Cidade { Id = 1, NomeCidade = "Jales", IdEstado = 1 }
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
