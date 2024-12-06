using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class UsoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<UsoModel>().Property(u => u.Id);
            modelBuilder.Entity<UsoModel>().Property(u => u.NomeUso).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<UsoModel>().Property(u => u.DescricaoUso).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<UsoModel>().HasKey(u => u.Id);


            // Inserções
            modelBuilder.Entity<UsoModel>().HasData(
                new UsoModel { Id = 1, NomeUso = "Residencial", DescricaoUso = "Uso do imóvel para habitação." },
                new UsoModel { Id = 2, NomeUso = "Comercial", DescricaoUso = "Uso do imóvel para atividades comerciais." },
                new UsoModel { Id = 3, NomeUso = "Industrial", DescricaoUso = "Uso do imóvel para atividades industriais." },
                new UsoModel { Id = 4, NomeUso = "Institucional", DescricaoUso = "Uso do imóvel para serviços públicos ou comunitários." },
                new UsoModel { Id = 5, NomeUso = "Misto", DescricaoUso = "Uso do imóvel que combina mais de uma finalidade." }
            );
        }
    }

}
