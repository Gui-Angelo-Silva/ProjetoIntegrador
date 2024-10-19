using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class EstadoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<EstadoModel>().HasKey(e => e.Id);
            modelBuilder.Entity<EstadoModel>().Property(e => e.NomeEstado).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<EstadoModel>().Property(e => e.UfEstado).HasMaxLength(2).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<EstadoModel>().HasKey(e => e.Id);


            // Inserções
            modelBuilder.Entity<EstadoModel>().HasData(
                new EstadoModel { Id = 1, NomeEstado = "São Paulo", UfEstado = "SP" },
                new EstadoModel { Id = 2, NomeEstado = "Alagoas", UfEstado = "AL" },
                new EstadoModel { Id = 3, NomeEstado = "Amapá", UfEstado = "AP" },
                new EstadoModel { Id = 4, NomeEstado = "Amazonas", UfEstado = "AM" },
                new EstadoModel { Id = 5, NomeEstado = "Bahia", UfEstado = "BA" },
                new EstadoModel { Id = 6, NomeEstado = "Ceará", UfEstado = "CE" },
                new EstadoModel { Id = 7, NomeEstado = "Distrito Federal", UfEstado = "DF" },
                new EstadoModel { Id = 8, NomeEstado = "Espírito Santo", UfEstado = "ES" },
                new EstadoModel { Id = 9, NomeEstado = "Goiás", UfEstado = "GO" },
                new EstadoModel { Id = 10, NomeEstado = "Maranhão", UfEstado = "MA" },
                new EstadoModel { Id = 11, NomeEstado = "Mato Grosso", UfEstado = "MT" },
                new EstadoModel { Id = 12, NomeEstado = "Mato Grosso do Sul", UfEstado = "MS" },
                new EstadoModel { Id = 13, NomeEstado = "Minas Gerais", UfEstado = "MG" },
                new EstadoModel { Id = 14, NomeEstado = "Pará", UfEstado = "PA" },
                new EstadoModel { Id = 15, NomeEstado = "Paraíba", UfEstado = "PB" },
                new EstadoModel { Id = 16, NomeEstado = "Paraná", UfEstado = "PR" },
                new EstadoModel { Id = 17, NomeEstado = "Pernambuco", UfEstado = "PE" },
                new EstadoModel { Id = 18, NomeEstado = "Piauí", UfEstado = "PI" },
                new EstadoModel { Id = 19, NomeEstado = "Rio de Janeiro", UfEstado = "RJ" },
                new EstadoModel { Id = 20, NomeEstado = "Rio Grande do Norte", UfEstado = "RN" },
                new EstadoModel { Id = 21, NomeEstado = "Rio Grande do Sul", UfEstado = "RS" },
                new EstadoModel { Id = 22, NomeEstado = "Rondônia", UfEstado = "RO" },
                new EstadoModel { Id = 23, NomeEstado = "Roraima", UfEstado = "RR" },
                new EstadoModel { Id = 24, NomeEstado = "Santa Catarina", UfEstado = "SC" },
                new EstadoModel { Id = 25, NomeEstado = "Acre", UfEstado = "AC" },
                new EstadoModel { Id = 26, NomeEstado = "Sergipe", UfEstado = "SE" },
                new EstadoModel { Id = 27, NomeEstado = "Tocantins", UfEstado = "TO" }
            );
        }
    }

}
