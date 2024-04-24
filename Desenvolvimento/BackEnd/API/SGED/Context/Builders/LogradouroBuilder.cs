using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class LogradouroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Logradouro>().HasKey(b => b.Id);
            modelBuilder.Entity<Logradouro>().Property(b => b.Cep).HasMaxLength(9).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(b => b.NumeroInicial).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(b => b.NumeroFinal).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<Logradouro>().HasOne(b => b.TipoLogradouro).WithMany().HasForeignKey(b => b.IdTipoLogradouro);
            modelBuilder.Entity<Logradouro>().HasOne(b => b.Bairro).WithMany().HasForeignKey(b => b.IdBairro);

            // Relacionamento: Bairro -> Logradouro
            modelBuilder.Entity<Bairro>().HasMany(p => p.Logradouros).WithOne(b => b.Bairro).IsRequired().OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoLogradouro -> Logradouro
            modelBuilder.Entity<TipoLogradouro>().HasMany(p => p.Logradouros).WithOne(b => b.TipoLogradouro).IsRequired().OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
