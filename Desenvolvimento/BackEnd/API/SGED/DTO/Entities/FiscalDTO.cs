using SGED.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    public class FiscalDTO : PessoaDTO
    {
        public int Id { get; set; }
    }
}
