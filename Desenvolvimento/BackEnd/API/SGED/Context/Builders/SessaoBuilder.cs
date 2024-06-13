using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class SessaoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Sessao>().HasKey(s => s.Id);
            modelBuilder.Entity<Sessao>().Property(s => s.DataHoraInicio).IsRequired();
            modelBuilder.Entity<Sessao>().Property(s => s.DataHoraEncerramento);
            modelBuilder.Entity<Sessao>().Property(s => s.TokenSessao);
            modelBuilder.Entity<Sessao>().Property(s => s.StatusSessao).IsRequired();
            modelBuilder.Entity<Sessao>().Property(s => s.EmailPessoa);
            modelBuilder.Entity<Sessao>().Property(s => s.NivelAcesso);
            modelBuilder.Entity<Sessao>().Property(s => s.IdUsuario).IsRequired();

            // Relacionamento: Usuario -> Sessao
            modelBuilder.Entity<Sessao>()
                .HasOne(s => s.Usuario)
                .WithMany(u => u.Sessoes)
                .HasForeignKey(s => s.IdUsuario)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
