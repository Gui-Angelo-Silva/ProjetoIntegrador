using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class EngenheiroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Engenheiro>().HasKey(b => b.Id);
            modelBuilder.Entity<Engenheiro>().Property(b => b.ImagemPessoa).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(b => b.NomePessoa).HasMaxLength(70).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(b => b.EmailPessoa).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(b => b.TelefonePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(b => b.CpfCnpjPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(b => b.RgIePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(b => b.CreaEngenheiro).HasMaxLength(8).IsRequired();


            // Inserções
        }
    }

}
