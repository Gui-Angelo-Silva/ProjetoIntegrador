﻿using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Interfaces;
using SGED.Objects.Helpers;

namespace SGED.Models.Entities
{
    [Table("tipoprocesso")]
    public class TipoProcesso : IStatus
    {
        [Column("idtipoprocesso")]
        public int Id { get; set; }

        [Column("tipoprocesso")]
        public string NomeTipoProcesso { get; set; }

        [Column("descricaotipoprocesso")]
        public string DescricaoTipoProcesso { get; set; }

        [Column("statustipoprocesso")]
        public Status Status { get; set; }

        public ICollection<Etapa>? Etapas { get; set; }
	}
}