using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

namespace SGED.Objects.Utilities
{
    public class DataSession
    {
        public int Id { get; set; }

        [EmailAddress]
        public string EmailPessoa
        {
            get => _emailPessoa;
            set => _emailPessoa = value?.ToLower();
        }
        private string _emailPessoa;
    }
}
