using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.Models.Entities
{
    [Table("tipodocumentoetapa")]
    public class TipoDocumentoEtapa : IStatus, IPosicao
    {
        [Column("idtipodocumentoetapa")]
        public int Id { get; set; }

        [Column("posicaotipodocumentoetapa")]
        public int Posicao { get; set; }

        [Column("statustipodocumentoetapa")]
        public bool Status { get; set; }

        public TipoDocumento? TipoDocumento { get; set; }

        [ForeignKey("idtipodocumento")]
        public int IdTipoDocumento { get; set; }

        public Etapa? Etapa { get; set; }

        [ForeignKey("idetapa")]
        public int IdEtapa { get; set; }
    }
}