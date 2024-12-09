using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class OcupacaoAtualBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<OcupacaoAtualModel>().Property(oa => oa.Id);
            modelBuilder.Entity<OcupacaoAtualModel>().Property(oa => oa.NomeOcupacaoAtual).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<OcupacaoAtualModel>().Property(oa => oa.DescricaoOcupacaoAtual).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<OcupacaoAtualModel>().HasKey(oa => oa.Id);


            // Inserções
            modelBuilder.Entity<OcupacaoAtualModel>().HasData(
                new OcupacaoAtualModel { Id = 1, NomeOcupacaoAtual = "Não Edificada", DescricaoOcupacaoAtual = "Terreno sem construções." },
                new OcupacaoAtualModel { Id = 2, NomeOcupacaoAtual = "Edificada", DescricaoOcupacaoAtual = "Terreno com construções." },
                new OcupacaoAtualModel { Id = 3, NomeOcupacaoAtual = "Em Construção", DescricaoOcupacaoAtual = "Terreno com obras em andamento." },
                new OcupacaoAtualModel { Id = 4, NomeOcupacaoAtual = "Desocupada", DescricaoOcupacaoAtual = "Terreno com construções, mas sem uso." },
                new OcupacaoAtualModel { Id = 5, NomeOcupacaoAtual = "Ocupada", DescricaoOcupacaoAtual = "Terreno com construções e em uso." }
            );
        }
    }

}
