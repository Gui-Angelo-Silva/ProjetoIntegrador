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
            modelBuilder.Entity<Sessao>().Property(b => b.DataHoraAbertura);
            modelBuilder.Entity<Sessao>().Property(b => b.DataHoraFechamento);
            modelBuilder.Entity<Sessao>().Property(b => b.StatusSessao);

            // Relacionamento: Usuario -> Sessao
            modelBuilder.Entity<Usuario>().HasMany(p => p.Sessoes).WithOne(b => b.Usuario).IsRequired().OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
