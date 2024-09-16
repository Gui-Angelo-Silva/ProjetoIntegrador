using Microsoft.EntityFrameworkCore;
using SGED.Objects.Enums;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
	public class ConfiguracaoBuilder
	{
		public static void Build(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Configuracao>().Property(c => c.Id);
			modelBuilder.Entity<Configuracao>().Property(c => c.Descricao);
			modelBuilder.Entity<Configuracao>().Property(c => c.Valor);
			modelBuilder.Entity<Configuracao>()
				.Property(c => c.TipoConfiguracao)
				.HasConversion(
					v => v.ToString(),
					v => (TipoConfiguracao)Enum.Parse(typeof(TipoConfiguracao), v));

            // Declaração: Defini o ID como Chave Primária
            modelBuilder.Entity<Configuracao>().HasKey(c => c.Id);


			// Inserções
            modelBuilder.Entity<Configuracao>().HasData(
				new Configuracao { Id = 1, Descricao = "Ativar alerta de dados obtidos.", Valor = true, TipoConfiguracao = TipoConfiguracao.Notificacao },
				new Configuracao { Id = 2, Descricao = "Mensagem de tarefas pendentes.", Valor = true, TipoConfiguracao = TipoConfiguracao.Notificacao }	
			);
		}
	}
}
