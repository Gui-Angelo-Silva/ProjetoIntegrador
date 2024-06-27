using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class LogradouroBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Logradouro>().HasKey(l => l.Id);
            modelBuilder.Entity<Logradouro>().Property(l => l.Cep).HasMaxLength(9).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(l => l.RuaLogradouro).HasMaxLength(100).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(l => l.NumeroInicial).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(l => l.NumeroFinal).HasMaxLength(10).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(l => l.IdBairro).IsRequired();
            modelBuilder.Entity<Logradouro>().Property(l => l.IdTipoLogradouro).IsRequired();

            // Relacionamento: Bairro -> Logradouro
            modelBuilder.Entity<Logradouro>()
                .HasOne(l => l.Bairro)
                .WithMany(b => b.Logradouros)
                .HasForeignKey(l => l.IdBairro)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoLogradouro -> Logradouro
            modelBuilder.Entity<Logradouro>()
                .HasOne(l => l.TipoLogradouro)
                .WithMany(tl => tl.Logradouros)
                .HasForeignKey(l => l.IdTipoLogradouro)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
            modelBuilder.Entity<Logradouro>().HasData(
                new Logradouro { Id = 1, Cep = "15700-002", RuaLogradouro = "Rua 1", NumeroInicial = "2000", NumeroFinal = "2598", IdBairro = 1, IdTipoLogradouro = 129 },
                new Logradouro { Id = 2, Cep = "15700-004", RuaLogradouro = "Rua 1", NumeroInicial = "2600", NumeroFinal = "3198", IdBairro = 1, IdTipoLogradouro = 129 },
                new Logradouro { Id = 3, Cep = "15700-360", RuaLogradouro = "Rua 1", NumeroInicial = "", NumeroFinal = "", IdBairro = 2, IdTipoLogradouro = 17 },
                new Logradouro { Id = 4, Cep = "15704-006", RuaLogradouro = "Rua 1", NumeroInicial = "", NumeroFinal = "", IdBairro = 2, IdTipoLogradouro = 84 },
                new Logradouro { Id = 5, Cep = "15704-023", RuaLogradouro = "Rua 1", NumeroInicial = "2645", NumeroFinal = "2735", IdBairro = 2, IdTipoLogradouro = 1 },
                new Logradouro { Id = 6, Cep = "15704-040", RuaLogradouro = "Rua 1", NumeroInicial = "2455", NumeroFinal = "2643", IdBairro = 3, IdTipoLogradouro = 129 },
                new Logradouro { Id = 7, Cep = "15704-068", RuaLogradouro = "Rua 1", NumeroInicial = "2415", NumeroFinal = "2453", IdBairro = 4, IdTipoLogradouro = 13 },
                new Logradouro { Id = 8, Cep = "15704-094", RuaLogradouro = "Rua 1", NumeroInicial = "2343", NumeroFinal = "2413", IdBairro = 4, IdTipoLogradouro = 129 },
                new Logradouro { Id = 9, Cep = "15704-108", RuaLogradouro = "Rua 1", NumeroInicial = "2169", NumeroFinal = "2341", IdBairro = 4, IdTipoLogradouro = 13 },
                new Logradouro { Id = 10, Cep = "15704-176", RuaLogradouro = "Rua 1", NumeroInicial = "2077", NumeroFinal = "2167", IdBairro = 4, IdTipoLogradouro = 129 },
                new Logradouro { Id = 11, Cep = "15704-218", RuaLogradouro = "Rua 1", NumeroInicial = "1911", NumeroFinal = "2075", IdBairro = 4, IdTipoLogradouro = 129 },
                new Logradouro { Id = 12, Cep = "15704-220", RuaLogradouro = "Rua 1", NumeroInicial = "1368", NumeroFinal = "1909", IdBairro = 4, IdTipoLogradouro = 129 },
                new Logradouro { Id = 13, Cep = "15704-250", RuaLogradouro = "Rua 1", NumeroInicial = "", NumeroFinal = "", IdBairro = 4, IdTipoLogradouro = 17 },
                new Logradouro { Id = 14, Cep = "15706-268", RuaLogradouro = "Rua 1", NumeroInicial = "", NumeroFinal = "", IdBairro = 5, IdTipoLogradouro = 84 },
                new Logradouro { Id = 15, Cep = "15700-068", RuaLogradouro = "Rua 10", NumeroInicial = "", NumeroFinal = "", IdBairro = 5, IdTipoLogradouro = 1 },
                new Logradouro { Id = 16, Cep = "15700-070", RuaLogradouro = "Rua 10", NumeroInicial = "2000", NumeroFinal = "2499", IdBairro = 5, IdTipoLogradouro = 129 },
                new Logradouro { Id = 17, Cep = "15704-096", RuaLogradouro = "Rua 10", NumeroInicial = "", NumeroFinal = "", IdBairro = 6, IdTipoLogradouro = 13 },
                new Logradouro { Id = 18, Cep = "15704-098", RuaLogradouro = "Rua 10", NumeroInicial = "1690", NumeroFinal = "1998", IdBairro = 7, IdTipoLogradouro = 129 },
                new Logradouro { Id = 19, Cep = "15704-100", RuaLogradouro = "Rua 10", NumeroInicial = "1628 ", NumeroFinal = "1688", IdBairro = 7, IdTipoLogradouro = 13 },
                new Logradouro { Id = 20, Cep = "15704-130", RuaLogradouro = "Rua 10", NumeroInicial = "", NumeroFinal = "", IdBairro = 8, IdTipoLogradouro = 129 },
                new Logradouro { Id = 21, Cep = "15704-200", RuaLogradouro = "Rua da Saudade", NumeroInicial = "1100", NumeroFinal = "2980", IdBairro = 36, IdTipoLogradouro = 129 },
                new Logradouro { Id = 22, Cep = "15707-003", RuaLogradouro = "Rua José Bonifácio de Andrade Silva", NumeroInicial = "22", NumeroFinal = "40", IdBairro = 76, IdTipoLogradouro = 129 },
                new Logradouro { Id = 23, Cep = "15710-000", RuaLogradouro = "Rua Francisco Fontes Parra", NumeroInicial = "1200", NumeroFinal = "2650", IdBairro = 77, IdTipoLogradouro = 129 },
                new Logradouro { Id = 24, Cep = "15710-000", RuaLogradouro = "Rua Minas Gerais", NumeroInicial = "1000", NumeroFinal = "2750", IdBairro = 78, IdTipoLogradouro = 129 }
            );
        }
    }

}
