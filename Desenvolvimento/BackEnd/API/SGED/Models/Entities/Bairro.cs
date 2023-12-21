using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;

namespace SGED.Models.Entities
{
    [Table("Bairro")]
    public class Bairro
    {
        [Column("idBairro")]
        public int Id { get; set; }

        [Column("nomeBairro")]
        public String NomeBairro { get; set; }

        public Cidade? Cidade { get; set; }

        [ForeignKey("idCidade")]
        public int IdCidade { get; set; }
    }
}