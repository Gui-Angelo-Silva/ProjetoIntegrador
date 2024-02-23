using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;

namespace SGED.Models.Entities
{
    [Table("engenheiro")]
    public class Engenheiro : Pessoa
    {
        [Column("idengenheiro")]
        public int Id { get; set; }
        public string crea { get; set; }
    }
}