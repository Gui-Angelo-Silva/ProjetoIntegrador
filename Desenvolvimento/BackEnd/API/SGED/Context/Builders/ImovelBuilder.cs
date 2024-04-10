using Microsoft.EntityFrameworkCore;
using SGED.Models.Entities;

namespace SGED.Context.Builders
{
    public class ImovelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Imovel>().HasKey(b => b.Id);
            modelBuilder.Entity<Imovel>().Property(b => b.NumeroImovel).HasMaxLength(6).IsRequired();
            modelBuilder.Entity<Imovel>().HasOne(b => b.Logradouro).WithMany().HasForeignKey(b => b.IdLogradouro);
            modelBuilder.Entity<Imovel>().HasOne(b => b.Municipe).WithMany().HasForeignKey(b => b.IdMunicipe);

            // Relacionamento: Logradouro -> Imóvel
            modelBuilder.Entity<Logradouro>().HasMany(p => p.Imovels).WithOne(b => b.Logradouro).IsRequired().OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Munícipe -> Imóvel
            modelBuilder.Entity<Municipe>().HasMany(p => p.Imovels).WithOne(b => b.Municipe).IsRequired().OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
