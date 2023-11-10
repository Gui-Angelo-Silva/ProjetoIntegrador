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
        modelBuilder.Entity<Usuario>().Property(b => b.NomeUsuario).HasMaxLength(70).IsRequired();
        modelBuilder.Entity<Usuario>().Property(b => b.EmailUsuario).IsRequired();
        modelBuilder.Entity<Usuario>().Property(b => b.SenhaUsuario).HasMaxLength(50).IsRequired();
        modelBuilder.Entity<Usuario>().Property(b => b.CargoUsuario).HasMaxLength(50).IsRequired();
        modelBuilder.Entity<Usuario>().Property(b => b.StatusUsuario).IsRequired();
        modelBuilder.Entity<Usuario>().HasOne(b => b.TipoUsuario).WithMany().HasForeignKey(b => b.IdTipoUsuario);

        // Relacionamento: TipoUsuario -> Usuario
        modelBuilder.Entity<TipoUsuario>().HasMany(p => p.Usuarios).WithOne(b => b.TipoUsuario).IsRequired().OnDelete(DeleteBehavior.Cascade);

        // Builder: Municipe
        modelBuilder.Entity<Municipe>().HasKey(b => b.Id);
        modelBuilder.Entity<Municipe>().Property(b => b.NomePessoa).HasMaxLength(70).IsRequired();
        modelBuilder.Entity<Municipe>().Property(b => b.EmailPessoa).IsRequired();
        modelBuilder.Entity<Municipe>().Property(b => b.TelefonePessoa).HasMaxLength(19).IsRequired();
        modelBuilder.Entity<Municipe>().Property(b => b.CpfCNPJPessoa).HasMaxLength(18).IsRequired();
        modelBuilder.Entity<Municipe>().Property(b => b.RgIEPessoa).HasMaxLength(15).IsRequired();



        // Inserções:
        modelBuilder.Entity<Estado>().HasData(
            new Estado
            {
                NomeEstado = "São Paulo",
                UfEstado = "SP"
            });

        modelBuilder.Entity<Cidade>().HasData(
           new Cidade
           {
               NomeCidade = "Jales",
               IdEstado = 1
           });

        modelBuilder.Entity<TipoUsuario>().HasData(
            new TipoUsuario
            {
                NomeTipoUsuario = "Desenvolvedor",
                NivelAcesso = "A",
                DescricaoTipoUsuario = "Pode efetuar todas as funcionalidades disponíveis. Voltado ao time de desenvolvimento."
            },
           new TipoUsuario
           {
               NomeTipoUsuario = "Secretário Geral",
               NivelAcesso = "A",
               DescricaoTipoUsuario = "Pode efetuar todas as funcionalidades disponíveis."
           },
           new TipoUsuario
           {
               NomeTipoUsuario = "Secretário",
               NivelAcesso = "B",
               DescricaoTipoUsuario = "Pode efetuar todas as funcionalidades disponíveis, porém com auditoria de ações."
           },
           new TipoUsuario
           {
               NomeTipoUsuario = "Jurídico",
               NivelAcesso = "C",
               DescricaoTipoUsuario = "Apenas pode vizualidar informações."
           },
           new TipoUsuario
           {
               NomeTipoUsuario = "Físico",
               NivelAcesso = "D",
               DescricaoTipoUsuario = "Apenas pode vizualidar informações, porém dados sensíveis são mascarados."
           });

        modelBuilder.Entity<Usuario>().HasData(
           new Usuario
           {
               NomeUsuario = "Dev",
               EmailUsuario = "devops@developtment.com",
               SenhaUsuario = "123456",
               CargoUsuario = "Desenvolvimento",
               StatusUsuario = true,
               IdTipoUsuario = 1
           });
    }
}
