using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
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
            modelBuilder.Entity<Imovel>().Property(i => i.IdUso).IsRequired();
            modelBuilder.Entity<Imovel>().Property(i => i.IdOcupacaoAtual).IsRequired();

            // Configuração do conversor para LocalizacaoGeografica (array de long)
            var arrayLongConverter = new ValueConverter<long[], string>(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<long[]>(v) ?? new long[2]);

            var arrayLongComparer = new ValueComparer<long[]>(
                (c1, c2) => c1.SequenceEqual(c2),
                c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                c => c.ToArray());

            modelBuilder.Entity<Imovel>().Property(i => i.LocalizacaoGeografica).HasConversion(arrayLongConverter).Metadata.SetValueComparer(arrayLongComparer);

            // Configuração do conversor para ImagemImovel (lista de string)
            var listStringConverter = new ValueConverter<List<string>, string>(
                v => JsonConvert.SerializeObject(v),
                v => JsonConvert.DeserializeObject<List<string>>(v) ?? new List<string>());

            var listStringComparer = new ValueComparer<List<string>>(
                (c1, c2) => c1.SequenceEqual(c2),
                c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                c => c.ToList());

            modelBuilder.Entity<Imovel>().Property(i => i.ImagemImovel).HasConversion(listStringConverter).Metadata.SetValueComparer(listStringComparer);

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
                .HasOne(i => i.Uso)
                .WithMany(tu => tu.Imoveis)
                .HasForeignKey(i => i.IdUso)
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
