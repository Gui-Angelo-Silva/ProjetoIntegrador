using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TopografiaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TopografiaModel>().Property(t => t.Id);
            modelBuilder.Entity<TopografiaModel>().Property(t => t.NomeTopografia).HasMaxLength(50).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<TopografiaModel>().HasKey(t => t.Id);


            // Inserções
            modelBuilder.Entity<TopografiaModel>().HasData(
                new TopografiaModel { Id = 1, NomeTopografia = "Plano" },
                new TopografiaModel { Id = 2, NomeTopografia = "Aclive" },
                new TopografiaModel { Id = 3, NomeTopografia = "Declive" },
                new TopografiaModel { Id = 4, NomeTopografia = "Irregular" }
            );
        }
    }

}
