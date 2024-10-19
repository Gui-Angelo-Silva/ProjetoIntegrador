using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class LogradouroDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O CEP do logradouro é requerido!")]
        [MinLength(9)]
        [MaxLength(9)]
        public string Cep { get; set; }

        [Required(ErrorMessage = "A rua do logradouro é requerida!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string RuaLogradouro { get; set; }

        [MinLength(1)]
        [MaxLength(10)]
        public string NumeroInicial { get; set; }

        [MinLength(1)]
        [MaxLength(10)]
        public string NumeroFinal { get; set; }

        [JsonIgnore]
        public BairroDTO? Bairro { get; set; }

        [Required(ErrorMessage = "O Bairro é requerido!")]
        public int IdBairro { get; set; }

        [JsonIgnore]
        public TipoLogradouroDTO? TipoLogradouro { get; set; }

        [Required(ErrorMessage = "O Tipo de Logradouro é requerido!")]
        public int IdTipoLogradouro { get; set; }

        [JsonIgnore]
        public ICollection<ImovelDTO>? ImoveisDTOs { get; set; }
    }
}
