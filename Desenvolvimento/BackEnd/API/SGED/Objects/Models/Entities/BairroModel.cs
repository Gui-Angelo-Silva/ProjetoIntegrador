using SGED.DTOs.Entities;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.Runtime.CompilerServices;

namespace SGED.Objects.Models.Entities
{
    [Table("bairro")]
    public class BairroModel
    {
        [Column("idbairro")]
        public int Id { get; set; }

        [Column("nomebairro")]
        public string NomeBairro { get; set; }

        public CidadeModel? Cidade { get; set; }

        [Column("idcidade")]
        public int IdCidade { get; set; }

        public ICollection<LogradouroModel>? Logradouros { get; set; }
    }
}