using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.Models.Entities
{
    [Table("tipodocumentoetapa")]
    public class TipoDocumentoEtapa : IStatus
    {
        [Column("tipodocumentoetapa")]
        public int Id { get; set; }

        [Column("statustipoprocesso")]
        public Status Status { get; set; }

        public TipoDocumento? TipoDocumento { get; set; }

        [ForeignKey("idtipodocumento")]
        public int IdTipoDocumento { get; set; }

        public Etapa? Etapa { get; set; }

        [ForeignKey("idetapa")]
        public int IdEtapa { get; set; }
    }
}