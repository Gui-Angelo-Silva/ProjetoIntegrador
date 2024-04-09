using SGED.Repositories.Interfaces;

namespace SGED.Services.Server.Tasks

{
    public class RemoveSessionService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;

        public RemoveSessionService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var _sessionRepository = scope.ServiceProvider.GetRequiredService<ISessaoRepository>();

            string dateTime = DateTime.Now.AddDays(-7).ToString("dd/MM/yyyy HH:mm:ss");

            while (!stoppingToken.IsCancellationRequested)
            {

                try
                {
                    // Obtém todas as sessões agrupadas por usuário e ordenadas pelo ID
                    var sessions = await _sessionRepository.GetCloseSessions();

                    foreach (var session in sessions)
                    {
                        if (String.Compare(session.DataHoraEncerramento, dateTime) > 0)
                        {
                            _sessionRepository.Delete(session.Id);
                        }
                    }

                }
                catch (Exception ex)
                {
                    return;
                }

                // Aguarda 1 dia antes de verificar novamente
                await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
            }
        }
    }
}
