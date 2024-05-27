using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class EngenheiroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Engenheiro>().HasKey(e => e.Id);
            modelBuilder.Entity<Engenheiro>().Property(e => e.ImagemPessoa).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.NomePessoa).HasMaxLength(70).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.EmailPessoa).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.TelefonePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.CpfCnpjPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.RgIePessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(e => e.CreaEngenheiro).HasMaxLength(8).IsRequired();


            // Inserções
        }
    }

}
