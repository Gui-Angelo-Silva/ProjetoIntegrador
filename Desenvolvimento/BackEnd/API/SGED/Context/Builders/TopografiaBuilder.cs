using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TopografiaBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Topografia>().HasKey(t => t.Id);
            modelBuilder.Entity<Topografia>().Property(t => t.NomeTopografia).HasMaxLength(50).IsRequired();


            // Inserções
            modelBuilder.Entity<Topografia>().HasData(
                new Topografia { Id = 1, NomeTopografia = "Plano" },
                new Topografia { Id = 2, NomeTopografia = "Aclive" },
                new Topografia { Id = 3, NomeTopografia = "Declive" },
                new Topografia { Id = 4, NomeTopografia = "Irregular" }
            );
        }
    }

}
