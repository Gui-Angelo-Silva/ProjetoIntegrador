using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class InfraestruturaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Infraestrutura>().HasKey(i => i.Id);
            modelBuilder.Entity<Infraestrutura>().Property(i => i.NomeInfraestrutura).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Infraestrutura>().Property(i => i.IdTipoInfraestrutura).IsRequired();

            // Relacionamento: TipoInfraestrutura -> Infraestrutura
            modelBuilder.Entity<Infraestrutura>()
                .HasOne(i => i.TipoInfraestrutura)
                .WithMany(ti => ti.Infraestruturas)
                .HasForeignKey(i => i.IdTipoInfraestrutura)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
            modelBuilder.Entity<Infraestrutura>().HasData(
                new Infraestrutura { Id = 1, NomeInfraestrutura = "Água", IdTipoInfraestrutura = 1 },
                new Infraestrutura { Id = 2, NomeInfraestrutura = "Energia Elétrica", IdTipoInfraestrutura = 3 },
                new Infraestrutura { Id = 3, NomeInfraestrutura = "Esgoto", IdTipoInfraestrutura = 1 },
                new Infraestrutura { Id = 4, NomeInfraestrutura = "Pavimentação", IdTipoInfraestrutura = 4 },
                new Infraestrutura { Id = 5, NomeInfraestrutura = "Internet", IdTipoInfraestrutura = 5 },
                new Infraestrutura { Id = 6, NomeInfraestrutura = "Telefonia", IdTipoInfraestrutura = 5 },
                new Infraestrutura { Id = 7, NomeInfraestrutura = "Iluminação Pública", IdTipoInfraestrutura = 3 },
                new Infraestrutura { Id = 8, NomeInfraestrutura = "Coleta de Lixo", IdTipoInfraestrutura = 1 }
            );
        }
    }

}
