using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("topografia")]
    public class Topografia
    {
        [Column("idtopografia")]
        public int Id { get; set; }

        [Column("nometopografia")]
        public string NomeTopografia { get; set; }

        public ICollection<Imovel>? Imoveis { get; set; }
    }
}