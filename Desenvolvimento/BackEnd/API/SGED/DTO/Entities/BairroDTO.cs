﻿using SGED.Models.Entities;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;
using System.Text.Json.Serialization;

namespace SGED.DTO.Entities
{
    public class BairroDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome da Bairro é requerida!")]
        [MinLength(3)]
        [MaxLength(100)]
        public string NomeBairro { get; set; }

        [JsonIgnore]
        public CidadeDTO? CidadeDTO { get; set; }

        [Required(ErrorMessage = "A Cidade é requerida!")]
        public int IdCidade { get; set; }

    }
}
