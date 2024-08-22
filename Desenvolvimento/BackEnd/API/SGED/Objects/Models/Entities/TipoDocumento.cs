using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Enums;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.Models.Entities
{
    [Table("tipodocumento")]
    public class TipoDocumento
    {
        [Column("idTipoDocumento")]
        public int Id { get; set; }

        [Column("nomeTipoDocumento")]
        public string NomeTipoDocumento { get; set; }

        [Column("descricaoTipoDocumento")]
        public string DescricaoTipoDocumento { get; set; }

        [Column("statustipoprocesso")]
        public StatusEnum Status { get; set; }

        public ICollection<TipoDocumentoEtapa>? TipoDocumentoEtapas { get; set; }

		public ICollection<DocumentoProcesso>? DocumentosProcesso { get; set; }
	}
}
