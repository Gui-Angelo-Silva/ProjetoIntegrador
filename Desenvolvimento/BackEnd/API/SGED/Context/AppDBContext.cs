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
    public DbSet<Pessoa> Pessoa { get; set; }

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

        // Relacionamento: Estado -> Cidade
        modelBuilder.Entity<Estado>().HasMany(p => p.Cidades).WithOne(b => b.Estado).IsRequired().OnDelete(DeleteBehavior.Cascade);

        // Builder: Pessoa 
        modelBuilder.Entity<Pessoa>().HasKey(b => b.Id);
        modelBuilder.Entity<Pessoa>().Property(b => b.Nome).HasMaxLength(70).IsRequired();
        modelBuilder.Entity<Pessoa>().Property(b => b.Email).HasMaxLength(50).IsRequired();
        modelBuilder.Entity<Pessoa>().Property(b => b.Senha).HasMaxLength(300).IsRequired();
        modelBuilder.Entity<Pessoa>().Property(b => b.Telefone).HasMaxLength(15).IsRequired();
        modelBuilder.Entity<Pessoa>().Property(b => b.CpfCNPJ).HasMaxLength(20).IsRequired();
        modelBuilder.Entity<Pessoa>().Property(b => b.RgIE).HasMaxLength(20).IsRequired();

    }


}
