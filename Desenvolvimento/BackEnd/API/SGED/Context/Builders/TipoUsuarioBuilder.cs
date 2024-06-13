using Microsoft.EntityFrameworkCore;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
    public class TipoUsuarioBuilder
    {
        public static void Build(ModelBuilder modelBuilder)
        {
            // Builder
            modelBuilder.Entity<TipoUsuario>().HasKey(tu => tu.Id);
            modelBuilder.Entity<TipoUsuario>().Property(tu => tu.NivelAcesso).HasMaxLength(1).IsRequired();
            modelBuilder.Entity<TipoUsuario>().Property(tu => tu.NomeTipoUsuario).HasMaxLength(20).IsRequired();
            modelBuilder.Entity<TipoUsuario>().Property(tu => tu.DescricaoTipoUsuario).HasMaxLength(300).IsRequired();


            // Inserções
            modelBuilder.Entity<TipoUsuario>().HasData(
                new TipoUsuario { Id = 1, NomeTipoUsuario = "Desenvolvedor", NivelAcesso = "A", DescricaoTipoUsuario = "Entidade voltada ao time de desenvolvimento para uso do Sistema durante testes." },
                new TipoUsuario { Id = 2, NomeTipoUsuario = "Administrador", NivelAcesso = "A", DescricaoTipoUsuario = "Entidade administrativa do Sistema." },
                new TipoUsuario { Id = 3, NomeTipoUsuario = "Funcionário", NivelAcesso = "B", DescricaoTipoUsuario = "Entidade responsável pela alimentação de informações do Sistema." },
                new TipoUsuario { Id = 4, NomeTipoUsuario = "Estagiário", NivelAcesso = "C", DescricaoTipoUsuario = "Entidade auxiliar na alimentação de informações do Sistema." }
            );
        }
    }

}
