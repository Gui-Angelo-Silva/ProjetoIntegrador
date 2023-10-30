using SGED.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{   
    public class CidadeEstadoDTO
    {
        public int Id { get; set; }

        public string NomeCidade { get; set; }


        [JsonIgnore]
        public int IdEstado { get; set; }

        public EstadoDTO? EstadoDTO { get; set; }
    }

    public class EstadoCidadeDTO
    {
        public int Id { get; set; }

        public string NomeEstado { get; set; }

        public string UfEstado { get; set; }

        public ICollection<CidadeDTO>? CidadesDTO { get; set; }

    }
}
