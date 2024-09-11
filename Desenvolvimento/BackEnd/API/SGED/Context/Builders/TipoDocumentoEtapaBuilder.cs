using Microsoft.EntityFrameworkCore;
using SGED.DTO.Entities;
using SGED.Objects.Enums.Status;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoDocumentoEtapaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoDocumentoEtapa>().Property(tde => tde.Id);
            modelBuilder.Entity<TipoDocumentoEtapa>().Property(tde => tde.Posicao).IsRequired();
            modelBuilder.Entity<TipoDocumentoEtapa>().Property(tde => tde.Status).IsRequired();
            modelBuilder.Entity<TipoDocumentoEtapa>().Property(tde => tde.IdTipoDocumento).IsRequired();
            modelBuilder.Entity<TipoDocumentoEtapa>().Property(tde => tde.IdEtapa).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<TipoDocumentoEtapa>().HasKey(tde => tde.Id);

            // Relacionamento: TipoDocumento -> TipoDocumentoEtapa
            modelBuilder.Entity<TipoDocumentoEtapa>()
                .HasOne(tde => tde.TipoDocumento)
                .WithMany(td => td.TipoDocumentoEtapas)
                .HasForeignKey(tde => tde.IdTipoDocumento)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Etapa -> TipoDocumentoEtapa
            modelBuilder.Entity<TipoDocumentoEtapa>()
                .HasOne(tde => tde.Etapa)
                .WithMany(e => e.TipoDocumentoEtapas)
                .HasForeignKey(tde => tde.IdEtapa)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções 
            modelBuilder.Entity<TipoDocumentoEtapa>().HasData(
                // Etapa: Análise Preliminar
                new TipoDocumentoEtapa { Id = 1, IdTipoDocumento = 1, IdEtapa = 1, Posicao = 1, Status = StatusData.Active }, // Alvará de Construção
                new TipoDocumentoEtapa { Id = 2, IdTipoDocumento = 2, IdEtapa = 1, Posicao = 2, Status = StatusData.Active }, // Habite-se
                new TipoDocumentoEtapa { Id = 3, IdTipoDocumento = 4, IdEtapa = 1, Posicao = 3, Status = StatusData.Active }, // Certidão de Uso de Solo
                new TipoDocumentoEtapa { Id = 4, IdTipoDocumento = 5, IdEtapa = 1, Posicao = 4, Status = StatusData.Active }, // Certidão Negativa de Débitos

                // Etapa: Vistoria Técnica
                new TipoDocumentoEtapa { Id = 5, IdTipoDocumento = 12, IdEtapa = 2, Posicao = 1, Status = StatusData.Active }, // Memorial Descritivo
                new TipoDocumentoEtapa { Id = 6, IdTipoDocumento = 19, IdEtapa = 2, Posicao = 2, Status = StatusData.Active }, // Relatório de Vistoria Técnica

                // Etapa: Emissão de Licença
                new TipoDocumentoEtapa { Id = 7, IdTipoDocumento = 3, IdEtapa = 3, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental
                new TipoDocumentoEtapa { Id = 8, IdTipoDocumento = 4, IdEtapa = 3, Posicao = 2, Status = StatusData.Active }, // Certidão de Uso de Solo
                new TipoDocumentoEtapa { Id = 9, IdTipoDocumento = 5, IdEtapa = 3, Posicao = 3, Status = StatusData.Active }, // Certidão Negativa de Débitos
                new TipoDocumentoEtapa { Id = 10, IdTipoDocumento = 6, IdEtapa = 3, Posicao = 4, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado

                // Etapa: Vistoria Ambiental
                new TipoDocumentoEtapa { Id = 11, IdTipoDocumento = 3, IdEtapa = 4, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental
                new TipoDocumentoEtapa { Id = 12, IdTipoDocumento = 10, IdEtapa = 4, Posicao = 2, Status = StatusData.Active }, // Projeto de Paisagismo

                // Etapa: Elaboração do Estudo Ambiental
                new TipoDocumentoEtapa { Id = 13, IdTipoDocumento = 3, IdEtapa = 5, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental

                // Etapa: Consulta Pública
                new TipoDocumentoEtapa { Id = 14, IdTipoDocumento = 3, IdEtapa = 6, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental
                new TipoDocumentoEtapa { Id = 15, IdTipoDocumento = 4, IdEtapa = 6, Posicao = 2, Status = StatusData.Active }, // Certidão de Uso de Solo
                new TipoDocumentoEtapa { Id = 16, IdTipoDocumento = 5, IdEtapa = 6, Posicao = 3, Status = StatusData.Active }, // Certidão Negativa de Débitos
                new TipoDocumentoEtapa { Id = 17, IdTipoDocumento = 6, IdEtapa = 6, Posicao = 4, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapa { Id = 18, IdTipoDocumento = 7, IdEtapa = 6, Posicao = 5, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapa { Id = 19, IdTipoDocumento = 8, IdEtapa = 6, Posicao = 6, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapa { Id = 20, IdTipoDocumento = 9, IdEtapa = 6, Posicao = 7, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Análise Documental
                new TipoDocumentoEtapa { Id = 21, IdTipoDocumento = 1, IdEtapa = 7, Posicao = 1, Status = StatusData.Active }, // Alvará de Construção
                new TipoDocumentoEtapa { Id = 22, IdTipoDocumento = 2, IdEtapa = 7, Posicao = 2, Status = StatusData.Active }, // Habite-se
                new TipoDocumentoEtapa { Id = 23, IdTipoDocumento = 6, IdEtapa = 7, Posicao = 3, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapa { Id = 24, IdTipoDocumento = 12, IdEtapa = 7, Posicao = 4, Status = StatusData.Active }, // Memorial Descritivo

                // Etapa: Certificação Final
                new TipoDocumentoEtapa { Id = 25, IdTipoDocumento = 2, IdEtapa = 8, Posicao = 1, Status = StatusData.Active }, // Habite-se
                new TipoDocumentoEtapa { Id = 26, IdTipoDocumento = 16, IdEtapa = 8, Posicao = 2, Status = StatusData.Active }, // Certificado de Regularização de Construção
                new TipoDocumentoEtapa { Id = 27, IdTipoDocumento = 17, IdEtapa = 8, Posicao = 3, Status = StatusData.Active }, // Certificado de Sustentabilidade
                new TipoDocumentoEtapa { Id = 28, IdTipoDocumento = 18, IdEtapa = 8, Posicao = 4, Status = StatusData.Active }, // Plano de Segurança Contra Incêndio

                // Etapa: Definição de Escopo
                new TipoDocumentoEtapa { Id = 29, IdTipoDocumento = 6, IdEtapa = 9, Posicao = 1, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapa { Id = 30, IdTipoDocumento = 7, IdEtapa = 9, Posicao = 2, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapa { Id = 31, IdTipoDocumento = 8, IdEtapa = 9, Posicao = 3, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapa { Id = 32, IdTipoDocumento = 9, IdEtapa = 9, Posicao = 4, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Desenho Preliminar
                new TipoDocumentoEtapa { Id = 33, IdTipoDocumento = 7, IdEtapa = 10, Posicao = 1, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapa { Id = 34, IdTipoDocumento = 8, IdEtapa = 10, Posicao = 2, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapa { Id = 35, IdTipoDocumento = 9, IdEtapa = 10, Posicao = 3, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Aprovação de Projeto
                new TipoDocumentoEtapa { Id = 36, IdTipoDocumento = 6, IdEtapa = 11, Posicao = 1, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapa { Id = 37, IdTipoDocumento = 7, IdEtapa = 11, Posicao = 2, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapa { Id = 38, IdTipoDocumento = 8, IdEtapa = 11, Posicao = 3, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapa { Id = 39, IdTipoDocumento = 9, IdEtapa = 11, Posicao = 4, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Licenciamento Ambiental
                new TipoDocumentoEtapa { Id = 40, IdTipoDocumento = 3, IdEtapa = 12, Posicao = 1, Status = StatusData.Active }, // Licença Ambiental
                new TipoDocumentoEtapa { Id = 41, IdTipoDocumento = 10, IdEtapa = 12, Posicao = 2, Status = StatusData.Active }, // Projeto de Paisagismo

                // Etapa: Preparação para Construção
                new TipoDocumentoEtapa { Id = 42, IdTipoDocumento = 1, IdEtapa = 13, Posicao = 1, Status = StatusData.Active }, // Alvará de Construção
                new TipoDocumentoEtapa { Id = 43, IdTipoDocumento = 12, IdEtapa = 13, Posicao = 2, Status = StatusData.Active }, // Memorial Descritivo
                new TipoDocumentoEtapa { Id = 44, IdTipoDocumento = 6, IdEtapa = 13, Posicao = 3, Status = StatusData.Active }, // Projeto Arquitetônico Aprovado
                new TipoDocumentoEtapa { Id = 45, IdTipoDocumento = 7, IdEtapa = 13, Posicao = 4, Status = StatusData.Active }, // Projeto Estrutural
                new TipoDocumentoEtapa { Id = 46, IdTipoDocumento = 8, IdEtapa = 13, Posicao = 5, Status = StatusData.Active }, // Projeto Elétrico
                new TipoDocumentoEtapa { Id = 47, IdTipoDocumento = 9, IdEtapa = 13, Posicao = 6, Status = StatusData.Active }, // Projeto Hidrossanitário

                // Etapa: Vistoria de Conclusão
                new TipoDocumentoEtapa { Id = 48, IdTipoDocumento = 2, IdEtapa = 14, Posicao = 1, Status = StatusData.Active }, // Habite-se
                new TipoDocumentoEtapa { Id = 49, IdTipoDocumento = 16, IdEtapa = 14, Posicao = 2, Status = StatusData.Active }, // Certificado de Regularização de Construção
                new TipoDocumentoEtapa { Id = 50, IdTipoDocumento = 17, IdEtapa = 14, Posicao = 3, Status = StatusData.Active }, // Certificado de Sustentabilidade
                new TipoDocumentoEtapa { Id = 51, IdTipoDocumento = 18, IdEtapa = 14, Posicao = 4, Status = StatusData.Active }  // Plano de Segurança Contra Incêndio
            );
        }
    }

}
