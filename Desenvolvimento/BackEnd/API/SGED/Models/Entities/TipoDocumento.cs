using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Interfaces;
using SGED.Objects.Helpers;

namespace SGED.Models.Entities
{
    [Table("tipodocumento")]
    public class TipoDocumento : IStatus
    {
        [Column("idTipoDocumento")]
        public int Id { get; set; }

        [Column("nomeTipoDocumento")]
        public string NomeTipoDocumento { get; set; }

        [Column("descricaoTipoDocumento")]
        public string DescricaoTipoDocumento { get; set; }

        [Column("statustipoprocesso")]
        public Status Status { get; set; }

        public ICollection<TipoDocumentoEtapa>? TipoDocumentoEtapas { get; set; }
	}
}
