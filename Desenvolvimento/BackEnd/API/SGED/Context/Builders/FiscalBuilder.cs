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
            modelBuilder.Entity<Fiscal>().HasData(
    new Fiscal { Id = 1, NomePessoa = "Paula Lima", EmailPessoa = "paula.lima@empresa.com", TelefonePessoa = "(61) 98765-3210", CpfCnpjPessoa = "111.222.333-44", RgIePessoa = "11.223.344-5", ImagemPessoa = "" },
    new Fiscal { Id = 2, NomePessoa = "José Santos", EmailPessoa = "jose.santos@empresa.com", TelefonePessoa = "(71) 99887-6543", CpfCnpjPessoa = "555.666.777-88", RgIePessoa = "55.667.788-9", ImagemPessoa = "" }
);
        }
    }

}
