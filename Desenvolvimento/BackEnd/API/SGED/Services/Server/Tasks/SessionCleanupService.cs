using SGED.DTO.Entities;
using SGED.Repositories.Interfaces;

namespace SGED.Services.Server.Tasks

{
    public class SessionCleanupService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public SessionCleanupService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var _sessaoRepository = scope.ServiceProvider.GetRequiredService<ISessaoRepository>();
            var _usuarioRepository = scope.ServiceProvider.GetRequiredService<IUsuarioRepository>();

            while (!stoppingToken.IsCancellationRequested)
            {

                try
                {
                    // Obter todas as sessões abertas
                    var sessoes = await _sessaoRepository.GetOpenSessions();

                    foreach (var sessao in sessoes)
                    {
                        try
                        {
                            // Verificar se o token é válido
                            var statusToken = SessaoDTO.ValidateToken(sessao.TokenSessao, sessao.Usuario.EmailPessoa);

                            // Se o token for inválido, atualizar o status da sessão no banco de dados
                            if (!statusToken)
                            {
                                sessao.TokenSessao = "";
                                sessao.StatusSessao = false;
                                sessao.DataHoraEncerramento = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");

                                // Atualizar a sessão no banco de dados
                                await _sessaoRepository.Update(sessao);
                            }
                        }
                        catch (Exception ex)
                        {
                            // Se ocorrer uma exceção, pule esta sessão e continue com a próxima
                            continue;
                        }
                    }
                }
                catch (Exception ex)
                {
                    return;
                }

                // Aguarda 10 minutos antes de verificar novamente
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}
