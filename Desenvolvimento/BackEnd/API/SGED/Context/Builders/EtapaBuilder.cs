using Microsoft.EntityFrameworkCore;
using SGED.Objects.Enums.Status;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class EtapaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<EtapaModel>().Property(e => e.Id);
            modelBuilder.Entity<EtapaModel>().Property(e => e.NomeEtapa).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<EtapaModel>().Property(e => e.DescricaoEtapa).HasMaxLength(500).IsRequired();
            modelBuilder.Entity<EtapaModel>().Property(e => e.Posicao).IsRequired();
            modelBuilder.Entity<EtapaModel>().Property(e => e.Status).IsRequired();
            modelBuilder.Entity<EtapaModel>().Property(e => e.IdTipoProcesso).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<EtapaModel>().HasKey(e => e.Id);

            // Relacionamento: TipoProcesso -> Etapa
            modelBuilder.Entity<EtapaModel>()
                .HasOne(e => e.TipoProcesso)
                .WithMany(tp => tp.Etapas)
                .HasForeignKey(e => e.IdTipoProcesso)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
            modelBuilder.Entity<EtapaModel>().HasData(
                // TipoProcesso: Aprovação de Projeto
                new EtapaModel { Id = 1, NomeEtapa = "Análise Preliminar", DescricaoEtapa = "Avaliação inicial da documentação", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 1 },
                new EtapaModel { Id = 2, NomeEtapa = "Vistoria Técnica", DescricaoEtapa = "Visita ao local para verificação", Posicao = 2, Status = StatusData.Active, IdTipoProcesso = 1 },

                // TipoProcesso: Licenciamento Ambiental
                new EtapaModel { Id = 3, NomeEtapa = "Emissão de Licença", DescricaoEtapa = "Entrega do alvará ou licença para execução", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 2 },
                new EtapaModel { Id = 4, NomeEtapa = "Vistoria Ambiental", DescricaoEtapa = "Inspeção para determinar o impacto ambiental do projeto", Posicao = 2, Status = StatusData.Active, IdTipoProcesso = 2 },
                new EtapaModel { Id = 5, NomeEtapa = "Elaboração do Estudo Ambiental", DescricaoEtapa = "Desenvolvimento de estudos para identificar possíveis impactos ambientais", Posicao = 3, Status = StatusData.Active, IdTipoProcesso = 2 },
                new EtapaModel { Id = 6, NomeEtapa = "Consulta Pública", DescricaoEtapa = "Participação em audiências públicas para discussão do impacto ambiental", Posicao = 4, Status = StatusData.Active, IdTipoProcesso = 2 },

                // TipoProcesso: Regularização de Imóvel
                new EtapaModel { Id = 7, NomeEtapa = "Análise Documental", DescricaoEtapa = "Verificação de toda a documentação necessária", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 3 },
                new EtapaModel { Id = 8, NomeEtapa = "Certificação Final", DescricaoEtapa = "Emissão do certificado de conformidade", Posicao = 2, Status = StatusData.Active, IdTipoProcesso = 3 },

                // TipoProcesso: Projeto Arquitetônico
                new EtapaModel { Id = 9, NomeEtapa = "Definição de Escopo", DescricaoEtapa = "Determinar os requisitos e expectativas do cliente para o projeto arquitetônico", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 4 },
                new EtapaModel { Id = 10, NomeEtapa = "Desenho Preliminar", DescricaoEtapa = "Criação do esboço inicial do projeto com base no escopo definido", Posicao = 2, Status = StatusData.Active, IdTipoProcesso = 4 },
                new EtapaModel { Id = 11, NomeEtapa = "Aprovação de Projeto", DescricaoEtapa = "Revisão e aprovação do desenho preliminar pelo cliente e órgãos competentes", Posicao = 3, Status = StatusData.Active, IdTipoProcesso = 4 },

                // TipoProcesso: Projeto Estrutural
                new EtapaModel { Id = 12, NomeEtapa = "Execução de Estrutura", DescricaoEtapa = "Construção das fundações e da estrutura do imóvel", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 5 },

                // TipoProcesso: Projeto de Instalações Elétricas
                new EtapaModel { Id = 13, NomeEtapa = "Instalações Elétricas", DescricaoEtapa = "Instalação de componentes elétricos conforme projeto", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 6 },

                // TipoProcesso: Projeto Hidrossanitário
                new EtapaModel { Id = 14, NomeEtapa = "Instalações Hidrossanitárias", DescricaoEtapa = "Execução do sistema de água e esgoto", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 7 },

                // TipoProcesso: Projeto de Paisagismo
                new EtapaModel { Id = 15, NomeEtapa = "Plantio e Jardinagem", DescricaoEtapa = "Implementação do projeto de paisagismo", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 8 },

                // TipoProcesso: Reforma ou Restauro
                new EtapaModel { Id = 16, NomeEtapa = "Restauro Estrutural", DescricaoEtapa = "Reparos na estrutura de edificações históricas", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 9 },

                // TipoProcesso: Regularização Fundiária
                new EtapaModel { Id = 17, NomeEtapa = "Análise Fundiária", DescricaoEtapa = "Verificação da documentação fundiária e da situação do terreno", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 10 },

                // TipoProcesso: Projeto de Acessibilidade
                new EtapaModel { Id = 18, NomeEtapa = "Elaboração do Projeto de Acessibilidade", DescricaoEtapa = "Desenvolvimento de planos para garantir a acessibilidade de acordo com as normas", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 11 },
                new EtapaModel { Id = 19, NomeEtapa = "Análise de Normas", DescricaoEtapa = "Revisão das normas de acessibilidade aplicáveis ao projeto", Posicao = 2, Status = StatusData.Active, IdTipoProcesso = 11 },
                new EtapaModel { Id = 20, NomeEtapa = "Ajuste do Projeto", DescricaoEtapa = "Modificação do projeto para garantir conformidade com as normas de acessibilidade", Posicao = 3, Status = StatusData.Active, IdTipoProcesso = 11 },

                // TipoProcesso: Demolição
                new EtapaModel { Id = 21, NomeEtapa = "Planejamento de Demolição", DescricaoEtapa = "Elaboração de plano para demolição de edificações", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 13 },
                new EtapaModel { Id = 22, NomeEtapa = "Obtenção de Licença para Demolição", DescricaoEtapa = "Processo para obtenção de autorização para demolição", Posicao = 2, Status = StatusData.Active, IdTipoProcesso = 13 },
                new EtapaModel { Id = 23, NomeEtapa = "Execução da Demolição", DescricaoEtapa = "Realização da demolição com base no plano aprovado", Posicao = 3, Status = StatusData.Active, IdTipoProcesso = 13 },
                new EtapaModel { Id = 24, NomeEtapa = "Limpeza do Terreno", DescricaoEtapa = "Remoção de entulhos e preparação do terreno para novos projetos", Posicao = 4, Status = StatusData.Active, IdTipoProcesso = 13 },

                // TipoProcesso: Regularização de Construção
                new EtapaModel { Id = 25, NomeEtapa = "Regularização de Construção", DescricaoEtapa = "Documentação e adequação da construção às normas vigentes", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 14 },
                new EtapaModel { Id = 26, NomeEtapa = "Atualização de Registros Imobiliários", DescricaoEtapa = "Atualização da documentação do imóvel nos registros competentes", Posicao = 2, Status = StatusData.Active, IdTipoProcesso = 14 },

                // TipoProcesso: Certificação de Sustentabilidade
                new EtapaModel { Id = 27, NomeEtapa = "Certificação de Sustentabilidade", DescricaoEtapa = "Avaliação dos critérios de sustentabilidade da construção", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 15 },
                new EtapaModel { Id = 28, NomeEtapa = "Revisão de Requisitos", DescricaoEtapa = "Verificação dos requisitos de sustentabilidade aplicáveis", Posicao = 2, Status = StatusData.Active, IdTipoProcesso = 15 },
                new EtapaModel { Id = 29, NomeEtapa = "Ajustes Finais para Certificação", DescricaoEtapa = "Implementação de melhorias para atender aos requisitos de certificação", Posicao = 3, Status = StatusData.Active, IdTipoProcesso = 15 },

                // TipoProcesso: Projeto de Segurança Contra Incêndio
                new EtapaModel { Id = 30, NomeEtapa = "Avaliação de Risco de Incêndio", DescricaoEtapa = "Análise dos riscos de incêndio e necessidades de segurança", Posicao = 1, Status = StatusData.Active, IdTipoProcesso = 16 },
                new EtapaModel { Id = 31, NomeEtapa = "Desenvolvimento do Projeto de Segurança", DescricaoEtapa = "Criação do projeto de segurança contra incêndio conforme normas", Posicao = 2, Status = StatusData.Active, IdTipoProcesso = 16 },
                new EtapaModel { Id = 32, NomeEtapa = "Implementação de Medidas de Segurança", DescricaoEtapa = "Instalação de sistemas e equipamentos de segurança", Posicao = 3, Status = StatusData.Active, IdTipoProcesso = 16 }
            );

        }
    }

}
