using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class MunicipeBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Municipe>().HasKey(m => m.Id);
            modelBuilder.Entity<Municipe>().Property(m => m.ImagemPessoa).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.NomePessoa).HasMaxLength(70).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.EmailPessoa).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.TelefonePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.CpfCnpjPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.RgIePessoa).HasMaxLength(15).IsRequired();


            // Inserções
        }
    }

}
