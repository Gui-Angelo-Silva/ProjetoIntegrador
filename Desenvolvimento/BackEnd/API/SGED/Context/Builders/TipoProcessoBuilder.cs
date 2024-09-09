using Microsoft.EntityFrameworkCore;
using SGED.Objects.Enums.Status;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoProcessoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoProcesso>().HasKey(tp => tp.Id);
            modelBuilder.Entity<TipoProcesso>().Property(tp => tp.NomeTipoProcesso).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<TipoProcesso>().Property(tp => tp.DescricaoTipoProcesso).HasMaxLength(500).IsRequired();
            modelBuilder.Entity<TipoProcesso>().Property(tp => tp.Status).IsRequired();


            // Inserções
            modelBuilder.Entity<TipoProcesso>().HasData(
                new TipoProcesso { Id = 1, NomeTipoProcesso = "Aprovação de Projeto", DescricaoTipoProcesso = "Processo de aprovação do projeto de construção ou reforma", Status = StatusData.Active },
                new TipoProcesso { Id = 2, NomeTipoProcesso = "Licenciamento Urbanístico", DescricaoTipoProcesso = "Processo para obtenção de licença para construção ou alteração de uso", Status = StatusData.Active },
                new TipoProcesso { Id = 3, NomeTipoProcesso = "Regularização de Imóvel", DescricaoTipoProcesso = "Processo de regularização de imóvel junto ao município", Status = StatusData.Active },
                new TipoProcesso { Id = 4, NomeTipoProcesso = "Elaboração de Projeto Arquitetônico", DescricaoTipoProcesso = "Desenvolvimento do projeto arquitetônico do imóvel", Status = StatusData.Active },
                new TipoProcesso { Id = 5, NomeTipoProcesso = "Elaboração de Projeto Estrutural", DescricaoTipoProcesso = "Desenvolvimento do projeto estrutural do imóvel", Status = StatusData.Active },
                new TipoProcesso { Id = 6, NomeTipoProcesso = "Projeto de Instalações Elétricas", DescricaoTipoProcesso = "Planejamento das instalações elétricas do imóvel", Status = StatusData.Active },
                new TipoProcesso { Id = 7, NomeTipoProcesso = "Projeto Hidrossanitário", DescricaoTipoProcesso = "Desenvolvimento do projeto hidrossanitário do imóvel", Status = StatusData.Active },
                new TipoProcesso { Id = 8, NomeTipoProcesso = "Projeto de Paisagismo", DescricaoTipoProcesso = "Elaboração do projeto paisagístico do entorno do imóvel", Status = StatusData.Active },
                new TipoProcesso { Id = 9, NomeTipoProcesso = "Reforma ou Restauro", DescricaoTipoProcesso = "Processo de reforma ou restauro de edificações existentes", Status = StatusData.Active },
                new TipoProcesso { Id = 10, NomeTipoProcesso = "Regularização Fundiária", DescricaoTipoProcesso = "Processo para regularizar terrenos ou imóveis", Status = StatusData.Active },
                new TipoProcesso { Id = 11, NomeTipoProcesso = "Projeto de Acessibilidade", DescricaoTipoProcesso = "Desenvolvimento de projeto para garantir acessibilidade no imóvel", Status = StatusData.Active },
                new TipoProcesso { Id = 12, NomeTipoProcesso = "Estudo de Impacto Ambiental", DescricaoTipoProcesso = "Análise de impacto ambiental para aprovação de projetos", Status = StatusData.Active },
                new TipoProcesso { Id = 13, NomeTipoProcesso = "Demolição", DescricaoTipoProcesso = "Processo de demolição de construções existentes", Status = StatusData.Active },
                new TipoProcesso { Id = 14, NomeTipoProcesso = "Regularização de Construção", DescricaoTipoProcesso = "Processo para regularizar construções não autorizadas ou fora das normas", Status = StatusData.Active },
                new TipoProcesso { Id = 15, NomeTipoProcesso = "Certificação de Sustentabilidade", DescricaoTipoProcesso = "Avaliação de edificações para certificação de sustentabilidade", Status = StatusData.Active },
                new TipoProcesso { Id = 16, NomeTipoProcesso = "Projeto de Segurança Contra Incêndio", DescricaoTipoProcesso = "Planejamento das medidas de segurança contra incêndio", Status = StatusData.Active }
            );
        }
    }

}