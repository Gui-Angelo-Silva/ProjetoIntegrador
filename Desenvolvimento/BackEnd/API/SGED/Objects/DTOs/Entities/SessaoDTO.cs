﻿using Jose;
using System.ComponentModel.DataAnnotations;
using System.Text;
using SGED.Objects.Server;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class SessaoDTO
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "A dade e hora de abertura é requerida!")]
        public string DataHoraInicio { get; set; }

        public string? DataHoraEncerramento { get; set; }

        public string TokenSessao { get; set; }

        [Required(ErrorMessage = "O status é requerido!")]
        public bool StatusSessao { get; set; }

        [JsonIgnore]
        public string EmailPessoa { get; set; }

        [JsonIgnore]
        public string NivelAcesso { get; set; }

        [JsonIgnore]
        public string IPv4 { get; set; }

        [JsonIgnore]
        public string IPv6 { get; set; }

        public int IdUsuario { get; set; }


        [JsonIgnore]
        public UsuarioDTO? UsuarioDTO { get; set; }

        [JsonIgnore]
        public ICollection<AuditoriaDTO>? AuditoriasDTO { get; set; }


        public string GenerateToken()
        {
            SecurityEntity securityEntity = new();

            var payload = new Dictionary<string, object>
            {
                { "iss", securityEntity.Issuer },
                { "aud", securityEntity.Audience },
                { "sub", this.EmailPessoa },
                { "exp", DateTimeOffset.UtcNow.AddHours(12).ToUnixTimeSeconds() }
            };

            this.TokenSessao = JWT.Encode(payload, Encoding.UTF8.GetBytes(securityEntity.Key), JwsAlgorithm.HS256);

            return this.TokenSessao;
        }

        public bool ValidateToken()
        {
            SecurityEntity securityEntity = new();

            // Passo 1: Verificar se o token tem três partes
            string[] tokenParts = this.TokenSessao.Split('.');
            if (tokenParts.Length != 3)
            {
                return false;
            }

            try
            {
                // Passo 2: Decodificar o token
                string decodedToken = Encoding.UTF8.GetString(Base64Url.Decode(tokenParts[1]));

                // Passo 3: Verificar iss, aud e sub
                var payload = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(decodedToken);
                if (!payload.TryGetValue("iss", out object issuerClaim) ||
                    !payload.TryGetValue("aud", out object audienceClaim) ||
                    !payload.TryGetValue("sub", out object subjectClaim))
                {
                    return false;
                }

                if (issuerClaim.ToString() != securityEntity.Issuer || audienceClaim.ToString() != securityEntity.Audience || subjectClaim.ToString() != this.EmailPessoa)
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

        public bool ValidateTokenByEmail(string token, string subject)
        {
            SecurityEntity securityEntity = new();

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
                var payload = Newtonsoft.Json.JsonConvert.DeserializeObject<Dictionary<string, object>>(decodedToken);
                if (!payload.TryGetValue("sub", out object subjectClaim))
                {
                    return false;
                }

                if (subjectClaim.ToString() != subject)
                {
                    return false;
                }

                // Passo 4: Se tudo estiver certo
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

    }
}
