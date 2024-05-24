using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoUsoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoUso>().HasKey(b => b.Id);
            modelBuilder.Entity<TipoUso>().Property(b => b.NomeTipoUso).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<TipoUso>().Property(b => b.DescricaoTipoUso);


            // Inserções
            modelBuilder.Entity<TipoUso>().HasData(
                new TipoUso { Id = 1, NomeTipoUso = "Residencial", DescricaoTipoUso = "Uso do imóvel para habitação." },
                new TipoUso { Id = 2, NomeTipoUso = "Comercial", DescricaoTipoUso = "Uso do imóvel para atividades comerciais." },
                new TipoUso { Id = 3, NomeTipoUso = "Industrial", DescricaoTipoUso = "Uso do imóvel para atividades industriais." },
                new TipoUso { Id = 4, NomeTipoUso = "Institucional", DescricaoTipoUso = "Uso do imóvel para serviços públicos ou comunitários." },
                new TipoUso { Id = 5, NomeTipoUso = "Misto", DescricaoTipoUso = "Uso do imóvel que combina mais de uma finalidade." }
            );
        }
    }

}
