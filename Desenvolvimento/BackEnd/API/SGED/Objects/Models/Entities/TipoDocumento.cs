using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Enums.Status;
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
        public StatusData Status { get; set; }

        public ICollection<TipoDocumentoEtapa>? TipoDocumentoEtapas { get; set; }
	}
}
