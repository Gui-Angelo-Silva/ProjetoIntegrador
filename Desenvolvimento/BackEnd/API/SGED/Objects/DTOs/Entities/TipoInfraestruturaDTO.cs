﻿using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class TipoInfraestruturaDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome do tipo infraestrutura é requerido!")]
        [MinLength(3)]
        [MaxLength(50)]
        public string NomeTipoInfraestrutura { get; set; }

        [Required(ErrorMessage = "A descrição do tipo infraestrutura é requerida!")]
        [MaxLength(500)]
        public string? DescricaoTipoInfraestrutura { get; set; }

        [JsonIgnore]
        public ICollection<InfraestruturaDTO>? InfraestruturasDTOs { get; set; }
    }
}
