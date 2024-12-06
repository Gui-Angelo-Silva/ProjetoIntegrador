﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SGED.Objects.DTOs.Entities
{
    public class TipoUsuarioDTO
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nível de acesso é requerido!")]
        [MinLength(1)]
        [MaxLength(1)]
        public string NivelAcesso { get; set; }

        [Required(ErrorMessage = "O nome do tipo de usuário é requerido!")]
        [MinLength(3)]
        [MaxLength(20)]
        public string NomeTipoUsuario { get; set; }

        [Required(ErrorMessage = "A descrição é requerida!")]
        [MinLength(5)]
        [MaxLength(300)]
        public string DescricaoTipoUsuario { get; set; }

        [JsonIgnore]
        public ICollection<UsuarioDTO>? UsuariosDTO { get; set; }
    }
}
