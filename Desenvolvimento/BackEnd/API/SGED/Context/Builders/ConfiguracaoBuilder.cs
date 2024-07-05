using Microsoft.EntityFrameworkCore;
using SGED.Objects.Enums;
using SGED.Objects.Models.Entities;

namespace SGED.Context.Builders
{
	public class ConfiguracaoBuilder
	{
		public static void Build(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Configuracao>().HasKey(x => x.Id);
			modelBuilder.Entity<Configuracao>().Property(x => x.Descricao);
			modelBuilder.Entity<Configuracao>().Property(x => x.Valor);
			modelBuilder.Entity<Configuracao>()
				.Property(x => x.TipoConfiguracao)
				.HasConversion(
					v => v.ToString(),
					v => (TipoConfiguracao)Enum.Parse(typeof(TipoConfiguracao), v));

			modelBuilder.Entity<Configuracao>().HasData(
				new Configuracao { Id = 1, Descricao = "Ativar alerta de dados obtidos.", Valor = true, TipoConfiguracao = TipoConfiguracao.Notificacao },
				new Configuracao { Id = 2, Descricao = "Mensagem de tarefas pendentes.", Valor = true, TipoConfiguracao = TipoConfiguracao.Notificacao }	
			);
		}
	}
}
