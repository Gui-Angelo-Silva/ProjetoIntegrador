using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;

namespace SGED.Models.Entities
{
    [Table("municipe")]
    public class Municipe : Pessoa
    {
        [Column("idmunicipe")]
        public int Id { get; set; }

    }
}