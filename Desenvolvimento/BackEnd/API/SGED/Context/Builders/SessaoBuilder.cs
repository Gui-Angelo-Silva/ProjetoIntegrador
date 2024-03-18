using Microsoft.EntityFrameworkCore;
using SGED.Models.Entities;

namespace SGED.Context.Builders
{
    public class SessaoBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Sessao>().HasKey(b => b.Id);
            modelBuilder.Entity<Sessao>().Property(b => b.DataHoraInicio).IsRequired();
            modelBuilder.Entity<Sessao>().Property(b => b.DataHoraEncerramento);
            modelBuilder.Entity<Sessao>().Property(b => b.TokenSessao);
            modelBuilder.Entity<Sessao>().Property(b => b.StatusSessao).IsRequired();
            modelBuilder.Entity<Sessao>().Property(b => b.EmailPessoa);
            modelBuilder.Entity<Sessao>().Property(b => b.NivelAcesso);
            modelBuilder.Entity<Sessao>().HasOne(b => b.Usuario).WithMany().HasForeignKey(b => b.IdUsuario);

            // Relacionamento: Usuario -> Sessao
            modelBuilder.Entity<Usuario>().HasMany(p => p.Sessoes).WithOne(b => b.Usuario).IsRequired().OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
