﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class CidadeDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome da cidade é requerida!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string NomeCidade { get; set; }

        [JsonIgnore]
        public EstadoDTO? EstadoDTO { get; set; }

        [Required(ErrorMessage = "O Estado é requerido!")]
        public int IdEstado { get; set; }

        [JsonIgnore]
        public ICollection<BairroDTO>? BairroDTOs { get; set; }
    }
}
