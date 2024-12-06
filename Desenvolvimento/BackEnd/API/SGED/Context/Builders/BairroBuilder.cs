using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class BairroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<BairroModel>().Property(b => b.Id);
            modelBuilder.Entity<BairroModel>().Property(b => b.NomeBairro).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<BairroModel>().Property(b => b.IdCidade).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<BairroModel>().HasKey(b => b.Id);

            // Relacionamento: Cidade -> Bairro
            modelBuilder.Entity<BairroModel>()
                .HasOne(b => b.Cidade)
                .WithMany(c => c.Bairros)
                .HasForeignKey(b => b.IdCidade)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
            modelBuilder.Entity<BairroModel>().HasData(
                new BairroModel { Id = 1, NomeBairro = "Aeroporto", IdCidade = 2 },
                new BairroModel { Id = 2, NomeBairro = "Aeroporto Municipal", IdCidade = 2 },
                new BairroModel { Id = 3, NomeBairro = "Alto do Ipê", IdCidade = 2 },
                new BairroModel { Id = 4, NomeBairro = "Centro", IdCidade = 2 },
                new BairroModel { Id = 5, NomeBairro = "Chácara Bela Vista", IdCidade = 2 },
                new BairroModel { Id = 6, NomeBairro = "Chácaras Bandeirantes", IdCidade = 2 },
                new BairroModel { Id = 7, NomeBairro = "Conjunto Habitacional Doutor Pedro Nogueira", IdCidade = 2 },
                new BairroModel { Id = 8, NomeBairro = "Jardim Aclimação", IdCidade = 2 },
                new BairroModel { Id = 9, NomeBairro = "Jardim América - Primeira Parte", IdCidade = 2 },
                new BairroModel { Id = 10, NomeBairro = "Jardim América - Segunda Parte", IdCidade = 2 },
                new BairroModel { Id = 11, NomeBairro = "Jardim América - Terceira Parte", IdCidade = 2 },
                new BairroModel { Id = 12, NomeBairro = "Jardim América - Quarta Parte", IdCidade = 2 },
                new BairroModel { Id = 13, NomeBairro = "Jardim Ana Cristina", IdCidade = 2 },
                new BairroModel { Id = 14, NomeBairro = "Jardim Arapuã", IdCidade = 2 },
                new BairroModel { Id = 15, NomeBairro = "Jardim Bom Jesus", IdCidade = 2 },
                new BairroModel { Id = 16, NomeBairro = "Jardim Brasil", IdCidade = 2 },
                new BairroModel { Id = 17, NomeBairro = "Jardim Brasília", IdCidade = 2 },
                new BairroModel { Id = 18, NomeBairro = "Jardim Castelo", IdCidade = 2 },
                new BairroModel { Id = 19, NomeBairro = "Jardim das Palmeiras", IdCidade = 2 },
                new BairroModel { Id = 20, NomeBairro = "Jardim do Bosque", IdCidade = 2 },
                new BairroModel { Id = 21, NomeBairro = "Jardim Doutor Euplhy Jalles", IdCidade = 2 },
                new BairroModel { Id = 22, NomeBairro = "Jardim Eldorado", IdCidade = 2 },
                new BairroModel { Id = 23, NomeBairro = "Jardim Elisa", IdCidade = 2 },
                new BairroModel { Id = 24, NomeBairro = "Jardim Estados Unidos", IdCidade = 2 },
                new BairroModel { Id = 25, NomeBairro = "Jardim Europa", IdCidade = 2 },
                new BairroModel { Id = 26, NomeBairro = "Jardim Formosa", IdCidade = 2 },
                new BairroModel { Id = 27, NomeBairro = "Jardim Morumbi", IdCidade = 2 },
                new BairroModel { Id = 28, NomeBairro = "Jardim Pêgolo", IdCidade = 2 },
                new BairroModel { Id = 29, NomeBairro = "Jardim Pires de Andrade", IdCidade = 2 },
                new BairroModel { Id = 30, NomeBairro = "Jardim Primavera", IdCidade = 2 },
                new BairroModel { Id = 31, NomeBairro = "Jardim Samambaia", IdCidade = 2 },
                new BairroModel { Id = 32, NomeBairro = "Jardim Santa Paula", IdCidade = 2 },
                new BairroModel { Id = 33, NomeBairro = "Jardim Santo Expedito", IdCidade = 2 },
                new BairroModel { Id = 34, NomeBairro = "Jardim São Gabriel", IdCidade = 2 },
                new BairroModel { Id = 35, NomeBairro = "Jardim São Francisco", IdCidade = 2 },
                new BairroModel { Id = 36, NomeBairro = "Jardim São Jorge", IdCidade = 2 },
                new BairroModel { Id = 37, NomeBairro = "Jardim São Judas Tadeu", IdCidade = 2 },
                new BairroModel { Id = 38, NomeBairro = "Jardim São Luiz", IdCidade = 2 },
                new BairroModel { Id = 39, NomeBairro = "Jardim São Marcos", IdCidade = 2 },
                new BairroModel { Id = 40, NomeBairro = "Jardim São Mateus", IdCidade = 2 },
                new BairroModel { Id = 41, NomeBairro = "Jardim São Paulo", IdCidade = 2 },
                new BairroModel { Id = 42, NomeBairro = "Jardim São Pedro", IdCidade = 2 },
                new BairroModel { Id = 43, NomeBairro = "Jardim São Sebastião", IdCidade = 2 },
                new BairroModel { Id = 44, NomeBairro = "Jardim São Vicente", IdCidade = 2 },
                new BairroModel { Id = 45, NomeBairro = "Jardim Seminário", IdCidade = 2 },
                new BairroModel { Id = 46, NomeBairro = "Jardim Trianon", IdCidade = 2 },
                new BairroModel { Id = 47, NomeBairro = "Jardim Universitário", IdCidade = 2 },
                new BairroModel { Id = 48, NomeBairro = "Jardim Vitória", IdCidade = 2 },
                new BairroModel { Id = 49, NomeBairro = "Jardim Zafira", IdCidade = 2 },
                new BairroModel { Id = 50, NomeBairro = "Parque das Flores", IdCidade = 2 },
                new BairroModel { Id = 51, NomeBairro = "Parque Industrial I", IdCidade = 2 },
                new BairroModel { Id = 52, NomeBairro = "Parque Industrial II", IdCidade = 2 },
                new BairroModel { Id = 53, NomeBairro = "Parque Industrial III", IdCidade = 2 },
                new BairroModel { Id = 54, NomeBairro = "Parque Industrial IV", IdCidade = 2 },
                new BairroModel { Id = 55, NomeBairro = "Parque Industrial V", IdCidade = 2 },
                new BairroModel { Id = 56, NomeBairro = "Parque Municipal", IdCidade = 2 },
                new BairroModel { Id = 57, NomeBairro = "Parque Residencial Jales", IdCidade = 2 },
                new BairroModel { Id = 58, NomeBairro = "Residencial Nova Jales", IdCidade = 2 },
                new BairroModel { Id = 59, NomeBairro = "Vila Aparecida", IdCidade = 2 },
                new BairroModel { Id = 60, NomeBairro = "Vila Bela", IdCidade = 2 },
                new BairroModel { Id = 61, NomeBairro = "Vila Mariana", IdCidade = 2 },
                new BairroModel { Id = 62, NomeBairro = "Vila Pinheiro", IdCidade = 2 },
                new BairroModel { Id = 63, NomeBairro = "Vila Santa Isabel", IdCidade = 2 },
                new BairroModel { Id = 64, NomeBairro = "Vila União", IdCidade = 2 },
                new BairroModel { Id = 65, NomeBairro = "Vila Nossa Senhora Aparecida", IdCidade = 2 },
                new BairroModel { Id = 66, NomeBairro = "Vila Rodrigues", IdCidade = 2 },
                new BairroModel { Id = 67, NomeBairro = "Vila Maria", IdCidade = 2 },
                new BairroModel { Id = 68, NomeBairro = "Vila Santo Antônio", IdCidade = 2 },
                new BairroModel { Id = 69, NomeBairro = "Vila São José", IdCidade = 2 },
                new BairroModel { Id = 70, NomeBairro = "Vila São Pedro", IdCidade = 2 },
                new BairroModel { Id = 71, NomeBairro = "Vila São Sebastião", IdCidade = 2 },
                new BairroModel { Id = 72, NomeBairro = "Vila São Vicente de Paulo", IdCidade = 2 },
                new BairroModel { Id = 73, NomeBairro = "Vila Tupi", IdCidade = 2 },
                new BairroModel { Id = 74, NomeBairro = "Vila Urano", IdCidade = 2 },
                new BairroModel { Id = 75, NomeBairro = "Vila Vargas", IdCidade = 2 },
                new BairroModel { Id = 76, NomeBairro = "Córrego do Açude", IdCidade = 2 },
                new BairroModel { Id = 77, NomeBairro = "Residencial São Lucas", IdCidade = 2 },
                new BairroModel { Id = 78, NomeBairro = "Centro", IdCidade = 8 }
            );
        }
    }

}
