using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class CidadeBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<CidadeModel>().Property(c => c.Id);
            modelBuilder.Entity<CidadeModel>().Property(c => c.NomeCidade).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<CidadeModel>().Property(c => c.IdEstado).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<CidadeModel>().HasKey(c => c.Id);

            // Relacionamento: Estado -> Cidade
            modelBuilder.Entity<CidadeModel>()
                .HasOne(c => c.Estado)
                .WithMany(e => e.Cidades)
                .HasForeignKey(c => c.IdEstado)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
            modelBuilder.Entity<CidadeModel>().HasData(
                new CidadeModel { Id = 1, NomeCidade = "Aparecida d'Oeste", IdEstado = 1 },
                new CidadeModel { Id = 2, NomeCidade = "Jales", IdEstado = 1 },
                new CidadeModel { Id = 3, NomeCidade = "Palmeira d'Oeste", IdEstado = 1 },
                new CidadeModel { Id = 4, NomeCidade = "Paranapuã", IdEstado = 1 },
                new CidadeModel { Id = 5, NomeCidade = "Rubineia", IdEstado = 1 },
                new CidadeModel { Id = 6, NomeCidade = "Santa Clara d'Oeste", IdEstado = 1 },
                new CidadeModel { Id = 7, NomeCidade = "Santa Fé do Sul", IdEstado = 1 },
                new CidadeModel { Id = 8, NomeCidade = "São Francisco", IdEstado = 1 },
                new CidadeModel { Id = 9, NomeCidade = "São João das Duas Pontes", IdEstado = 1 },
                new CidadeModel { Id = 10, NomeCidade = "Urânia", IdEstado = 1 }
            );
        }
    }

}
