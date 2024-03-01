using AutoMapper;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using SGED.DTO.Entities;
using SGED.Repositories.Entities;
using SGED.Repositories.Interfaces;
using SGED.Services.Interfaces;
using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Jose;

namespace SGED.Services.ServerTasks

{
    public class SessionCleanupService : BackgroundService
    {
        private readonly ISessaoRepository _sessaoRepository;

        public SessionCleanupService(ISessaoRepository sessaoRepository)
        {
            _sessaoRepository = sessaoRepository;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var sessoes = await _sessaoRepository.GetOpenSession();

                // Aguarda 10 minutos antes de verificar novamente
                await Task.Delay(TimeSpan.FromMinutes(10), stoppingToken);
            }
        }

        private static bool ValidateToken(string token, string issuer, string audience, string expectedEmail)
        {
            // Passo 1: Verificar se o token tem três partes
            string[] tokenParts = token.Split('.');
            if (tokenParts.Length != 3)
            {
                return false;
            }

            try
            {
                // Passo 2: Decodificar o token
                string decodedToken = Encoding.UTF8.GetString(Base64Url.Decode(tokenParts[1]));

                // Passo 3: Verificar iss, aud e sub
                var payload = JsonConvert.DeserializeObject<Dictionary<string, object>>(decodedToken);
                if (!payload.TryGetValue("iss", out object issuerClaim) ||
                    !payload.TryGetValue("aud", out object audienceClaim) ||
                    !payload.TryGetValue("sub", out object subjectClaim))
                {
                    return false;
                }

                if (issuerClaim.ToString() != issuer || audienceClaim.ToString() != audience || subjectClaim.ToString() != expectedEmail)
                {
                    return false;
                }

                // Passo 4: Verificar se o tempo expirou
                if (payload.TryGetValue("exp", out object expirationClaim))
                {
                    long expirationTime = long.Parse(expirationClaim.ToString());
                    var expirationDateTime = DateTimeOffset.FromUnixTimeSeconds(expirationTime).UtcDateTime;
                    if (expirationDateTime < DateTime.UtcNow)
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }

                // Passo 5: Se tudo estiver certo
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
