using System.ComponentModel.DataAnnotations.Schema;
using SGED.Objects.Enums;
using SGED.Objects.Interfaces;
using SGED.Objects.Utilities;

namespace SGED.Objects.Models.Entities
{
    [Table("etapa")]
    public class Etapa : IPosicao
    {
        [Column("idetapa")]
        public int Id { get; set; }

        [Column("nomeetapa")]
        public string NomeEtapa { get; set; }

        [Column("descricaoetapa")]
        public string DescricaoEtapa { get; set; }

        [Column("posicaoetapa")]
        public int Posicao { get; set; }

        [Column("statusetapa")]
        public StatusEnum Status { get; set; }

        public TipoProcesso? TipoProcesso { get; set; }

        [ForeignKey("idtipoprocesso")]
        public int IdTipoProcesso { get; set; }

        public ICollection<TipoDocumentoEtapa>? TipoDocumentoEtapas { get; set; }
    }
}
