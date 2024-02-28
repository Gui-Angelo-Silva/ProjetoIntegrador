using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;

namespace SGED.Models.Entities
{
    [Table("fiscal")]
    public class Fiscal : Pessoa
    {
        [Column("idfiscal")]
        public int Id { get; set; }
    }
}