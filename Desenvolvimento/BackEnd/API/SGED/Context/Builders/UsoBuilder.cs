using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class UsoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Uso>().HasKey(u => u.Id);
            modelBuilder.Entity<Uso>().Property(u => u.NomeUso).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Uso>().Property(u => u.DescricaoUso).IsRequired();


            // Inserções
            modelBuilder.Entity<Uso>().HasData(
                new Uso { Id = 1, NomeUso = "Residencial", DescricaoUso = "Uso do imóvel para habitação." },
                new Uso { Id = 2, NomeUso = "Comercial", DescricaoUso = "Uso do imóvel para atividades comerciais." },
                new Uso { Id = 3, NomeUso = "Industrial", DescricaoUso = "Uso do imóvel para atividades industriais." },
                new Uso { Id = 4, NomeUso = "Institucional", DescricaoUso = "Uso do imóvel para serviços públicos ou comunitários." },
                new Uso { Id = 5, NomeUso = "Misto", DescricaoUso = "Uso do imóvel que combina mais de uma finalidade." }
            );
        }
    }

}
