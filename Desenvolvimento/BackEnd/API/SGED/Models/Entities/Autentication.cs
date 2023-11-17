using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Models.Entities
{
    public class Autentication
    {
        public string Email { get; set; }
        public string Senha { get; set; }
    }
}
