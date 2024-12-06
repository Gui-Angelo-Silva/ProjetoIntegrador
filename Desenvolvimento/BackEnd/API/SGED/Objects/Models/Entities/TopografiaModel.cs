using SGED.DTOs.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.Models.Entities
{
    [Table("topografia")]
    public class TopografiaModel
    {
        [Column("idtopografia")]
        public int Id { get; set; }

        [Column("nometopografia")]
        public string NomeTopografia { get; set; }

        public ICollection<ImovelModel>? Imoveis { get; set; }
    }
}