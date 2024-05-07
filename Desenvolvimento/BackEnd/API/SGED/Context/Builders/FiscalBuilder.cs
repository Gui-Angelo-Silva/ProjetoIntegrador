using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class FiscalBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Fiscal>().HasKey(b => b.Id);
            modelBuilder.Entity<Fiscal>().Property(b => b.ImagemPessoa).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(b => b.NomePessoa).HasMaxLength(70).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(b => b.EmailPessoa).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(b => b.TelefonePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(b => b.CpfCnpjPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(b => b.RgIePessoa).HasMaxLength(15).IsRequired();


            // Inserções
        }
    }

}
