using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class ImovelBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<Imovel>().HasKey(i => i.Id);
            modelBuilder.Entity<Imovel>().Property(i => i.InscricaoCadastral).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.NumeroImovel).HasMaxLength(6).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.AreaTerreno).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.AreaConstruida).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.CondicoesSolo).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.ValorVenal).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.ValorMercado).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.IdLogradouro).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.IdProprietario).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.IdContribuinte).IsRequired(); 
            modelBuilder.Entity<Imovel>().Property(i => i.IdTopografia).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.IdTipoUso).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.IdOcupacaoAtual).IsRequired();

            // Relacionamento: Logradouro -> Imovel
            modelBuilder.Entity<Imovel>()
                .HasOne(i => i.Logradouro)
                .WithMany(l => l.Imoveis)
                .HasForeignKey(i => i.IdLogradouro)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: Municipe(proprietario) -> Imovel
            modelBuilder.Entity<Imovel>()
                .HasOne(i => i.Proprietario)
                .WithMany(m => m.ImoveisProprietario)
                .HasForeignKey(i => i.IdProprietario)
                .OnDelete(DeleteBehavior.Restrict);

            // Relacionamento: Municipe(contribuinte) -> Imovel
            modelBuilder.Entity<Imovel>()
                .HasOne(i => i.Contribuinte)
                .WithMany(m => m.ImoveisContribuinte)
                .HasForeignKey(i => i.IdContribuinte)
                .OnDelete(DeleteBehavior.Restrict);

            // Relacionamento: Topografia -> Imovel
            modelBuilder.Entity<Imovel>()
                .HasOne(i => i.Topografia)
                .WithMany(t => t.Imoveis)
                .HasForeignKey(i => i.IdTopografia)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: TipoUso -> Imovel
            modelBuilder.Entity<Imovel>()
                .HasOne(i => i.TipoUso)
                .WithMany(tu => tu.Imoveis)
                .HasForeignKey(i => i.IdTipoUso)
                .OnDelete(DeleteBehavior.Cascade);

            // Relacionamento: OcupacaoAtual -> Imovel
            modelBuilder.Entity<Imovel>()
                .HasOne(i => i.OcupacaoAtual)
                .WithMany(oa => oa.Imoveis)
                .HasForeignKey(i => i.IdOcupacaoAtual)
                .OnDelete(DeleteBehavior.Cascade);


            // Inserções
        }
    }

}
