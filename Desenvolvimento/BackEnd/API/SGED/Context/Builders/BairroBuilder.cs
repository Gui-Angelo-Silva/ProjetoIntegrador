using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class BairroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Bairro>().HasKey(b => b.Id);
            modelBuilder.Entity<Bairro>().Property(b => b.NomeBairro).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Bairro>().Property(b => b.IdCidade).IsRequired();

            // Relacionamento: Cidade -> Bairro
            modelBuilder.Entity<Bairro>()
                .HasOne(b => b.Cidade)
                .WithMany(c => c.Bairros)
                .HasForeignKey(b => b.IdCidade)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
