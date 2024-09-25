using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class MunicipeBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Municipe>().Property(m => m.Id);
            modelBuilder.Entity<Municipe>().Property(m => m.ImagemPessoa).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.NomePessoa).HasMaxLength(70).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.EmailPessoa).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.TelefonePessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.CpfCnpjPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Municipe>().Property(m => m.RgIePessoa).HasMaxLength(15).IsRequired();

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<Municipe>().HasKey(m => m.Id);


            // Inserções
            modelBuilder.Entity<Municipe>().HasData(
                new Municipe { Id = 1, NomePessoa = "Secretário Geral", EmailPessoa = "admin@gmail.com", TelefonePessoa = "(00) 00000-0000", CpfCnpjPessoa = "000.000.000-00", RgIePessoa = "00.000.000-0", ImagemPessoa = "" },
                new Municipe { Id = 2, NomePessoa = "Irene Fonseca Gonzales", EmailPessoa = "irenebelezinha@gmail.com", TelefonePessoa = "(17) 99613-2564", CpfCnpjPessoa = "456.365.568-61 ", RgIePessoa = "21.041.362-1", ImagemPessoa = "" },
                new Municipe { Id = 3, NomePessoa = "Fabiana Viana Angelo Sfailva", EmailPessoa = "fabiana_angelosilva@hotmail.com", TelefonePessoa = "(17) 99721-4804", CpfCnpjPessoa = "367.935.658-77", RgIePessoa = "36.062.742-0", ImagemPessoa = "" },
                new Municipe { Id = 4, NomePessoa = "Josué Angelo", EmailPessoa = "josue.angelo1010@gmail.com", TelefonePessoa = "(17) 99663-3491", CpfCnpjPessoa = "133.673.148-62", RgIePessoa = "29.736.069-3", ImagemPessoa = "" },
                new Municipe { Id = 5, NomePessoa = "Alexandre Luiz dos Santos", EmailPessoa = "aleluizsantos@gmail.com", TelefonePessoa = "(17) 99682-7286", CpfCnpjPessoa = "284.851.338-11", RgIePessoa = "29.736.069-3", ImagemPessoa = "" },
                new Municipe { Id = 6, NomePessoa = "João Almeida", EmailPessoa = "joao.almeida@empresa.com", TelefonePessoa = "(11) 91234-5678", CpfCnpjPessoa = "123.456.789-00", RgIePessoa = "12.345.678-9", ImagemPessoa = "" },
                new Municipe { Id = 7, NomePessoa = "Ana Souza", EmailPessoa = "ana.souza@empresa.com", TelefonePessoa = "(21) 98765-4321", CpfCnpjPessoa = "987.654.321-00", RgIePessoa = "98.765.432-1", ImagemPessoa = "" },
                new Municipe { Id = 8, NomePessoa = "Carlos Pereira", EmailPessoa = "carlos.pereira@empresa.com", TelefonePessoa = "(31) 91234-5678", CpfCnpjPessoa = "123.987.456-11", RgIePessoa = "12.987.654-0", ImagemPessoa = "" },
                new Municipe { Id = 9, NomePessoa = "Mariana Silva", EmailPessoa = "mariana.silva@empresa.com", TelefonePessoa = "(41) 99876-5432", CpfCnpjPessoa = "456.789.123-22", RgIePessoa = "45.678.912-3", ImagemPessoa = "" },
                new Municipe { Id = 10, NomePessoa = "Ricardo Gomes", EmailPessoa = "ricardo.gomes@empresa.com", TelefonePessoa = "(51) 91234-8765", CpfCnpjPessoa = "789.123.456-33", RgIePessoa = "78.123.456-4", ImagemPessoa = "" },
                new Municipe { Id = 11, NomePessoa = "Paula Lima", EmailPessoa = "paula.lima@empresa.com", TelefonePessoa = "(61) 98765-3210", CpfCnpjPessoa = "111.222.333-44", RgIePessoa = "11.223.344-5", ImagemPessoa = "" },
                new Municipe { Id = 12, NomePessoa = "José Santos", EmailPessoa = "jose.santos@empresa.com", TelefonePessoa = "(71) 99887-6543", CpfCnpjPessoa = "555.666.777-88", RgIePessoa = "55.667.788-9", ImagemPessoa = "" }
            );
        }
    }

}
