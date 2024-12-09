using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class FiscalBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<FiscalModel>().Property(f => f.Id);
            modelBuilder.Entity<FiscalModel>().Property(f => f.ImagemPessoa).IsRequired();
            modelBuilder.Entity<FiscalModel>().Property(f => f.NomePessoa).HasMaxLength(70).IsRequired();
            modelBuilder.Entity<FiscalModel>().Property(f => f.EmailPessoa).IsRequired();
            modelBuilder.Entity<FiscalModel>().Property(f => f.TelefonePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<FiscalModel>().Property(f => f.CpfCnpjPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<FiscalModel>().Property(f => f.RgIePessoa).HasMaxLength(15).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<FiscalModel>().HasKey(f => f.Id);


            // Inserções
            modelBuilder.Entity<FiscalModel>().HasData(
                new FiscalModel { Id = 1, NomePessoa = "Paula Lima", EmailPessoa = "paula.lima@empresa.com", TelefonePessoa = "(61) 98765-3210", CpfCnpjPessoa = "111.222.333-44", RgIePessoa = "11.223.344-5", ImagemPessoa = "" },
                new FiscalModel { Id = 2, NomePessoa = "José Santos", EmailPessoa = "jose.santos@empresa.com", TelefonePessoa = "(71) 99887-6543", CpfCnpjPessoa = "555.666.777-88", RgIePessoa = "55.667.788-9", ImagemPessoa = "" }
            );
        }
    }

}
