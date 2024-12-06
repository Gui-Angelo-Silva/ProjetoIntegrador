﻿using System.ComponentModel.DataAnnotations.Schema;

namespace SGED.Objects.Models.Entities
{
    [Table("tipologradouro")]
    public class TipoLogradouroModel
    {
        [Column("idtipologradouro")]
        public int Id { get; set; }

        [Column("codigoinformativo")]
        public string CodigoInformativo { get; set; }

        [Column("descricaotipologradouro")]
        public string Descricao { get; set; }

        public ICollection<LogradouroModel>? Logradouros { get; set; }
    }
}
