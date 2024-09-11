using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class EstadoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Estado>().HasKey(e => e.Id);
            modelBuilder.Entity<Estado>().Property(e => e.NomeEstado).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Estado>().Property(e => e.UfEstado).HasMaxLength(2).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<Estado>().HasKey(e => e.Id);


            // Inserções
            modelBuilder.Entity<Estado>().HasData(
                new Estado { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" },
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
                new Estado { Id = 25, NomeEstado = "Acre", UfEstado = "AC" },
                new Estado { Id = 26, NomeEstado = "Sergipe", UfEstado = "SE" },
                new Estado { Id = 27, NomeEstado = "Tocantins", UfEstado = "TO" }
            );
        }
    }

}
