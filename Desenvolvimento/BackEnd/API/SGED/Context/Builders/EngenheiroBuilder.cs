using Microsoft.EntityFrameworkCore;
using SGED.Models.Entities;

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
            modelBuilder.Entity<Engenheiro>().Property(b => b.CpfCNPJPessoa).HasMaxLength(18).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(b => b.RgIEPessoa).HasMaxLength(15).IsRequired();
            modelBuilder.Entity<Engenheiro>().Property(b => b.crea).HasMaxLength(9).IsRequired();


            // Inserções
        }
    }

}
