using Microsoft.EntityFrameworkCore;
using SGED.Models.Entities;

namespace SGED.Context.Builders
{
    public class BairroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Bairro>().HasKey(b => b.Id);
            modelBuilder.Entity<Bairro>().Property(b => b.NomeBairro).HasMaxLength(50).IsRequired();
            modelBuilder.Entity<Bairro>().HasOne(b => b.Cidade).WithMany().HasForeignKey(b => b.IdCidade);

            // Relacionamento: Cidade -> Bairro
            modelBuilder.Entity<Cidade>().HasMany(p => p.Bairros).WithOne(b => b.Cidade).IsRequired().OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
