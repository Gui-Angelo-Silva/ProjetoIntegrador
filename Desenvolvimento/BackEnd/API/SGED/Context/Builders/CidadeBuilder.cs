using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class CidadeBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Cidade>().HasKey(c => c.Id);
            modelBuilder.Entity<Cidade>().Property(c => c.NomeCidade).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<Cidade>().Property(c => c.IdEstado).IsRequired();

            // Relacionamento: Estado -> Cidade
            modelBuilder.Entity<Cidade>()
                .HasOne(c => c.Estado)
                .WithMany(e => e.Cidades)
                .HasForeignKey(c => c.IdEstado)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
            modelBuilder.Entity<Cidade>().HasData(
                new Cidade { Id = 1, NomeCidade = "Aparecida d'Oeste", IdEstado = 1 },
                new Cidade { Id = 2, NomeCidade = "Jales", IdEstado = 1 },
                new Cidade { Id = 3, NomeCidade = "Palmeira d'Oeste", IdEstado = 1 },
                new Cidade { Id = 4, NomeCidade = "Paranapuã", IdEstado = 1 },
                new Cidade { Id = 5, NomeCidade = "Rubineia", IdEstado = 1 },
                new Cidade { Id = 6, NomeCidade = "Santa Clara d'Oeste", IdEstado = 1 },
                new Cidade { Id = 7, NomeCidade = "Santa Fé do Sul", IdEstado = 1 },
                new Cidade { Id = 8, NomeCidade = "São Francisco", IdEstado = 1 },
                new Cidade { Id = 9, NomeCidade = "São João das Duas Pontes", IdEstado = 1 },
                new Cidade { Id = 10, NomeCidade = "Urânia", IdEstado = 1 }
            );
        }
    }

}
