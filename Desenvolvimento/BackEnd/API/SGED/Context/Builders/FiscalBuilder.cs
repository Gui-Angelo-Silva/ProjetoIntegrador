using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class FiscalBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Fiscal>().HasKey(f => f.Id);
            modelBuilder.Entity<Fiscal>().Property(f => f.ImagemPessoa).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(f => f.NomePessoa).HasMaxLength(70).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(f => f.EmailPessoa).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(f => f.TelefonePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(f => f.CpfCnpjPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Fiscal>().Property(f => f.RgIePessoa).HasMaxLength(15).IsRequired();


            // Inserções
        }
    }

}
