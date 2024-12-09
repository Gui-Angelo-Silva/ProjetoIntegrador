using SGED.DTOs.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Jose;
using Newtonsoft.Json;
using System.Text;
using SGED.Objects.Server;

namespace SGED.Objects.Models.Entities
{
    [Table("sessao")]
    public class SessaoModel
    {
        [Column("idsessao")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column("datahoraabertura")]
        public string DataHoraInicio { get; set; }

        [Column("datahorafechamento")]
        public string? DataHoraEncerramento { get; set; }

        [Column("tokensessao")]
        public string TokenSessao { get; set; }

        [Column("statussessao")]
        public bool StatusSessao { get; set; }

        [Column("emailpessoa")]
        public string EmailPessoa { get; set; }

        [Column("nivelacesso")]
        public string NivelAcesso { get; set; }

        [Column("ipv4")]
        public string IPv4 { get; set; }

        [Column("ipv6")]
        public string IPv6 { get; set; }

        [Column("idusuario")]
        public int IdUsuario { get; set; }


        public UsuarioModel? Usuario { get; set; }
        public ICollection<AuditoriaModel>? Auditorias { get; set; }


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
                var payload = JsonConvert.DeserializeObject<Dictionary<string, object>>(decodedToken);
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
    }
}
