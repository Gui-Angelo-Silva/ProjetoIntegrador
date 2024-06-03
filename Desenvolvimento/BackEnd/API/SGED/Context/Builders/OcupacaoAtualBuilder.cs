using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class OcupacaoAtualBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<OcupacaoAtual>().HasKey(tu => tu.Id);
            modelBuilder.Entity<OcupacaoAtual>().Property(tu => tu.NomeOcupacaoAtual).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<OcupacaoAtual>().Property(tu => tu.DescricaoOcupacaoAtual).IsRequired();


            // Inserções
            modelBuilder.Entity<OcupacaoAtual>().HasData(
                new OcupacaoAtual { Id = 1, NomeOcupacaoAtual = "Não Edificada", DescricaoOcupacaoAtual = "Terreno sem construções." },
                new OcupacaoAtual { Id = 2, NomeOcupacaoAtual = "Edificada", DescricaoOcupacaoAtual = "Terreno com construções." },
                new OcupacaoAtual { Id = 3, NomeOcupacaoAtual = "Em Construção", DescricaoOcupacaoAtual = "Terreno com obras em andamento." },
                new OcupacaoAtual { Id = 4, NomeOcupacaoAtual = "Desocupada", DescricaoOcupacaoAtual = "Terreno com construções, mas sem uso." },
                new OcupacaoAtual { Id = 5, NomeOcupacaoAtual = "Ocupada", DescricaoOcupacaoAtual = "Terreno com construções e em uso." }
            );
        }
    }

}
