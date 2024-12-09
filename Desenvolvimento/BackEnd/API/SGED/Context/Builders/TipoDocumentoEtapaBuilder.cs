using Microsoft.EntityFrameworkCore;
using SGED.DTOs.Entities;
using SGED.Objects.Enums.Status;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoDocumentoEtapaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoDocumentoEtapaModel>().Property(tde => tde.Id);
            modelBuilder.Entity<TipoDocumentoEtapaModel>().Property(tde => tde.Posicao).IsRequired();
            modelBuilder.Entity<TipoDocumentoEtapaModel>().Property(tde => tde.Status).IsRequired();
            modelBuilder.Entity<TipoDocumentoEtapaModel>().Property(tde => tde.IdTipoDocumento).IsRequired();
            modelBuilder.Entity<TipoDocumentoEtapaModel>().Property(tde => tde.IdEtapa).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<TipoDocumentoEtapaModel>().HasKey(tde => tde.Id);

            // Relacionamento: TipoDocumento -> TipoDocumentoEtapa
            modelBuilder.Entity<TipoDocumentoEtapaModel>()
                .HasOne(tde => tde.TipoDocumento)
                .WithMany(td => td.TipoDocumentoEtapas)
                .HasForeignKey(tde => tde.IdTipoDocumento)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Etapa -> TipoDocumentoEtapa
            modelBuilder.Entity<TipoDocumentoEtapaModel>()
                .HasOne(tde => tde.Etapa)
                .WithMany(e => e.TipoDocumentoEtapas)
                .HasForeignKey(tde => tde.IdEtapa)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções 
            modelBuilder.Entity<TipoDocumentoEtapaModel>().HasData(
                // Etapa: Análise Preliminar
                new TipoDocumentoEtapaModel { Id = 1, IdTipoDocumento = 1, IdEtapa = 1, Posicao = 1, Status = StatusData.Active }, // Alvará de Construção
                new TipoDocumentoEtapaModel { Id = 2, IdTipoDocumento = 2, IdEtapa = 1, Posicao = 2, Status = StatusData.Active }, // Habite-se
                new TipoDocumentoEtapaModel { Id = 3, IdTipoDocumento = 4, IdEtapa = 1, Posicao = 3, Status = StatusData.Active }, // Certidão de Uso de Solo
                new TipoDocumentoEtapaModel { Id = 4, IdTipoDocumento = 5, IdEtapa = 1, Posicao = 4, Status = StatusData.Active }, // Certidão Negativa de Débitos

                // Etapa: Vistoria Técnica
                new TipoDocumentoEtapaModel { Id = 5, IdTipoDocumento = 12, IdEtapa = 2, Posicao = 1, Status = StatusData.Active }, // Memorial Descritivo
                new TipoDocumentoEtapaModel { Id = 6, IdTipoDocumento = 19, IdEtapa = 2, Posicao = 2, Status = StatusData.Active }, // Relatório de Vistoria Técnica

                // Etapa: Emissão de Licença
                new TipoDocumentoEtapaModel { Id = 7, IdTipoDocumento = 3, IdEtapa = 3, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental
                new TipoDocumentoEtapaModel { Id = 8, IdTipoDocumento = 4, IdEtapa = 3, Posicao = 2, Status = StatusData.Active }, // Certidão de Uso de Solo
                new TipoDocumentoEtapaModel { Id = 9, IdTipoDocumento = 5, IdEtapa = 3, Posicao = 3, Status = StatusData.Active }, // Certidão Negativa de Débitos
                new TipoDocumentoEtapaModel { Id = 10, IdTipoDocumento = 6, IdEtapa = 3, Posicao = 4, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado

                // Etapa: Vistoria Ambiental
                new TipoDocumentoEtapaModel { Id = 11, IdTipoDocumento = 3, IdEtapa = 4, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental
                new TipoDocumentoEtapaModel { Id = 12, IdTipoDocumento = 10, IdEtapa = 4, Posicao = 2, Status = StatusData.Active }, // Projeto de Paisagismo

                // Etapa: Elaboração do Estudo Ambiental
                new TipoDocumentoEtapaModel { Id = 13, IdTipoDocumento = 3, IdEtapa = 5, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental

                // Etapa: Consulta Pública
                new TipoDocumentoEtapaModel { Id = 14, IdTipoDocumento = 3, IdEtapa = 6, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental
                new TipoDocumentoEtapaModel { Id = 15, IdTipoDocumento = 4, IdEtapa = 6, Posicao = 2, Status = StatusData.Active }, // Certidão de Uso de Solo
                new TipoDocumentoEtapaModel { Id = 16, IdTipoDocumento = 5, IdEtapa = 6, Posicao = 3, Status = StatusData.Active }, // Certidão Negativa de Débitos
                new TipoDocumentoEtapaModel { Id = 17, IdTipoDocumento = 6, IdEtapa = 6, Posicao = 4, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapaModel { Id = 18, IdTipoDocumento = 7, IdEtapa = 6, Posicao = 5, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapaModel { Id = 19, IdTipoDocumento = 8, IdEtapa = 6, Posicao = 6, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapaModel { Id = 20, IdTipoDocumento = 9, IdEtapa = 6, Posicao = 7, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Análise Documental
                new TipoDocumentoEtapaModel { Id = 21, IdTipoDocumento = 1, IdEtapa = 7, Posicao = 1, Status = StatusData.Active }, // Alvará de Construção
                new TipoDocumentoEtapaModel { Id = 22, IdTipoDocumento = 2, IdEtapa = 7, Posicao = 2, Status = StatusData.Active }, // Habite-se
                new TipoDocumentoEtapaModel { Id = 23, IdTipoDocumento = 6, IdEtapa = 7, Posicao = 3, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapaModel { Id = 24, IdTipoDocumento = 12, IdEtapa = 7, Posicao = 4, Status = StatusData.Active }, // Memorial Descritivo

                // Etapa: Certificação Final
                new TipoDocumentoEtapaModel { Id = 25, IdTipoDocumento = 2, IdEtapa = 8, Posicao = 1, Status = StatusData.Active }, // Habite-se
                new TipoDocumentoEtapaModel { Id = 26, IdTipoDocumento = 16, IdEtapa = 8, Posicao = 2, Status = StatusData.Active }, // Certificado de Regularização de Construção
                new TipoDocumentoEtapaModel { Id = 27, IdTipoDocumento = 17, IdEtapa = 8, Posicao = 3, Status = StatusData.Active }, // Certificado de Sustentabilidade
                new TipoDocumentoEtapaModel { Id = 28, IdTipoDocumento = 18, IdEtapa = 8, Posicao = 4, Status = StatusData.Active }, // Plano de Segurança Contra Incêndio

                // Etapa: Definição de Escopo
                new TipoDocumentoEtapaModel { Id = 29, IdTipoDocumento = 6, IdEtapa = 9, Posicao = 1, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapaModel { Id = 30, IdTipoDocumento = 7, IdEtapa = 9, Posicao = 2, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapaModel { Id = 31, IdTipoDocumento = 8, IdEtapa = 9, Posicao = 3, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapaModel { Id = 32, IdTipoDocumento = 9, IdEtapa = 9, Posicao = 4, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Desenho Preliminar
                new TipoDocumentoEtapaModel { Id = 33, IdTipoDocumento = 7, IdEtapa = 10, Posicao = 1, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapaModel { Id = 34, IdTipoDocumento = 8, IdEtapa = 10, Posicao = 2, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapaModel { Id = 35, IdTipoDocumento = 9, IdEtapa = 10, Posicao = 3, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Aprovação de Projeto
                new TipoDocumentoEtapaModel { Id = 36, IdTipoDocumento = 6, IdEtapa = 11, Posicao = 1, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapaModel { Id = 37, IdTipoDocumento = 7, IdEtapa = 11, Posicao = 2, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapaModel { Id = 38, IdTipoDocumento = 8, IdEtapa = 11, Posicao = 3, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapaModel { Id = 39, IdTipoDocumento = 9, IdEtapa = 11, Posicao = 4, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Licenciamento Ambiental
                new TipoDocumentoEtapaModel { Id = 40, IdTipoDocumento = 3, IdEtapa = 12, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental
                new TipoDocumentoEtapaModel { Id = 41, IdTipoDocumento = 10, IdEtapa = 12, Posicao = 2, Status = StatusData.Active }, // Projeto de Paisagismo

                // Etapa: Preparação para Construção
                new TipoDocumentoEtapaModel { Id = 42, IdTipoDocumento = 1, IdEtapa = 13, Posicao = 1, Status = StatusData.Active }, // Alvará de Construção
                new TipoDocumentoEtapaModel { Id = 43, IdTipoDocumento = 12, IdEtapa = 13, Posicao = 2, Status = StatusData.Active }, // Memorial Descritivo
                new TipoDocumentoEtapaModel { Id = 44, IdTipoDocumento = 6, IdEtapa = 13, Posicao = 3, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapaModel { Id = 45, IdTipoDocumento = 7, IdEtapa = 13, Posicao = 4, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapaModel { Id = 46, IdTipoDocumento = 8, IdEtapa = 13, Posicao = 5, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapaModel { Id = 47, IdTipoDocumento = 9, IdEtapa = 13, Posicao = 6, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Vistoria de Conclusão
                new TipoDocumentoEtapaModel { Id = 48, IdTipoDocumento = 2, IdEtapa = 14, Posicao = 1, Status = StatusData.Active }, // Habite-se
                new TipoDocumentoEtapaModel { Id = 49, IdTipoDocumento = 16, IdEtapa = 14, Posicao = 2, Status = StatusData.Active }, // Certificado de Regularização de Construção
                new TipoDocumentoEtapaModel { Id = 50, IdTipoDocumento = 17, IdEtapa = 14, Posicao = 3, Status = StatusData.Active }, // Certificado de Sustentabilidade
                new TipoDocumentoEtapaModel { Id = 51, IdTipoDocumento = 18, IdEtapa = 14, Posicao = 4, Status = StatusData.Active }  // Plano de Segurança Contra Incêndio
            );
        }
    }

}
