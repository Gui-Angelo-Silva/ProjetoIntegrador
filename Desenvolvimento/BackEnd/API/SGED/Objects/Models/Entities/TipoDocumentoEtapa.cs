using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Enums.Status;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.Models.Entities
{
    [Table("tipodocumentoetapa")]
    public class TipoDocumentoEtapa : IPosicao
    {
        [Column("idtipodocumentoetapa")]
        public int Id { get; set; }

        [Column("posicaotipodocumentoetapa")]
        public int Posicao { get; set; }

        [Column("statustipodocumentoetapa")]
        public StatusData Status { get; set; }

        public TipoDocumento? TipoDocumento { get; set; }

        [Column("idtipodocumento")]
        public int IdTipoDocumento { get; set; }

        public Etapa? Etapa { get; set; }

        [Column("idetapa")]
        public int IdEtapa { get; set; }


        public ICollection<DocumentoProcesso>? DocumentosProcesso { get; set; }
    }
}