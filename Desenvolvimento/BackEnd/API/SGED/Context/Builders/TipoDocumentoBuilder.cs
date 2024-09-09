using Microsoft.EntityFrameworkCore;
using SGED.Objects.Enums.Status;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoDocumentoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            // Builder: TipoDocumento
            modelBuilder.Entity<TipoDocumento>().HasKey(td => td.Id);
            modelBuilder.Entity<TipoDocumento>().Property(td => td.NomeTipoDocumento).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<TipoDocumento>().Property(td => td.DescricaoTipoDocumento).HasMaxLength(500).IsRequired();
            modelBuilder.Entity<TipoDocumento>().Property(td => td.Status).IsRequired();


            // Inserções
            modelBuilder.Entity<TipoDocumento>().HasData(
                new TipoDocumento { Id = 1, NomeTipoDocumento = "Alvará de Construção", DescricaoTipoDocumento = "Documento que autoriza o início da obra", Status = StatusData.Active },
                new TipoDocumento { Id = 2, NomeTipoDocumento = "Habite-se", DescricaoTipoDocumento = "Certificado de conclusão de obra e habitabilidade", Status = StatusData.Active },
                new TipoDocumento { Id = 3, NomeTipoDocumento = "Licença Ambiental", DescricaoTipoDocumento = "Autorização para atividades de impacto ambiental", Status = StatusData.Active },
                new TipoDocumento { Id = 4, NomeTipoDocumento = "Certidão de Uso de Solo", DescricaoTipoDocumento = "Documento que atesta a conformidade do uso do solo com a legislação", Status = StatusData.Active },
                new TipoDocumento { Id = 5, NomeTipoDocumento = "Certidão Negativa de Débitos", DescricaoTipoDocumento = "Documento que comprova a inexistência de débitos tributários", Status = StatusData.Active },
                new TipoDocumento { Id = 6, NomeTipoDocumento = "Projeto Arquitetônico Aprovado", DescricaoTipoDocumento = "Projeto aprovado pelos órgãos competentes", Status = StatusData.Active },
                new TipoDocumento { Id = 7, NomeTipoDocumento = "Projeto Estrutural", DescricaoTipoDocumento = "Projeto detalhado da estrutura do imóvel", Status = StatusData.Active },
                new TipoDocumento { Id = 8, NomeTipoDocumento = "Projeto Elétrico", DescricaoTipoDocumento = "Documento contendo o projeto das instalações elétricas", Status = StatusData.Active },
                new TipoDocumento { Id = 9, NomeTipoDocumento = "Projeto Hidrossanitário", DescricaoTipoDocumento = "Documento contendo o projeto de instalações de água e esgoto", Status = StatusData.Active },
                new TipoDocumento { Id = 10, NomeTipoDocumento = "Projeto de Paisagismo", DescricaoTipoDocumento = "Plano de paisagismo do imóvel", Status = StatusData.Active },
                new TipoDocumento { Id = 11, NomeTipoDocumento = "Alvará de Reforma", DescricaoTipoDocumento = "Documento que autoriza a realização de reformas no imóvel", Status = StatusData.Active },
                new TipoDocumento { Id = 12, NomeTipoDocumento = "Memorial Descritivo", DescricaoTipoDocumento = "Documento detalhando todas as características da obra", Status = StatusData.Active },
                new TipoDocumento { Id = 13, NomeTipoDocumento = "Licença de Ocupação", DescricaoTipoDocumento = "Autorização para uso e ocupação do imóvel", Status = StatusData.Active },
                new TipoDocumento { Id = 14, NomeTipoDocumento = "Laudo de Acessibilidade", DescricaoTipoDocumento = "Documento que atesta a conformidade do imóvel com as normas de acessibilidade", Status = StatusData.Active },
                new TipoDocumento { Id = 15, NomeTipoDocumento = "Autorização para Demolição", DescricaoTipoDocumento = "Documento que autoriza a demolição de estruturas existentes", Status = StatusData.Active },
                new TipoDocumento { Id = 16, NomeTipoDocumento = "Certificado de Regularização de Construção", DescricaoTipoDocumento = "Documento que atesta a regularização de uma construção perante as autoridades", Status = StatusData.Active },
                new TipoDocumento { Id = 17, NomeTipoDocumento = "Certificado de Sustentabilidade", DescricaoTipoDocumento = "Certificação emitida para construções que atendem a critérios de sustentabilidade", Status = StatusData.Active },
                new TipoDocumento { Id = 18, NomeTipoDocumento = "Plano de Segurança Contra Incêndio", DescricaoTipoDocumento = "Documento que detalha as medidas de segurança contra incêndio de um imóvel", Status = StatusData.Active },
                new TipoDocumento { Id = 19, NomeTipoDocumento = "Relatório de Vistoria Técnica", DescricaoTipoDocumento = "Relatório que descreve as condições técnicas da construção", Status = StatusData.Active },
                new TipoDocumento { Id = 20, NomeTipoDocumento = "Memorial de Cálculo Estrutural", DescricaoTipoDocumento = "Documento detalhando os cálculos estruturais realizados para o projeto", Status = StatusData.Active }
            );
        }
    }

}
