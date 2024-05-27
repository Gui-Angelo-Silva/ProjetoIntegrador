using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class LogradouroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Logradouro>().HasKey(l => l.Id);
            modelBuilder.Entity<Logradouro>().Property(l => l.Cep).HasMaxLength(9).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(l => l.NumeroInicial).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(l => l.NumeroFinal).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(l => l.IdBairro).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(l => l.IdTipoLogradouro).IsRequired();

            // Relacionamento: Bairro -> Logradouro
            modelBuilder.Entity<Logradouro>()
                .HasOne(l => l.Bairro)
                .WithMany(b => b.Logradouros)
                .HasForeignKey(l => l.IdBairro)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoLogradouro -> Logradouro
            modelBuilder.Entity<Logradouro>()
                .HasOne(l => l.TipoLogradouro)
                .WithMany(tl => tl.Logradouros)
                .HasForeignKey(l => l.IdTipoLogradouro)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
