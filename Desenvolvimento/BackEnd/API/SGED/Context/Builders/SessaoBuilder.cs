using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class SessaoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<SessaoModel>().Property(s => s.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<SessaoModel>().Property(s => s.DataHoraInicio).IsRequired();
            modelBuilder.Entity<SessaoModel>().Property(s => s.DataHoraEncerramento);
            modelBuilder.Entity<SessaoModel>().Property(s => s.TokenSessao);
            modelBuilder.Entity<SessaoModel>().Property(s => s.StatusSessao).IsRequired();
            modelBuilder.Entity<SessaoModel>().Property(s => s.EmailPessoa);
            modelBuilder.Entity<SessaoModel>().Property(s => s.NivelAcesso);
            modelBuilder.Entity<SessaoModel>().Property(s => s.IPv4).HasMaxLength(30);
            modelBuilder.Entity<SessaoModel>().Property(s => s.IPv6).HasMaxLength(40);
            modelBuilder.Entity<SessaoModel>().Property(s => s.IdUsuario).IsRequired();

            // Declaração: Defini o GUID como Chave Primária
            modelBuilder.Entity<SessaoModel>().HasKey(s => s.Id);

            // Relacionamento: Usuario -> Sessao
            modelBuilder.Entity<SessaoModel>()
                .HasOne(s => s.Usuario)
                .WithMany(u => u.Sessoes)
                .HasForeignKey(s => s.IdUsuario)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
