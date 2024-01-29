using SGED.DTO.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;

namespace SGED.Models.Entities
{
    [Table("bairro")]
    public class Bairro
    {
        [Column("idbairro")]
        public int Id { get; set; }

        [Column("bairro")]
        public string NomeBairro { get; set; }

        public Cidade? Cidade { get; set; }

        [ForeignKey("idcidade")]
        public int IdCidade { get; set; }

        public ICollection<Logradouro>? Logradouros { get; set;}
    }
}