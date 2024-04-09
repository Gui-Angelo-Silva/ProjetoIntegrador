using Microsoft.EntityFrameworkCore;
using SGED.Models.Entities;

namespace SGED.Context.Builders
{
    public class MunicipeBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Municipe>().HasKey(b => b.Id);
            modelBuilder.Entity<Municipe>().Property(b => b.ImagemPessoa).IsRequired();
            modelBuilder.Entity<Municipe>().Property(b => b.NomePessoa).HasMaxLength(70).IsRequired();
            modelBuilder.Entity<Municipe>().Property(b => b.EmailPessoa).IsRequired();
            modelBuilder.Entity<Municipe>().Property(b => b.TelefonePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Municipe>().Property(b => b.CpfCNPJPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Municipe>().Property(b => b.RgIEPessoa).HasMaxLength(15).IsRequired();


            // Inserções
        }
    }

}
