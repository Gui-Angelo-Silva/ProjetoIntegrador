using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoInfraestruturaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoInfraestrutura>().HasKey(ti => ti.Id);
            modelBuilder.Entity<TipoInfraestrutura>().Property(ti => ti.NomeTipoInfraestrutura).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<TipoInfraestrutura>().Property(ti => ti.DescricaoTipoInfraestrutura).IsRequired();


            // Inserções
            modelBuilder.Entity<TipoInfraestrutura>().HasData(
                new TipoInfraestrutura { Id = 1, NomeTipoInfraestrutura = "Saneamento Básico", DescricaoTipoInfraestrutura = "Infraestrutura para tratamento e fornecimento de água potável, coleta e tratamento de esgoto." },
                new TipoInfraestrutura { Id = 2, NomeTipoInfraestrutura = "Acessibilidade", DescricaoTipoInfraestrutura = "Infraestrutura que garante acesso facilitado para pessoas com mobilidade reduzida." },
                new TipoInfraestrutura { Id = 3, NomeTipoInfraestrutura = "Energia Elétrica", DescricaoTipoInfraestrutura = "Infraestrutura para fornecimento de energia elétrica ao imóvel." },
                new TipoInfraestrutura { Id = 4, NomeTipoInfraestrutura = "Pavimentação", DescricaoTipoInfraestrutura = "Infraestrutura de pavimentação de ruas e calçadas." },
                new TipoInfraestrutura { Id = 5, NomeTipoInfraestrutura = "Internet", DescricaoTipoInfraestrutura = "Infraestrutura para fornecimento de serviços de internet e telecomunicações." }
            );
        }
    }

}
