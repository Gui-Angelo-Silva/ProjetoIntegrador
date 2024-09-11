using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class EngenheiroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Engenheiro>().Property(e => e.Id);
            modelBuilder.Entity<Engenheiro>().Property(e => e.ImagemPessoa).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.NomePessoa).HasMaxLength(70).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.EmailPessoa).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.TelefonePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.CpfCnpjPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.RgIePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.CreaEngenheiro).HasMaxLength(8).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<Engenheiro>().HasKey(e => e.Id);


            // Inserções
            modelBuilder.Entity<Engenheiro>().HasData(
                new Engenheiro { Id = 1, NomePessoa = "João Almeida", EmailPessoa = "joao.almeida@empresa.com", TelefonePessoa = "(11) 91234-5678", CpfCnpjPessoa = "123.456.789-00", RgIePessoa = "12.345.678-9", ImagemPessoa = "", CreaEngenheiro = "1234567" },
                new Engenheiro { Id = 2, NomePessoa = "Ana Souza", EmailPessoa = "ana.souza@empresa.com", TelefonePessoa = "(21) 98765-4321", CpfCnpjPessoa = "987.654.321-00", RgIePessoa = "98.765.432-1", ImagemPessoa = "", CreaEngenheiro = "2345678" },
                new Engenheiro { Id = 3, NomePessoa = "Carlos Pereira", EmailPessoa = "carlos.pereira@empresa.com", TelefonePessoa = "(31) 91234-5678", CpfCnpjPessoa = "123.987.456-11", RgIePessoa = "12.987.654-0", ImagemPessoa = "", CreaEngenheiro = "3456789" },
                new Engenheiro { Id = 4, NomePessoa = "Mariana Silva", EmailPessoa = "mariana.silva@empresa.com", TelefonePessoa = "(41) 99876-5432", CpfCnpjPessoa = "456.789.123-22", RgIePessoa = "45.678.912-3", ImagemPessoa = "", CreaEngenheiro = "4567890" },
                new Engenheiro { Id = 5, NomePessoa = "Ricardo Gomes", EmailPessoa = "ricardo.gomes@empresa.com", TelefonePessoa = "(51) 91234-8765", CpfCnpjPessoa = "789.123.456-33", RgIePessoa = "78.123.456-4", ImagemPessoa = "", CreaEngenheiro = "5678901" }
            );
        }
    }

}
