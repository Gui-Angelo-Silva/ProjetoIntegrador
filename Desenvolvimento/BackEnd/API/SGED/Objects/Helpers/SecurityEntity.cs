using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

namespace SGED.Objects.Helpers
{
    public class SecurityEntity
    {
        public string Issuer { get; } = "Server API";
        public string Audience { get; } = "WebSite";
        public string Key { get; } = "SGED_BarramentUser_API_Autentication";
    }
}
