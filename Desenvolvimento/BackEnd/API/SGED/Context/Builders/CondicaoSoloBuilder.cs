using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class CondicaoSoloBuilder
    {
        public static void Build(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<CondicaoSolo>().HasKey(cs => cs.Id);
            modelBuilder.Entity<CondicaoSolo>().Property(cs => cs.Condicao).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<CondicaoSolo>().Property(cs => cs.Descricao).HasMaxLength(60).IsRequired();

            modelBuilder.Entity<CondicaoSolo>().HasKey(cs => cs.Id);

            modelBuilder.Entity<CondicaoSolo>().HasData(
                new CondicaoSolo { Id = 1, Condicao = "Solo Arenoso", Descricao = "Boa drenagem, mas pode ser instável se não compactado adequadamente." },
                new CondicaoSolo { Id = 2, Condicao = "Solo Argiloso", Descricao = "Retém água, pode ser muito expansivo e causar problemas de fissuras." },
                new CondicaoSolo { Id = 3, Condicao = "Solo Siltoso", Descricao = "Tem características intermediárias entre a areia e a argila, pode ser propenso à erosão." },
                new CondicaoSolo { Id = 4, Condicao = "Solo Rocha", Descricao = "Geralmente estável e resistente, mas pode ser difícil de escavar." },
                new CondicaoSolo { Id = 5, Condicao = "Solo Orgânico", Descricao = "Contém matéria orgânica, geralmente menos estável e deve ser removido ou tratado." },
                new CondicaoSolo { Id = 6, Condicao = "Solo de Aluvião", Descricao = "Solo fértil, geralmente encontrado em áreas de inundações, pode ser muito variável." },
                new CondicaoSolo { Id = 7, Condicao = "Solo Compactado", Descricao = "Solo que foi comprimido, geralmente mais estável, mas precisa ser verificado para garantir que não esteja excessivamente compactado." },
                new CondicaoSolo { Id = 8, Condicao = "Solo Saturado", Descricao = "Solo que retém água, pode causar problemas de estabilidade e drenagem." }
            );
        }
    }
}
