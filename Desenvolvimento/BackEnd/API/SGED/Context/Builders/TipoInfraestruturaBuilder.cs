using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoInfraestruturaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoInfraestruturaModel>().Property(ti => ti.Id);
            modelBuilder.Entity<TipoInfraestruturaModel>().Property(ti => ti.NomeTipoInfraestrutura).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<TipoInfraestruturaModel>().Property(ti => ti.DescricaoTipoInfraestrutura).HasMaxLength(500).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<TipoInfraestruturaModel>().HasKey(ti => ti.Id);


            // Inserções
            modelBuilder.Entity<TipoInfraestruturaModel>().HasData(
                new TipoInfraestruturaModel { Id = 1, NomeTipoInfraestrutura = "Saneamento Básico", DescricaoTipoInfraestrutura = "Infraestrutura para tratamento e fornecimento de água potável, coleta e tratamento de esgoto." },
                new TipoInfraestruturaModel { Id = 2, NomeTipoInfraestrutura = "Acessibilidade", DescricaoTipoInfraestrutura = "Infraestrutura que garante acesso facilitado para pessoas com mobilidade reduzida." },
                new TipoInfraestruturaModel { Id = 3, NomeTipoInfraestrutura = "Energia Elétrica", DescricaoTipoInfraestrutura = "Infraestrutura para fornecimento de energia elétrica ao imóvel." },
                new TipoInfraestruturaModel { Id = 4, NomeTipoInfraestrutura = "Pavimentação", DescricaoTipoInfraestrutura = "Infraestrutura de pavimentação de ruas e calçadas." },
                new TipoInfraestruturaModel { Id = 5, NomeTipoInfraestrutura = "Internet", DescricaoTipoInfraestrutura = "Infraestrutura para fornecimento de serviços de internet e telecomunicações." }
            );
        }
    }

}
