using SGED.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace SGED.Context;
public class AppDBContext : DbContext
{
    public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

    // aqui definimos o mapeamento dos objetos relacionais BD
    public DbSet<Estado> Estados { get; set; }

    // aqui usamos Fluent API e não Data Annotations
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Estado>().HasKey(b => b.Id);
        modelBuilder.Entity<Estado>().Property(b => b.NomeEstado).HasMaxLength(50).IsRequired();
        modelBuilder.Entity<Estado>().Property(b => b.UfEstado).HasMaxLength(2).IsRequired();
    }


}
