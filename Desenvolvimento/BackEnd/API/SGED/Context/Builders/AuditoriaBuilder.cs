using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class AuditoriaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Configuração da entidade Auditoria
            modelBuilder.Entity<AuditoriaModel>().Property(a => a.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<AuditoriaModel>().Property(a => a.EndpointAuditoria).HasMaxLength(300).IsRequired();
            modelBuilder.Entity<AuditoriaModel>().Property(a => a.TabelaAuditoria).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<AuditoriaModel>().Property(a => a.RegistroAuditoria);
            modelBuilder.Entity<AuditoriaModel>().Property(a => a.AcaoAuditoria).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<AuditoriaModel>().Property(a => a.StatusRequisicao).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<AuditoriaModel>().Property(a => a.DataAuditoria).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<AuditoriaModel>().Property(a => a.HoraAuditoria).HasMaxLength(12).IsRequired();
            modelBuilder.Entity<AuditoriaModel>().Property(a => a.DescricaoAuditoria).HasMaxLength(500);

            // Declaração: Defini o GUID como Chave Primária
            modelBuilder.Entity<AuditoriaModel>().HasKey(a => a.Id);

            // Relacionamento: Sessao -> Auditoria
            modelBuilder.Entity<AuditoriaModel>()
                .HasOne(a => a.Sessao)
                .WithMany(u => u.Auditorias)
                .HasForeignKey(a => a.IdSessao)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }
}
