using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class ImovelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Imovel>().HasKey(b => b.Id);
            modelBuilder.Entity<Imovel>().Property(b => b.InscricaoCadastral).IsRequired();
            modelBuilder.Entity<Imovel>().Property(b => b.NumeroImovel).HasMaxLength(6).IsRequired();
            modelBuilder.Entity<Imovel>().Property(b => b.AreaTerreno).IsRequired();
            modelBuilder.Entity<Imovel>().Property(b => b.AreaConstruida).IsRequired();
            modelBuilder.Entity<Imovel>().Property(b => b.CondicoesSolo).IsRequired();
            modelBuilder.Entity<Imovel>().Property(b => b.ValorVenal).IsRequired();
            modelBuilder.Entity<Imovel>().Property(b => b.ValorMercado).IsRequired();
            modelBuilder.Entity<Imovel>().HasOne(b => b.Logradouro).WithMany().HasForeignKey(b => b.IdLogradouro);
            modelBuilder.Entity<Imovel>().HasOne(b => b.Proprietario).WithMany().HasForeignKey(b => b.IdProprietario);
            modelBuilder.Entity<Imovel>().HasOne(b => b.Contribuinte).WithMany().HasForeignKey(b => b.IdContribuinte);
            modelBuilder.Entity<Imovel>().HasOne(b => b.Topografia).WithMany().HasForeignKey(b => b.IdTopografia);
            modelBuilder.Entity<Imovel>().HasOne(b => b.TipoUso).WithMany().HasForeignKey(b => b.IdTipoUso);
            modelBuilder.Entity<Imovel>().HasOne(b => b.OcupacaoAtual).WithMany().HasForeignKey(b => b.IdOcupacaoAtual);

            // Relacionamento: Logradouro -> Imóvel
            modelBuilder.Entity<Logradouro>().HasMany(p => p.Imoveis).WithOne(b => b.Logradouro).IsRequired().OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Munícipe -> Imóvel
            modelBuilder.Entity<Municipe>().HasMany(p => p.Imoveis).WithOne(b => b.Proprietario).IsRequired().OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Logradouro -> Imóvel
            modelBuilder.Entity<Municipe>().HasMany(p => p.Imoveis).WithOne(b => b.Contribuinte).IsRequired().OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Munícipe -> Imóvel
            modelBuilder.Entity<Topografia>().HasMany(p => p.Imoveis).WithOne(b => b.Topografia).IsRequired().OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Logradouro -> Imóvel
            modelBuilder.Entity<TipoUso>().HasMany(p => p.Imoveis).WithOne(b => b.TipoUso).IsRequired().OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Munícipe -> Imóvel
            modelBuilder.Entity<OcupacaoAtual>().HasMany(p => p.Imoveis).WithOne(b => b.OcupacaoAtual).IsRequired().OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
