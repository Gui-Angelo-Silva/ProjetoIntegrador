using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class InfraestruturaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<InfraestruturaModel>().Property(i => i.Id);
            modelBuilder.Entity<InfraestruturaModel>().Property(i => i.NomeInfraestrutura).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<InfraestruturaModel>().Property(i => i.IdTipoInfraestrutura).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<InfraestruturaModel>().HasKey(i => i.Id);

            // Relacionamento: TipoInfraestrutura -> Infraestrutura
            modelBuilder.Entity<InfraestruturaModel>()
                .HasOne(i => i.TipoInfraestrutura)
                .WithMany(ti => ti.Infraestruturas)
                .HasForeignKey(i => i.IdTipoInfraestrutura)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
            modelBuilder.Entity<InfraestruturaModel>().HasData(
                new InfraestruturaModel { Id = 1, NomeInfraestrutura = "Água", IdTipoInfraestrutura = 1 },
                new InfraestruturaModel { Id = 2, NomeInfraestrutura = "Energia Elétrica", IdTipoInfraestrutura = 3 },
                new InfraestruturaModel { Id = 3, NomeInfraestrutura = "Esgoto", IdTipoInfraestrutura = 1 },
                new InfraestruturaModel { Id = 4, NomeInfraestrutura = "Pavimentação", IdTipoInfraestrutura = 4 },
                new InfraestruturaModel { Id = 5, NomeInfraestrutura = "Internet", IdTipoInfraestrutura = 5 },
                new InfraestruturaModel { Id = 6, NomeInfraestrutura = "Telefonia", IdTipoInfraestrutura = 5 },
                new InfraestruturaModel { Id = 7, NomeInfraestrutura = "Iluminação Pública", IdTipoInfraestrutura = 3 },
                new InfraestruturaModel { Id = 8, NomeInfraestrutura = "Coleta de Lixo", IdTipoInfraestrutura = 1 }
            );
        }
    }

}
