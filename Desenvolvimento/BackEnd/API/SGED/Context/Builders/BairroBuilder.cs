using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class BairroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Bairro>().HasKey(b => b.Id);
            modelBuilder.Entity<Bairro>().Property(b => b.NomeBairro).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Bairro>().Property(b => b.IdCidade).IsRequired();

            // Relacionamento: Cidade -> Bairro
            modelBuilder.Entity<Bairro>()
                .HasOne(b => b.Cidade)
                .WithMany(c => c.Bairros)
                .HasForeignKey(b => b.IdCidade)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
            modelBuilder.Entity<Bairro>().HasData(
                new Bairro { Id = 1, NomeBairro = "Aeroporto", IdCidade = 2 },
                new Bairro { Id = 2, NomeBairro = "Aeroporto Municipal", IdCidade = 2 },
                new Bairro { Id = 3, NomeBairro = "Alto do Ipê", IdCidade = 2 },
                new Bairro { Id = 4, NomeBairro = "Centro", IdCidade = 2 },
                new Bairro { Id = 5, NomeBairro = "Chácara Bela Vista", IdCidade = 2 },
                new Bairro { Id = 6, NomeBairro = "Chácaras Bandeirantes", IdCidade = 2 },
                new Bairro { Id = 7, NomeBairro = "Conjunto Habitacional Doutor Pedro Nogueira", IdCidade = 2 },
                new Bairro { Id = 8, NomeBairro = "Jardim Aclimação", IdCidade = 2 },
                new Bairro { Id = 9, NomeBairro = "Jardim América - Primeira Parte", IdCidade = 2 },
                new Bairro { Id = 10, NomeBairro = "Jardim América - Segunda Parte", IdCidade = 2 },
                new Bairro { Id = 11, NomeBairro = "Jardim América - Terceira Parte", IdCidade = 2 },
                new Bairro { Id = 12, NomeBairro = "Jardim América - Quarta Parte", IdCidade = 2 },
                new Bairro { Id = 13, NomeBairro = "Jardim Ana Cristina", IdCidade = 2 },
                new Bairro { Id = 14, NomeBairro = "Jardim Arapuã", IdCidade = 2 },
                new Bairro { Id = 15, NomeBairro = "Jardim Bom Jesus", IdCidade = 2 },
                new Bairro { Id = 16, NomeBairro = "Jardim Brasil", IdCidade = 2 },
                new Bairro { Id = 17, NomeBairro = "Jardim Brasília", IdCidade = 2 },
                new Bairro { Id = 18, NomeBairro = "Jardim Castelo", IdCidade = 2 },
                new Bairro { Id = 19, NomeBairro = "Jardim das Palmeiras", IdCidade = 2 },
                new Bairro { Id = 20, NomeBairro = "Jardim do Bosque", IdCidade = 2 },
                new Bairro { Id = 21, NomeBairro = "Jardim Doutor Euplhy Jalles", IdCidade = 2 },
                new Bairro { Id = 22, NomeBairro = "Jardim Eldorado", IdCidade = 2 },
                new Bairro { Id = 23, NomeBairro = "Jardim Elisa", IdCidade = 2 },
                new Bairro { Id = 24, NomeBairro = "Jardim Estados Unidos", IdCidade = 2 },
                new Bairro { Id = 25, NomeBairro = "Jardim Europa", IdCidade = 2 },
                new Bairro { Id = 26, NomeBairro = "Jardim Formosa", IdCidade = 2 },
                new Bairro { Id = 27, NomeBairro = "Jardim Morumbi", IdCidade = 2 },
                new Bairro { Id = 28, NomeBairro = "Jardim Pêgolo", IdCidade = 2 },
                new Bairro { Id = 29, NomeBairro = "Jardim Pires de Andrade", IdCidade = 2 },
                new Bairro { Id = 30, NomeBairro = "Jardim Primavera", IdCidade = 2 },
                new Bairro { Id = 31, NomeBairro = "Jardim Samambaia", IdCidade = 2 },
                new Bairro { Id = 32, NomeBairro = "Jardim Santa Paula", IdCidade = 2 },
                new Bairro { Id = 33, NomeBairro = "Jardim Santo Expedito", IdCidade = 2 },
                new Bairro { Id = 34, NomeBairro = "Jardim São Gabriel", IdCidade = 2 },
                new Bairro { Id = 35, NomeBairro = "Jardim São Francisco", IdCidade = 2 },
                new Bairro { Id = 36, NomeBairro = "Jardim São Jorge", IdCidade = 2 },
                new Bairro { Id = 37, NomeBairro = "Jardim São Judas Tadeu", IdCidade = 2 },
                new Bairro { Id = 38, NomeBairro = "Jardim São Luiz", IdCidade = 2 },
                new Bairro { Id = 39, NomeBairro = "Jardim São Marcos", IdCidade = 2 },
                new Bairro { Id = 40, NomeBairro = "Jardim São Mateus", IdCidade = 2 },
                new Bairro { Id = 41, NomeBairro = "Jardim São Paulo", IdCidade = 2 },
                new Bairro { Id = 42, NomeBairro = "Jardim São Pedro", IdCidade = 2 },
                new Bairro { Id = 43, NomeBairro = "Jardim São Sebastião", IdCidade = 2 },
                new Bairro { Id = 44, NomeBairro = "Jardim São Vicente", IdCidade = 2 },
                new Bairro { Id = 45, NomeBairro = "Jardim Seminário", IdCidade = 2 },
                new Bairro { Id = 46, NomeBairro = "Jardim Trianon", IdCidade = 2 },
                new Bairro { Id = 47, NomeBairro = "Jardim Universitário", IdCidade = 2 },
                new Bairro { Id = 48, NomeBairro = "Jardim Vitória", IdCidade = 2 },
                new Bairro { Id = 49, NomeBairro = "Jardim Zafira", IdCidade = 2 },
                new Bairro { Id = 50, NomeBairro = "Parque das Flores", IdCidade = 2 },
                new Bairro { Id = 51, NomeBairro = "Parque Industrial I", IdCidade = 2 },
                new Bairro { Id = 52, NomeBairro = "Parque Industrial II", IdCidade = 2 },
                new Bairro { Id = 53, NomeBairro = "Parque Industrial III", IdCidade = 2 },
                new Bairro { Id = 54, NomeBairro = "Parque Industrial IV", IdCidade = 2 },
                new Bairro { Id = 55, NomeBairro = "Parque Industrial V", IdCidade = 2 },
                new Bairro { Id = 56, NomeBairro = "Parque Municipal", IdCidade = 2 },
                new Bairro { Id = 57, NomeBairro = "Parque Residencial Jales", IdCidade = 2 },
                new Bairro { Id = 58, NomeBairro = "Residencial Nova Jales", IdCidade = 2 },
                new Bairro { Id = 59, NomeBairro = "Vila Aparecida", IdCidade = 2 },
                new Bairro { Id = 60, NomeBairro = "Vila Bela", IdCidade = 2 },
                new Bairro { Id = 61, NomeBairro = "Vila Mariana", IdCidade = 2 },
                new Bairro { Id = 62, NomeBairro = "Vila Pinheiro", IdCidade = 2 },
                new Bairro { Id = 63, NomeBairro = "Vila Santa Isabel", IdCidade = 2 },
                new Bairro { Id = 64, NomeBairro = "Vila União", IdCidade = 2 },
                new Bairro { Id = 65, NomeBairro = "Vila Nossa Senhora Aparecida", IdCidade = 2 },
                new Bairro { Id = 66, NomeBairro = "Vila Rodrigues", IdCidade = 2 },
                new Bairro { Id = 67, NomeBairro = "Vila Maria", IdCidade = 2 },
                new Bairro { Id = 68, NomeBairro = "Vila Santo Antônio", IdCidade = 2 },
                new Bairro { Id = 69, NomeBairro = "Vila São José", IdCidade = 2 },
                new Bairro { Id = 70, NomeBairro = "Vila São Pedro", IdCidade = 2 },
                new Bairro { Id = 71, NomeBairro = "Vila São Sebastião", IdCidade = 2 },
                new Bairro { Id = 72, NomeBairro = "Vila São Vicente de Paulo", IdCidade = 2 },
                new Bairro { Id = 73, NomeBairro = "Vila Tupi", IdCidade = 2 },
                new Bairro { Id = 74, NomeBairro = "Vila Urano", IdCidade = 2 },
                new Bairro { Id = 75, NomeBairro = "Vila Vargas", IdCidade = 2 },
                new Bairro { Id = 76, NomeBairro = "Córrego do Açude", IdCidade = 2 },
                new Bairro { Id = 77, NomeBairro = "Residencial São Lucas", IdCidade = 2 },
                new Bairro { Id = 78, NomeBairro = "Centro", IdCidade = 8 }
            );
        }
    }

}
