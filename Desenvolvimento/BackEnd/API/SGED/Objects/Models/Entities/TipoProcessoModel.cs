﻿using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Enums.Status;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.Models.Entities
{
    [Table("tipoprocesso")]
    public class TipoProcessoModel
    {
        [Column("idtipoprocesso")]
        public int Id { get; set; }

        [Column("tipoprocesso")]
        public string NomeTipoProcesso { get; set; }

        [Column("descricaotipoprocesso")]
        public string DescricaoTipoProcesso { get; set; }

        [Column("statustipoprocesso")]
        public StatusData Status { get; set; }


        public ICollection<ProcessoModel>? Processos { get; set; }
        public ICollection<EtapaModel>? Etapas { get; set; }
    }
}